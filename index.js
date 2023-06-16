
require("dotenv").config();

const express = require("express");

const mongoose = require("./config/mongoose");

const passportJwt = require("./config/passportJwt");

const app = express();

const port = 4000;

app.use(express.urlencoded({extended: true}));

app.use(require("./routes"));

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server up and running at ${port}`);
    }
})