const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        number: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports.User = model("User", UserSchema);
