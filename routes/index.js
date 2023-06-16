

const express = require("express");

const route = express.Router();


route.use("/doctors", require("./doctors"));
route.use("/patients", require("./patients"));
route.use("/reports", require("./reports"));

module.exports = route;