const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const { Member } = require("../../models/Member");

const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
    res.status(200).json({ message: "Authorised route for members!" });
});

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

        if (err.kind === "ObjectId")
            return res.status(400).json({ msg: "Profile not found." });

        res.status(500).send("Server Error");
    }
});

module.exports = router;
