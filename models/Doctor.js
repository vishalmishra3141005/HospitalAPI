
const mongoose = require("mongoose");

const Doctor = mongoose.model("doctor", new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, }
));

module.exports = Doctor;