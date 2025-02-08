const { db } = require('../db');
const socket = require('../socket');

const answers = {
    
        "4612": [
            ['5', 'Aisha Siddiqui', '23', '95.0'],
            ['1', 'Sara Ali', '22', '92.5'],
            ['7', 'Maya Shah', '20', '91.0']
        ],
        "4613": [['73.5'] ],
        "4614": [['10','Jawwad', '20', '38.5']]
    
        // we've to rearange the below objects like above format
    // 2: {
    //     "4615": [
    //         {
    //             "age": 19,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 20,
    //             "number_of_students": 3
    //         },
    //         {
    //             "age": 21,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 22,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 23,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 24,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 25,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 26,
    //             "number_of_students": 1
    //         },
    //         {
    //             "age": 27,
    //             "number_of_students": 1
    //         }
    //     ]
    //     ,
    //     "4616": [
    //         {
    //             "id": 5,
    //             "name": "Aisha Siddiqui",
    //             "age": 23,
    //             "score": 95.0
    //         },
    //         {
    //             "id": 1,
    //             "name": "Sara Ali",
    //             "age": 22,
    //             "score": 92.5
    //         },
    //         {
    //             "id": 3,
    //             "name": "Lina Ahmed",
    //             "age": 19,
    //             "score": 88.5
    //         },
    //         {
    //             "id": 9,
    //             "name": "Nadia Malik",
    //             "age": 26,
    //             "score": 78.5
    //         },
    //         {
    //             "id": 8,
    //             "name": "Imran Javed",
    //             "age": 27,
    //             "score": 80.0
    //         },
    //         {
    //             "id": 4,
    //             "name": "Zaid Khan",
    //             "age": 21,
    //             "score": 75.5
    //         },
    //         {
    //             "id": 7,
    //             "name": "Maya Shah",
    //             "age": 20,
    //             "score": 91.0
    //         },
    //         {
    //             "id": 2,
    //             "name": "Omar Farooq",
    //             "age": 25,
    //             "score": 78.0
    //         },
    //         {
    //             "id": 10,
    //             "name": "Jawwad",
    //             "age": 20,
    //             "score": 38.5
    //         },
    //         {
    //             "id": 6,
    //             "name": "Hassan Rizvi",
    //             "age": 24,
    //             "score": 84.5
    //         },
    //         {
    //             "id": 0,
    //             "name": "Taha Khan",
    //             "age": 20,
    //             "score": 86.0
    //         }
    //     ]
    //     ,
    //     "4617": [
    //         {
    //             "age": 23,
    //             "average_score": 95.0
    //         },
    //         {
    //             "age": 22,
    //             "average_score": 92.5
    //         },
    //         {
    //             "age": 24,
    //             "average_score": 84.5
    //         },
    //         {
    //             "age": 19,
    //             "average_score": 88.5
    //         },
    //         {
    //             "age": 27,
    //             "average_score": 80.0
    //         }
    //     ]

    // },
}

const tabularAnswers = {
    '4612':"+--------+----------------+------+-------+\n| testId | testName       | age  | score |\n+--------+----------------+------+-------+\n|      5 | Aisha Siddiqui |   23 |    95 |\n|      1 | Sara Ali       |   22 |  92.5 |\n|      7 | Maya Shah      |   20 |    91 |\n+--------+----------------+------+-------+\n",
    '4613':"+-------------------+\n| average           |\n+-------------------+\n| 80.72727272727273 |\n+-------------------+\n",
    '4614':"+--------+----------+------+-------+\n| testId | testName | age  | score |\n+--------+----------+------+-------+\n|     10 | Jawwad   |   20 |  38.5 |\n+--------+----------+------+-------+\n",
}

