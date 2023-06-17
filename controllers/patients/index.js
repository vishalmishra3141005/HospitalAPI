
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
        let patient = await Patient.findById(patientId).exec();
        if (patient) {
            try {
                const newReport = await Report.create({
                    doctor,
                    status,
                    date,
                    patientId,
                    patientName: patient.name,
                });
                res.status(200).json({message: "Report Created"});
            } catch(err) {
                console.log(err);
                res.status(422).json({message: "Unable to create report"});
            }
        } else {
            res.status(422).json({message: "Register patient first"});
        }
    } catch(er) {
        res.status(422).json({message: "Register patient first"});
    }
}

module.exports.all_reports = async function(req, res) {

    const mappedReport = (reports) => {
        let newReport = [];
        for (let report of reports) {
            newReport.push({
                patientId: report.patientId,
                patientName: report.patientName,
                doctor: report.doctor,
                status: report.status,
                date: report.date,
            })
        }
        return newReport;
    }

    let patientId = req.params.id;

    try {
        const patient = await Patient.findById(patientId).exec();
        if (patient) {
            try {
                let reports = await Report.find({patientId: patientId}).exec();
                let filteredReports = mappedReport(reports);
                res.status(200).json(filteredReports);
            } catch (err) {
                console.log(err);
                res.status(500).json("Server Error");
            }
        } else {
            res.status(422).json({message: "Register patient first"});
        }
    } catch(err) {
        res.status(500).json("Server Error");
    }
}