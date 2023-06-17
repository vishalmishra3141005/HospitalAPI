
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
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        requried: true,
    },
}, { timestamps: true }));


module.exports = Report;