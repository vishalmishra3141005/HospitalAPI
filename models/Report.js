
const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const Report = mongoose.model("report", new mongoose.Schema({
    doctor: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    patient: {
        type: String,
        required: true,
    }
}, { timestamps: true }));


module.exports = Report;