

const express = require("express");

const passport = require("passport");

const patients = require("../../controllers/patients");


const route = express.Router();


route.post(
    "/register",
    passport.authenticate("jwt", { session: false }),
    patients.register
);

route.post(
    "/:id/create_report",
    passport.authenticate("jwt", { session: false }),
    patients.create_report
);

route.get(
    "/:id/all_reports",
    patients.all_reports
);

module.exports = route;