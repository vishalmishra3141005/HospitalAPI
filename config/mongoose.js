
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;
const database = process.env.MONGO_DB;

async function connectDatabase() {
    let connected = false;
    while(!connected) {
        try {
            await mongoose.connect(`${mongoUrl}/${database}`, { family: 4 });
            console.log("Database connected");
            connected = true;
        } catch(err) {
            console.log("Error occured while trying to connect to database");
            console.log(err);
            console.log("Retrying again..");
        }
    }
}


connectDatabase();

const db = mongoose.connection;

module.exports = db;