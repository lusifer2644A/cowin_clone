const { Schema, model } = require("mongoose");

const OtpSchema = new Schema(
    {
        number: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            index: { expires: 300 },
        },
        //after 5min its automatically deleted from DB
    },
    {
        timestamps: true,
    }
);

module.exports.Otp = model("Otp", OtpSchema);
