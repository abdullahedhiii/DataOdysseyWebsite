const { db } = require("../db");
const socket = require("../socket");

// This data would be use to compare rows if tabular results dosen't match exactly, possibly due to change in headers
const answers = {
  4609 : [
    ['Hamilton: Lee, do you yield? Burr: You shot him in the side! Yes he yields!'],
    ['Report Not Found'],
    ['Security footage shows that there were 2 witnesses. The first witness lives at the last house on ""Northwestern Dr"". The second witness, named Annabel, lives somewhere on ""Franklin Ave"".'],
  ],
 4610 : [    
  ['Security footage shows that there were 2 witnesses. The first witness lives at the last house on ""Northwestern Dr"". The second witness, named Annabel, lives somewhere on ""Franklin Ave"".'],
 ],
 4611 : [
  ['Morty Schapiro','4919']
 ],
 4612 : [
  ['Annabel Miller','16371']
 ]
};

// These are the hard coded tabular results of the stdout stream of oneCompiler
const tabularAnswers = {
  4609: "",
  4610 : "",
  4611: "+----------------+----------------+| name           | address_number |+----------------+----------------+Morty Schapiro |           4919 |+----------------+----------------+",
  4612:"+----------------+-------+| name           | id    |+----------------+-------+| Annabel Miller | 16371 |+----------------+-------+"
};

