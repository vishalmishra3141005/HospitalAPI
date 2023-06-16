
const Patient = require("../../models/Patient");
const Report = require("../../models/Report");

module.exports.register = async function(req, res) {
    const phone = req.body.phone;
    const name = req.body.name;


    try {
        const patient = await Patient.findOne({phone: phone, name: name}).exec();
        if (patient) {
            res.status(200).json({ id: patient.id, phone: patient.phone, name: patient.name });
        } else {
            try {
                const newPatient = await Patient.create({phone: phone, name: name});
                res.status(200).json({ id: newPatient.id, phone: newPatient.phone, name: newPatient.name });
            } catch(err) {
                console.log(err);
                res.status(422).json({message: "Error"});
            }
        }
    } catch(err) {
        res.status(422).json({message: "Error in registering patient"});
    }
}

module.exports.create_report = async function(req, res) {

    const patientId = req.params.id;
    const doctor = req.body.doctor;
    const status = req.body.status;
    const date = req.body.date;

    try {
        let patient = await Patient.findById(id).exec();
        if (patient) {
            try {
                const newReport = await Report.create({
                    doctor,
                    status,
                    date,
                    patientId,
                });
            } catch(err) {
                res.status(422).json({message: "Unable to create report"});
            }
        } else {
            res.status(422).json({message: "Register patient first"});
        }
    } catch(er) {
        res.status(422).json({message: "Register patient first"});
    }
}

module.exports.all_reports = function(req, res) {

}