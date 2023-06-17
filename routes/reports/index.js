
const express = require("express");
const passport = require("passport");

const reports = require("../../controllers/reports");

const route = express.Router();

route.get(
    "/:status",
    reports.status,
);

module.exports = route;