module.exports.sendQueries = (req, res) => {

    try {
        const level = req.params.level;
        const q = 'select * from queries where level = ?';
        db.query(q, [level], (err, result) => {
            if (result.length == 0 || err) {
                res.status(400).json({ message: 'something went wrong' });
            }
            else {
                res.status(200).json({ message: 'Queris found successfully', queries: result.map(query => ({ ...query, id: query.queryId })) })
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

function sendStatus(email, status, level = 0) {

    const io = socket.getIO();
    if(level == 0) io.emit('fileStatusUpdated', { email: email, status: status });
    else io.emit('levelUpdated', { email, level : level + 1 });

}

function deepEqual(queryId, b) {
    try {
        
        if (tabularAnswers[queryId] == b) return true;
        const parsedData = b.split('\n').slice(3,-1).map(row => row.split('|').slice(1,-1)) 

// Currenlty true is returned, check should be performed
        return true;

    }
    catch (err) {
        console.log(err.message);
    }
}

function statusSender(email, id, team_id, query, answer) {
    const delayTime = 3000;
    setTimeout(() => {

        sendStatus(email, 'submitted');
        const q1 = 'update solutions set status = \'pending\' where id = ?';
        db.query(q1, [id], (err2, result2) => {
            if (err2) { console.error('cannot update to pending'); }
            else {
                setTimeout(() => {

                    sendStatus(email, 'pending');

                    if(deepEqual(query.queryId , answer)){
                        const acceptQuery = `update solutions set status = \'accepted\' where id = ${id}`;
                        db.execute(acceptQuery);
                        sendStatus(email,'accepted');
                        
                        const levelCount = 'select count(*) as solved from solutions where status = \'accepted\' and team_id = ?'
                        db.query(levelCount,[team_id],(err3, result3) => {
                            if(!err3 || result3.length > 0){
                                const levels = Math.floor(result3[0].solved / 3);
                                
                                if(levels > 0){
                                    sendStatus(email,'',levels)
                                    db.execute(`update participants set level = ${levels + 1} where team_id = ${team_id}`)
                                }
                                }
                        })
                    }else{
                        const rejectQuery = `update solutions set status = \'rejected\' where id = ${id}`;
                        db.execute(rejectQuery);
                        sendStatus(email,'rejected');
                    }

                }, delayTime);
            }
        });
    }, delayTime)
}

module.exports.submitQuery = (req, res) => {

    const { email, team_id, query, answer } = req.body;
    const q = 'Insert into solutions (team_id,queryId) values (?,?)'
    try {

        db.query(q, [team_id, query.queryId], (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong!' })
            }
            else {
                statusSender(email, result.insertId, team_id, query, answer);                
                res.status(200).json({ message: 'File Submitted' });
            }
        })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'internal server error' })
    }
}

module.exports.sendLeaderboardData = (req, res) => {
    let tempLeaderboardData = [
        {
            team_id: 10100,
            teamName: "SQL Masters",
            currentLevel: 5,
            queriesSolved: {
                Hard: 3,
                medium: 4,
                Easy: 2
            },
            submissions: 11,
            totalScore: 800
        },
        {
            team_id: 10101,
            teamName: "Query Questers",
            currentLevel: 4,
            queriesSolved: {
                Hard: 2,
                medium: 4,
                Easy: 2
            },
            submissions: 10,
            totalScore: 650
        },
        {
            team_id: 10102,
            teamName: "Data Dragons",
            currentLevel: 3,
            queriesSolved: {
                Hard: 2,
                medium: 3,
                Easy: 2
            },
            submissions: 7,
            totalScore: 550
        },
        {
            team_id: 10103,
            teamName: "Schema Slayers",
            currentLevel: 3,
            queriesSolved: {
                Hard: 1,
                medium: 3,
                Easy: 2
            },
            submissions: 9,
            totalScore: 400
        },
        {
            team_id: 10104,
            teamName: "Table Titans",
            currentLevel: 2,
            queriesSolved: {
                Hard: 1,
                Medium: 2,
                Easy: 2
            },
            submissions: 14,
            totalScore: 350
        },
    ];

    try {


        const q = 'SELECT * FROM participants';
        db.query(q, [], async (err, result1) => {
            if (err || result1.length === 0) {
                return res.status(400).json({ message: 'Something went wrong' });
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
                                const updatedQueriesSolved = {
                                    ...acc.queriesSolved,
                                    [curr.difficulty]: curr.queriesSolved || 0,
                                };

                                const updatedAcc = {
                                    totalScore:
                                        acc.totalScore +
                                        (curr.difficulty === 'Easy'
                                            ? 50
                                            : curr.difficulty === 'Medium'
                                                ? 100
                                                : 200),
                                    submissions: acc.submissions + curr.queriesSolved,
                                    queriesSolved: updatedQueriesSolved,
                                };

                                return updatedAcc;
                            },
                            { totalScore: 0, submissions: 0, queriesSolved: { Easy: 0, Medium: 0, Hard: 0 } }
                        );

                        return {
                            ...initialResult,
                            team_id: team.team_id,
                            teamName: team.teamName,
                            currentLevel: team.level,
                        };
                    })
                );

                res.status(200).json({ message: 'Success', teamData: [...tempLeaderboardData, ...finalResult] });
            } catch (error) {
                console.error('Error:', error.message);
                res.status(500).json({ message: 'Something went wrong!' });
            }
        });

    }
    catch (err) {
        console.log(err.message);
    }

}