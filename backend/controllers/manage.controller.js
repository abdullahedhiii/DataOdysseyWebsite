const { db } = require("../db");
const socket = require("../socket");
require('dotenv').config();


module.exports.updateTimings = (req, res) => {
    console.log('update hit ' ,req.body);
    const { competitionName, competitionDate, startTime, endTime,secretKey } = req.body;
    const io = socket.getIO();
    if(secretKey !== process.env.secret_key_manage) {
        return res.status(200).json({ success: false, message: "You do not have the rights to do this update"});
    }
    const q = `
        UPDATE Competition 
        SET competitionName = ?, competitionDate = ?, startTime = ?, endTime = ?
        WHERE competition_id = 1;
    `;
    
    db.query(q, [competitionName, competitionDate, startTime, endTime], (error, result) => {
        if (error) {
            console.error("Error updating competition timings:", error);
            return res.status(500).json({ success: false, message: "Database update failed", error });
        }

        io.emit("competitionTimingsUpdated", {
            competitionName,
            competitionDate,
            startTime,
            endTime
        });

        res.status(200).json({ success: true, message: "Competition timings updated successfully" });
    });
};


module.exports.getCompetitionTimings = (req, res) => {
    const q = `SELECT competitionName,competitionDate,
    startTime,endTime FROM competition WHERE competition_id = 1;`;

    db.query(q, (err, result) => {
        if (err) {
            console.error("Error fetching competition timings:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Competition not found" });
        }

        const competitionData = result[0];
        res.status(200).json({
            competitionName: competitionData.competitionName,
            competitionDate: competitionData.competitionDate.toISOString().split("T")[0],
            startTime: competitionData.startTime, 
            endTime: competitionData.endTime
        });
    });
};