module.exports.sendQueries = (req, res) => {
  try {
    const [level, team_id] = req.params.id.split(".");
    const q = `
           SELECT q.*, 
       MAX(CASE 
               WHEN s.queryId IS NOT NULL AND s.status = 'accepted' THEN 1 
               ELSE 0 
           END) AS markDone
FROM queries q
LEFT JOIN solutions s ON q.queryId = s.queryId AND s.team_id = ?
WHERE q.level = ?
GROUP BY q.queryId;

        `;

    db.query(q, [team_id, level], (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ message: "Something went wrong" });
      }

      res.status(200).json({
        message: "Queries found successfully",
        queries: result.map((query) => ({
          ...query,
          id: query.queryId,
          markDone: query.markDone === 1,
        })),
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

function sendStatus(email, status, level = 0) {
  const io = socket.getIO();
  if (level == 0)
    io.emit("fileStatusUpdated", { email: email, status: status });
  else io.emit("levelUpdated", { email, level: level + 1 });
}

function deepEqual(queryId, b) {
  try {
    if (tabularAnswers[queryId] == b) return true;

    const parsedData = b
      .split("\n")
      .slice(3, -1)
      .map((row) =>
        row
          .split("|")
          .slice(1, -1)
          .map((ele) => ele.trim())
      )
      .slice(0, -1);
    console.log(parsedData, "\n");

    let i = 0;
    for (const row of answers[queryId]) {
      // Extra data will also be accepted by comparing like this
      const ele2 = JSON.stringify(row);
      const ele1 = JSON.stringify(parsedData[i]);
      if (ele1 != ele2) {
        console.log("returning false ", ele1, ele2);
        return false;
      } else console.log("true ", ele1, ele2, "\n");
      i++;
    }

    return true;
  } catch (err) {
    console.log(err.message);
  }
}

function statusSender(email, id, team_id, query, answer) {
  const delayTime = 3000;
  setTimeout(() => {
    sendStatus(email, "submitted");
    const q1 = "update solutions set status = 'pending' where id = ?";
    db.query(q1, [id], (err2, result2) => {
      if (err2) {
        console.error("cannot update to pending");
      } else {
        setTimeout(() => {
          sendStatus(email, "pending");

          if (deepEqual(query.queryId, answer)) {
            const acceptQuery = `update solutions set status = \'accepted\' where id = ${id}`;
            db.execute(acceptQuery);
            sendStatus(email, "accepted");

            const levelCount =
              "select count(*) as solved from solutions where status = 'accepted' and team_id = ?";
            db.query(levelCount, [team_id], (err3, result3) => {
              if (!err3 || result3.length > 0) {
                const levels = Math.floor(result3[0].solved / 3);

                if (levels > 0) {
                  sendStatus(email, "", levels);
                  db.execute(
                    `update participants set level = ${
                      levels + 1
                    } where team_id = ${team_id}`
                  );
                }
              }
            });
          } else {
            const rejectQuery = `update solutions set status = \'rejected\' where id = ${id}`;
            db.execute(rejectQuery);
            sendStatus(email, "rejected");
          }
        }, delayTime);
      }
    });
  }, delayTime);
}

module.exports.submitQuery = (req, res) => {
  console.log("submit query hit ? ", req.body);
  const { email, team_id, query, answer } = req.body;
  const q = "Insert into solutions (team_id,queryId) values (?,?)";
  try {
    db.query(q, [team_id, query.queryId], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong!" });
      } else {
        statusSender(email, result.insertId, team_id, query, answer);
        res.status(200).json({ message: "File Submitted" });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports.sendLeaderboardData = (req, res) => {
  let tempLeaderboardData = [
    {
      team_id: 10100,
      teamName: "SQL Masters",
      currentLevel: 5,
      queriesSolved: {
        Hard: 3,
        medium: 4,
        Easy: 2,
      },
      submissions: 11,
      totalScore: 800,
    },
    {
      team_id: 10101,
      teamName: "Query Questers",
      currentLevel: 4,
      queriesSolved: {
        Hard: 2,
        medium: 4,
        Easy: 2,
      },
      submissions: 10,
      totalScore: 650,
    },
    {
      team_id: 10102,
      teamName: "Data Dragons",
      currentLevel: 3,
      queriesSolved: {
        Hard: 2,
        medium: 3,
        Easy: 2,
      },
      submissions: 7,
      totalScore: 550,
    },
    {
      team_id: 10103,
      teamName: "Schema Slayers",
      currentLevel: 3,
      queriesSolved: {
        Hard: 1,
        medium: 3,
        Easy: 2,
      },
      submissions: 9,
      totalScore: 400,
    },
    {
      team_id: 10104,
      teamName: "Table Titans",
      currentLevel: 2,
      queriesSolved: {
        Hard: 1,
        Medium: 2,
        Easy: 2,
      },
      submissions: 14,
      totalScore: 350,
    },
  ];

  try {
    const q = "SELECT * FROM participants";
    db.query(q, [], async (err, result1) => {
      if (err || result1.length === 0) {
        return res.status(400).json({ message: "Something went wrong" });
      }

      try {
        const finalResult = await Promise.all(
          result1.map(async (team) => {
            const q2 = `
                                SELECT p.*, q.difficulty, COUNT(*) AS queriesSolved 
                                FROM participants p 
                                LEFT JOIN solutions s ON s.team_id = p.team_id AND s.status = 'accepted' 
                                JOIN queries q ON s.queryId = q.queryId 
                                WHERE s.team_id = ?
                                GROUP BY s.team_id, q.difficulty`;

            const innerResult = await new Promise((resolve, reject) => {
              db.query(q2, [team.team_id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
              });
            });

            const initialResult = innerResult.reduce(
              (acc, curr) => {
                console.log("current is ", curr);

                const updatedQueriesSolved = {
                  ...acc.queriesSolved,
                  [curr.difficulty]: curr.queriesSolved || 0,
                };

                const updatedAcc = {
                  totalScore:
                    acc.totalScore +
                    (curr.difficulty === "Easy"
                      ? 50 * curr.queriesSolved
                      : curr.difficulty === "Medium"
                      ? 100 * curr.queriesSolved
                      : 200 * curr.queriesSolved),
                  submissions: acc.submissions + curr.queriesSolved,
                  queriesSolved: updatedQueriesSolved,
                };

                return updatedAcc;
              },
              {
                totalScore: 0,
                submissions: 0,
                queriesSolved: { Easy: 0, Medium: 0, Hard: 0 },
              }
            );

            return {
              ...initialResult,
              team_id: team.team_id,
              teamName: team.teamName,
              currentLevel: team.level,
            };
          })
        );
        res
          .status(200)
          .json({
            message: "Success",
            teamData: [...tempLeaderboardData, ...finalResult].sort(
              (a, b) => b.totalScore - a.totalScore
            ),
          });
      } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Something went wrong!" });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
