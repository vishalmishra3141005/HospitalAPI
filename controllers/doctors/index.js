
const Doctor = require("../../models/Doctor");
const jwt = require("jsonwebtoken");


module.exports.register = async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);

    try {
        const doctor = await Doctor.findOne({username: username}).exec();
        if (doctor) {
            res.status(200).json({message: "doctor already register"});
        } else {
            Doctor.create({username: username, password: password})
                .then(function(newDoctor) {
                    res.status(200).json({message: "new doctor register"});
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(422).json({message: "Unable to register doctor"});
                });
        }
    } catch(err) {
        res.status(404).json({message: "Unable to register doctor"});
    }
}

module.exports.login = async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const doctor = await Doctor.findOne({username: username});
        if (!doctor || doctor.password != password) {
            return res.status(422).json({message: "Invalid username or password"});
        }
        return res.status(200).json({
            message: "Signin Successful",
            data: {
                token: jwt.sign(doctor.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: 60 * 10 })
            }
        })
    } catch(err) {
        console.log(err);
        return res.status(500, { message: "Internal server error" });
    }
}