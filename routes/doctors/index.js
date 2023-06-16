
const express = require("express");

const route = express.Router();

const doctorController = require("../../controllers/doctors");


route.post("/register", doctorController.register);
route.post("/login", doctorController.login);


module.exports = route;