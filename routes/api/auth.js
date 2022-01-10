const express = require("express");
const unirest = require("unirest");
const { check, validationResult } = require("express-validator");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const router = express.Router();

//import models
const { User } = require("../../models/User");
const { Otp } = require("../../models/Otp");

router.get("/", (req, res) => {
    res.send("auth route");
});

//type POST /api/auth
//desc phone verification route
router.post(
    "/",
    [check("number", "Please enter a valid phone number").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const number = req.body.number;

        // const user = await User.findOne({
        //     number: number,
        // });

        // if (user) return res.status(400).send("User already registered!");

        const OTP = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        //save otp
        const otp = new Otp({
            number: number,
            otp: OTP,
        });

        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt);
        let otpResult = await otp.save();

        //send otp in sms
        console.log(OTP);

        var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

        req.query({
            authorization: config.get("SMS_API_KEY"),
            sender_id: "cowin",
            message: `Your OTP for CO-WIN login is ${OTP}. \nThank You.`,
            language: "english",
            variables_values: OTP,
            route: "otp",
            numbers: number,
        });

        req.headers({
            "cache-control": "no-cache",
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);
        });

        return res.status(200).send("OTP sent successfully!");
    }
);

//type POST /api/auth/otp
//desc phone verification route
router.post(
    "/verifyOtp",
    [check("otp", "Please enter the correct OTP").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //get otp and number
        const { otp, number } = req.body;

        //find otp in the DB
        const otpHolder = await Otp.find({
            number: number,
        });

        if (otpHolder.length === 0)
            return res.status(400).send("You use an expired OTP!");

        const lastOtp = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(otp, lastOtp.otp);

        if (lastOtp.number === number && validUser) {
            let user = await User.findOne({
                number: number,
            });

            if (!user) {
                const newUser = new User({ number });
                const result = await newUser.save();
            }

            await Otp.deleteMany({ number });

            //assign token
            user = await User.findOne({
                number: number,
            });

            const payload = {
                user: {
                    id: user.id, // moongose converts _id -> id.
                },
            };
            console.log(payload);

            await jwt.sign(
                payload,
                config.get("JWT_SECRET_KEY"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token: token,
                        message: "User successfully verified!!",
                    });
                }
            );
        } else return res.status(400).send("Your OTP was wrong!");
    }
);

module.exports = router;
