const { db } = require('../db');
const socket = require('../socket');

const answers = {
    1: {
        "4612": [
            { testId: 5, testName: 'Aisha Siddiqui', age: 23, score: 95.0 },
            { testId: 1, testName: 'Sara Ali', age: 22, score: 92.5 },
            { testId: 7, testName: 'Maya Shah', age: 20, score: 91.0 }
        ],
        "4613": [{ average: 73.5 }],
        "4614": [{ testId: 10, testName: 'Jawwad', age: 20, score: 38.5 }]
    },
    2: {
        "4615": [
            {
                "age": 19,
                "number_of_students": 1
            },
            {
                "age": 20,
                "number_of_students": 3
            },
            {
                "age": 21,
                "number_of_students": 1
            },
            {
                "age": 22,
                "number_of_students": 1
            },
            {
                "age": 23,
                "number_of_students": 1
            },
            {
                "age": 24,
                "number_of_students": 1
            },
            {
                "age": 25,
                "number_of_students": 1
            },
            {
                "age": 26,
                "number_of_students": 1
            },
            {
                "age": 27,
                "number_of_students": 1
            }
        ]
        ,
        "4616": [
            {
                "id": 5,
                "name": "Aisha Siddiqui",
                "age": 23,
                "score": 95.0
            },
            {
                "id": 1,
                "name": "Sara Ali",
                "age": 22,
                "score": 92.5
            },
            {
                "id": 3,
                "name": "Lina Ahmed",
                "age": 19,
                "score": 88.5
            },
            {
                "id": 9,
                "name": "Nadia Malik",
                "age": 26,
                "score": 78.5
            },
            {
                "id": 8,
                "name": "Imran Javed",
                "age": 27,
                "score": 80.0
            },
            {
                "id": 4,
                "name": "Zaid Khan",
                "age": 21,
                "score": 75.5
            },
            {
                "id": 7,
                "name": "Maya Shah",
                "age": 20,
                "score": 91.0
            },
            {
                "id": 2,
                "name": "Omar Farooq",
                "age": 25,
                "score": 78.0
            },
            {
                "id": 10,
                "name": "Jawwad",
                "age": 20,
                "score": 38.5
            },
            {
                "id": 6,
                "name": "Hassan Rizvi",
                "age": 24,
                "score": 84.5
            },
            {
                "id": 0,
                "name": "Taha Khan",
                "age": 20,
                "score": 86.0
            }
        ]
        ,
        "4617": [
            {
                "age": 23,
                "average_score": 95.0
            },
            {
                "age": 22,
                "average_score": 92.5
            },
            {
                "age": 24,
                "average_score": 84.5
            },
            {
                "age": 19,
                "average_score": 88.5
            },
            {
                "age": 27,
                "average_score": 80.0
            }
        ]

    },
}

module.exports.sendQueries = (req, res) => {

    try {
        const level = req.params.level;
        // const queries = [ // Should be fethed from a database
        //     {
        //         id: 1,
        //         title: "Tracking Time Efficiency of Top Participants",
        //         description: 'To highlight time efficiency, the organizers want to find the fastest participant in solving at least 5 problems while maintaining a position in the top 10 scorers.',
        //         difficulty: 'Easy',
        //         level:1
        //     },
        //     {
        //         id: 2,
        //         title: "Identifying the Clutch Performers",
        //         description: `During the competition, organizers want to identify users who made a significant comeback by being outside the top 10 in the first half but finishing in the top 5 by the end. This will highlight participants who showed exceptional performance under pressure.`,
        //         difficulty: 'Medium',
        //         level:1
        //     },
        //     {id:3,title:"Detecting Problem Masters", description:'The organizers want to reward users who solved the Hardest problems (those solved by the least number of participants). The query should list the Hardest problems and the users who solved them.', difficulty: 'Hard', level:1},
        //     {id:4,title:"title4", description:'This is an Easy query of level 2', difficulty: 'Easy', level:2},
        //     {id:5,title:"title5", description:'This is a medium query of level 2', difficulty: 'Medium', level:2},
        //     {id:6,title:"title6", description:'This is a Hard query of level 2', difficulty: 'Hard', level:2},
        //     {id:7,title:"title7", description:'This is an Easy query of level 3', difficulty: 'Easy', level:3},
        //     {id:8,title:"title8", description:'This is a medium query of level 3', difficulty: 'Medium', level:3},
        //     {id:9,title:"title9", description:'This is a Hard query of level 3', difficulty: 'Hard', level:3},
        // ]
        // const filteredQueries = queries.filter(ele => ele.level == level).map(ele => ({...ele}));
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

function sendStatus(email, status) {

    const io = socket.getIO();
    io.emit('fileStatusUpdated', { email: email, status: status });

}

function deepEqual(a, b) {
    try {

        if (a === b) return true;

        if (typeof a !== typeof b || a == null || b == null) return false;

        if (typeof a === 'object') {
            // If both are arrays, compare their sorted JSON string representations.
            if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) return false;
                const sortedA = a.map(item => JSON.stringify(item)).sort();
                const sortedB = b.map(item => JSON.stringify(item)).sort();
                for (let i = 0; i < sortedA.length; i++) {
                    if (sortedA[i] !== sortedB[i]) return false;
                }
                return true;
            }
            // Otherwise, if both are plain objects
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            for (let key of keysA) {
                if (!b.hasOwnProperty(key)) return false;
                if (!deepEqual(a[key], b[key])) return false;
            }
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err.message);
    }
}

function statusSender(email, id, query, answer) {
    const delayTime = 3000;
    setTimeout(() => {

        sendStatus(email, 'submitted');
        const q1 = 'update solutions set status = \'pending\' where id = ?';
        db.query(q1, [id], (err2, result2) => {
            if (err2) { console.error('cannot update to pending'); }
            else {
                setTimeout(() => {

                    sendStatus(email, 'pending');

                    db.query(answer, [], (errAnswer, resultAnswer) => {
                        if (errAnswer) {
                            sendStatus(email, 'rejected');
                            db.execute(`update solutions set status = \'rejected\' where id = ${id}`);

                        } else {
                            if (deepEqual(resultAnswer, answers[query.level][query.queryId])) {

                                const q2 = 'update solutions set status = \'accepted\' where id = ?'
                                db.query(q2, [id], (err3, result3) => {
                                    if (err3) { console.error('cannot update to accepted'); }
                                    else {
                                        const updateLevel = 'update participants set level = ? where email = ?';
                                        db.query(updateLevel, [query.level + 1, email], (errFinal, resultFinal) => {
                                            if (errFinal) {
                                                res.status(400).json({ message: errFinal.message })
                                                return
                                            }
                                            else {
                                                setTimeout(() => {
                                                    sendStatus(email, 'accepted');
                                                }, delayTime)
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                const q2 = 'update solutions set status = \'rejected\' where id = ?'
                                db.query(q2, [id], (err3, result3) => {
                                    if (err3) { console.error('cannot update status'); }
                                    else {
                                        setTimeout(() => {
                                            sendStatus(email, 'rejected');
                                        }, delayTime)
                                    }
                                })
                            }
                        }
                    })

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
                statusSender(email, result.insertId, query, answer);
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