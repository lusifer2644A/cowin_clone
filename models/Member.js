const { Schema, model } = require("mongoose");

const MemberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    idProof: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    dose1: {
        vaccineName: {
            type: String,
        },
        address: {
            type: String,
        },
        date: {
            type: Date,
        },
        timeSlot: {
            type: String,
        },
    },
    dose2: {
        vaccineName: {
            type: String,
        },
        address: {
            type: String,
        },
        date: {
            type: Date,
        },
        timeSlot: {
            type: String,
        },
    },
});

module.exports.Member = model("Member", MemberSchema);
