
const Report = require("../../models/Report");


module.exports.status = async function(req, res) {
    const status = req.params.status;

    const filterReport = function(reports) {
        newReports = [];
        for (let report of reports) {
            newReports.push({
                patientId: report.patientId,
                patientName: report.patientName,
                doctor: report.doctor,
                status: report.status,
                date: report.date,
            });
        }
        return newReports;
    }

    try {
        let reports = await Report.find({status: status}).exec();
        const newReports = filterReport(reports);
        res.status(200).json(newReports);
    } catch(err) {
        res.status(500).json({message: "Server Error"});
    }
}