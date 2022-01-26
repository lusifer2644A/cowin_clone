const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { Member } = require("../../models/Member");

const auth = require("../../middleware/auth");

//@route   GET  api/user/
//@desc    Check user Route
//@access  Private
router.get("/", auth, (req, res) => {
    res.status(200).json({ message: "Authorised route for members!" });
});

//@route   POST  api/user/addMember
//@desc    Add members
//@access  Private
router.post("/addMember", auth, async (req, res) => {
    try {
        const { name, gender, dob, idProof, idNumber } = req.body;

        const member = await Member.findOne({
            user: req.user.id,
            name,
            idNumber,
        });

        if (member) {
            return res.status(400).json({ message: "Member already exists!" });
        }

        const newMember = new Member({
            user: req.user.id,
            name,
            gender,
            dob,
            idProof,
            idNumber,
        });

        await newMember.save();

        res.status(200).json({ message: "Member added successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   GET  api/user/members
//@desc    Get all members details
//@access  Private
router.get("/members", auth, async (req, res) => {
    try {
        const user = req.user.id;

        const members = await Member.find({
            user,
        });

        res.status(200).json({
            members,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//@route   POST  api/user/dose1
//@desc    Post dose details
//@access  Private
router.post("/dose1", auth, async (req, res) => {
    try {
        const id = req.body.id;

        const doseFields = {
            dose1: {
                registered: "true",
                taken: req.body.taken !== null ? req.body.taken : "false",
                vaccineName: req.body.vaccineName,
                center: req.body.center,
                date: req.body.date,
                timeSlot: req.body.timeSlot,
            },
        };

        let member = await Member.findById({
            _id: id,
        });

        if (!member)
            return res.status(400).json({ message: "Member not found :(" });

        member = await Member.findByIdAndUpdate(
            { _id: id },
            { $set: doseFields },
            { new: false }
        );
        console.log(doseFields);

        return res.status(200).json({
            message: "Dose Registered successfully!",
            member,
        });
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId")
            return res.status(400).json({ message: "Member not found." });

        res.status(500).send("Server Error");
    }
});

//@route   POST  api/user/dose2
//@desc    Post dose details
//@access  Private
router.post("/dose2", auth, async (req, res) => {
    try {
        const id = req.body.id;

        const doseFields = {
            dose2: {
                registered: "true",
                vaccineName: req.body.vaccineName,
                center: req.body.center,
                date: req.body.date,
                timeSlot: req.body.timeSlot,
            },
        };

        let member = await Member.findById({
            _id: id,
        });

        if (!member)
            return res.status(400).json({ message: "Member not found :(" });

        if (member.dose1.registered === false) {
            return res
                .status(400)
                .json({ message: "Member not registered Dose 1 yet! :(" });
        }

        if (member.dose1.taken === false) {
            return res
                .status(400)
                .json({ message: "Member not taken Dose 1 yet! :(" });
        }

        member = await Member.findByIdAndUpdate(
            { _id: id },
            { $set: doseFields },
            { new: false }
        );
        console.log(doseFields);

        return res.status(200).json({
            message: "Dose Registered successfully!",
            member,
        });
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId")
            return res.status(400).json({ message: "Member not found." });

        res.status(500).send("Server Error");
    }
});

module.exports = router;
