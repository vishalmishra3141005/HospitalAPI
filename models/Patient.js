
const mongoose = require("mongoose");

const Patient = mongoose.model("patient", new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true, }));

module.exports = Patient;