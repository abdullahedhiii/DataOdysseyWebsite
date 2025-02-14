const { db } = require("../db");
const socket = require("../socket");

// This data would be use to compare rows if tabular results dosen't match exactly, possibly due to change in headers
const answers = {
  4609:[
    [ 'Shipped', '2025-02-01 10:30:00' ],
    [ 'Pending', '2024-02-13 07:25:00' ],
    [ 'Delivered', '2024-03-02 10:45:00' ]
  ],
  4610:[
    [
      '9',
      '5',
      'Gaming Console',
      'Next-gen gaming console',
      '499.99',
      '8'
    ]
  ],
  4611: [['Zara','2222.10']],
  4612:[['T-shirt','15'],['Pants','14'],['Pull overs','14'],['Jeans','14'],['Gaming Chair','14']],
  4613: [ [ 'Jeans', '3', '119.97' ], [ 'Gaming Chair', '1', '199.99' ] ] ,
 
 
  4614:[
    [ '1', '1', 'Laptop', 'High-performance laptop', '1200.99', '10' ],
    [
      '9',
      '5',
      'Gaming Console',
      'Next-gen gaming console',
      '499.99',
      '8'
    ],
    [
      '10',
      '6',
      'Gaming Chair',
      'Ergonomic gaming chair',
      '199.99',
      '12'
    ]
  ]
  ,
  
  
  4615:[ [ '2', 'Jane Smith', '1654.74' ] ],
  4616:[
    [
      '11',
      '6',
      'Lighting Keyboard',
      'The best keyboard in town',
      '199.99',
      '22'
    ],
    [ '12', '2', 'Shoes', 'Air forces', '299.99', '18' ]
  ],
  4617:[
    [ '1', 'John Doe', '2421.97' ],
    [ '2', 'Jane Smith', '1678.94' ],
    [ '3', 'Alice Johnson', '399.96' ],
    [ '4', 'Bob Brown', '149.95' ],
    [ '5', 'Charlie Davis', '79.98' ],
    [ '6', 'David Miller', '2299.93' ],
    [ '7', 'Emma Wilson', '1240.97' ],
    [ '8', 'Frank Harris', '59.97' ],
    [ '9', 'Grace Lee', '1449.44' ],
    [ '10', 'Henry Adams', '59.98' ],
    [ '11', 'Ivy Carter', '359.96' ],
    [ '12', 'Jack Evans', '319.96' ],
    [ '13', 'John Doe', '999.98' ],
    [ '14', 'Jane Smith', '6084.91' ],
    [ '15', 'Alice Johnson', '59.97' ],
    [ '16', 'Bob Brown', '1598.98' ],
    [ '17', 'Charlie Davis', '129.99' ],
    [ '18', 'David Miller', '89.97' ],
    [ '19', 'Emma Wilson', '179.98' ],
    [ '20', 'Frank Harris', '199.95' ],
    [ '21', 'Grace Lee', '499.99' ],
    [ '22', 'Henry Adams', '399.98' ],
    [ '23', 'Ivy Carter', '3602.97' ],
    [ '24', 'Jack Evans', '119.94' ],
    [ '25', 'Kelly Baker', '3997.45' ],
    [ '26', 'Liam Turner', '129.99' ],
    [ '27', 'Mia Martin', '89.97' ],
    [ '28', 'Nathan Scott', '179.98' ],
    [ '29', 'Olivia White', '159.96' ],
    [ '30', 'Paul Thomas', '3099.92' ],
    [ '31', 'John Doe', '1240.97' ],
    [ '32', 'Jane Smith', '79.96' ],
    [ '33', 'Alice Johnson', '2398.47' ],
    [ '34', 'Bob Brown', '649.95' ],
    [ '35', 'Charlie Davis', '29.99' ],
    [ '36', 'David Miller', '979.94' ]
  ],
  

  ///murder mystery from
  4618 :[
    [
      'Hamilton: Lee, do you yield? Burr: You shot him in the side! Yes he yields!'
    ],
    [ 'Report Not Found' ],
    [
      'Security footage shows that there were 2 witnesses. The first witness lives at the last house on Northwestern Dr. The second witness, named Annabel, lives somewhere on Franklin Ave.'
    ]
  ],
 4619: [[
  'Security footage shows that there were 2 witnesses. The first witness lives at the last house on Northwestern Dr. The second witness, named Annabel, lives somewhere on Franklin Ave.'
]],
 4620 :[ [ 'Morty Schapiro', '4919' ] ] ,
 4621 : [['Annabel Miller','16371']],
 4622 :[
    ['Annabel Miller','I saw the murder happen, and I recognized the killer from my gym when I was working out last week on January the 9th.'],
    ['Morty Schapiro','I heard a gunshot and then saw a man run out. He had a "Get Fit Now Gym" bag. The membership number on the bag started with "48Z". Only gold members have those bags. The man got into a car with a plate that included "H42W".']
 ],
 4623:[
  [ 'X0643', 'Shondra Ledlow', 'silver' ],
  [ 'UK1F2', 'Zackary Cabotage', 'silver' ],
  [ 'XTE42', 'Sarita Bartosh', 'gold' ],
  [ '1AE2H', 'Adriane Pelligra', 'silver' ],
  [ '6LSTG', 'Burton Grippe', 'gold' ],
  [ '7MWHJ', 'Blossom Crescenzo', 'regular' ],
  [ 'GE5Q8', 'Carmen Dimick', 'gold' ],
  [ '48Z55', 'Jeremy Bowers', 'gold' ],
  [ '90081', 'Annabel Miller', 'gold' ]
],
4624:[
  [ '48Z55', 'Jeremy Bowers', 'gold' ],
  [ '6LSTG', 'Burton Grippe', 'gold' ],
  [ '90081', 'Annabel Miller', 'gold' ],
  [ 'GE5Q8', 'Carmen Dimick', 'gold' ],
  [ 'XTE42', 'Sarita Bartosh', 'gold' ]
],
4625:[ [ '24556', '3' ], [ '99716', '3' ] ] ,
4626: [ [ '423327', 'male', '70' ] ],
4627: [ [ 'Jeremy Bowers', '48Z55' ] ] ,
4628:[['I was hired by a woman with a lot of money. I am not sure what her name is but I know she is around 5ft 5inch (65 cm) or 5ft 7inch (67cm). She has red hair and she drives a Tesla Model S.I know that she attended the SQL Symphony Concert 3 times in December 2017.']],
4629 : [ [ 'Miranda Priestly', '66', 'Model S' ] ],
4630: [ [ 'Miranda Priestly', '66', 'Model S' ] ],
4631: [
  [ '99716', 'SQL Symphony Concert' ],
  [ '99716', 'SQL Symphony Concert' ],
  [ '99716', 'SQL Symphony Concert' ]
],
4632: [['Miranda Priestly']] // this will be the last query from first database i.e the insert query --

};


// These are the hard coded tabular results of the stdout stream of oneCompiler
const tabularAnswers = {
  4609:`+-----------+---------------------+\n| status    | order_date          |\n+-----------+---------------------+\n| Shipped   | 2025-02-01 10:30:00 |\n| Pending   | 2024-02-13 07:25:00 |\n| Delivered | 2024-03-02 10:45:00 |\n+-----------+---------------------+\n`,
  4610:`+------------+-----------+----------------+-------------------------+--------+----------------+\n| product_id | seller_id | name           | description             | price  | stock_quantity |\n+------------+-----------+----------------+-------------------------+--------+----------------+\n|          9 |         5 | Gaming Console | Next-gen gaming console | 499.99 |              8 |\n+------------+-----------+----------------+-------------------------+--------+----------------+\n`,
  4611:`+------+---------------+\n| name | total_revenue |\n+------+---------------+\n| Zara |       2222.10 |\n+------+---------------+\n`,
  4612:`+--------------+----------------+\n| name         | total_quantity |\n+--------------+----------------+\n| T-shirt      |             15 |\n| Pants        |             14 |\n| Pull overs   |             14 |\n| Jeans        |             14 |\n| Gaming Chair |             14 |\n+--------------+----------------+\n`,
  4613:`+--------------+----------+-------------+\n| name         | quantity | total_price |\n+--------------+----------+-------------+\n| Jeans        |        3 |      119.97 |\n| Gaming Chair |        1 |      199.99 |\n+--------------+----------+-------------+\n`,
  4614:`+------------+-----------+----------------+-------------------------+---------+----------------+\n| product_id | seller_id | name           | description             | price   | stock_quantity |\n+------------+-----------+----------------+-------------------------+---------+----------------+\n|          1 |         1 | Laptop         | High-performance laptop | 1200.99 |             10 |\n|          9 |         5 | Gaming Console | Next-gen gaming console |  499.99 |              8 |\n|         10 |         6 | Gaming Chair   | Ergonomic gaming chair  |  199.99 |             12 |\n+------------+-----------+----------------+-------------------------+---------+----------------+\n`,
  
  4615:`+-------------+------------+-------------------+\n| customer_id | name       | total_money_spent |\n+-------------+------------+-------------------+\n|           2 | Jane Smith |           1654.74 |\n+-------------+------------+-------------------+\n`,
  4616:`+------------+-----------+-------------------+---------------------------+--------+----------------+\n| product_id | seller_id | name              | description               | price  | stock_quantity |\n+------------+-----------+-------------------+---------------------------+--------+----------------+\n|         11 |         6 | Lighting Keyboard | The best keyboard in town | 199.99 |             22 |\n|         12 |         2 | Shoes             | Air forces                | 299.99 |             18 |\n+------------+-----------+-------------------+---------------------------+--------+----------------+\n`,
  4617:'+----------+---------------+----------------+\n| order_id | name          | correct_amount |\n+----------+---------------+----------------+\n|        1 | John Doe      |        2421.97 |\n|        2 | Jane Smith    |        1678.94 |\n|        3 | Alice Johnson |         399.96 |\n|        4 | Bob Brown     |         149.95 |\n|        5 | Charlie Davis |          79.98 |\n|        6 | David Miller  |        2299.93 |\n|        7 | Emma Wilson   |        1240.97 |\n|        8 | Frank Harris  |          59.97 |\n|        9 | Grace Lee     |        1449.44 |\n|       10 | Henry Adams   |          59.98 |\n|       11 | Ivy Carter    |         359.96 |\n|       12 | Jack Evans    |         319.96 |\n|       13 | John Doe      |         999.98 |\n|       14 | Jane Smith    |        6084.91 |\n|       15 | Alice Johnson |          59.97 |\n|       16 | Bob Brown     |        1598.98 |\n|       17 | Charlie Davis |         129.99 |\n|       18 | David Miller  |          89.97 |\n|       19 | Emma Wilson   |         179.98 |\n|       20 | Frank Harris  |         199.95 |\n|       21 | Grace Lee     |         499.99 |\n|       22 | Henry Adams   |         399.98 |\n|       23 | Ivy Carter    |        3602.97 |\n|       24 | Jack Evans    |         119.94 |\n|       25 | Kelly Baker   |        3997.45 |\n|       26 | Liam Turner   |         129.99 |\n|       27 | Mia Martin    |          89.97 |\n|       28 | Nathan Scott  |         179.98 |\n|       29 | Olivia White  |         159.96 |\n|       30 | Paul Thomas   |        3099.92 |\n|       31 | John Doe      |        1240.97 |\n|       32 | Jane Smith    |          79.96 |\n|       33 | Alice Johnson |        2398.47 |\n|       34 | Bob Brown     |         649.95 |\n|       35 | Charlie Davis |          29.99 |\n|       36 | David Miller  |         979.94 |\n+----------+---------------+----------------+\n',
  
  ///muder mysteru from here on
  4618: `+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| description                                                                                                                                                                           |\n+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| Hamilton: Lee, do you yield? Burr: You shot him in the side! Yes he yields!                                                                                                               |\n| Report Not Found                                                                                                                                                                          |\n| Security footage shows that there were 2 witnesses. The first witness lives at the last house on \"Northwestern Dr\". The second witness, named Annabel, lives somewhere on \"Franklin Ave\". |\n+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n`,
  4619 : `+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| description                                                                                                                                                                           |\n+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| Security footage shows that there were 2 witnesses. The first witness lives at the last house on Northwestern Dr. The second witness, named Annabel, lives somewhere on Franklin Ave. |\n+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n`,
  4620 : `+----------------+----------------+\n| name           | address_number |\n+----------------+----------------+\n| Morty Schapiro |           4919 |\n+----------------+----------------+\n`,
  4621 :`+----------------+-------+\n| name           | id    |\n+----------------+-------+\n| Annabel Miller | 16371 |\n+----------------+-------+\n`,

  4622: `+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| name           | transcript                                                                                                                                                                                                                      |\n+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| Annabel Miller | I saw the murder happen, and I recognized the killer from my gym when I was working out last week on January the 9th.                                                                                                           |\n| Morty Schapiro | I heard a gunshot and then saw a man run out. He had a \"Get Fit Now Gym\" bag. The membership number on the bag started with \"48Z\". Only gold members have those bags. The man got into a car with a plate that included \"H42W\". |\n+----------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n`,
4623:`+-------+-------------------+-------------------+\n| id    | name              | membership_status |\n+-------+-------------------+-------------------+\n| X0643 | Shondra Ledlow    | silver            |\n| UK1F2 | Zackary Cabotage  | silver            |\n| XTE42 | Sarita Bartosh    | gold              |\n| 1AE2H | Adriane Pelligra  | silver            |\n| 6LSTG | Burton Grippe     | gold              |\n| 7MWHJ | Blossom Crescenzo | regular           |\n| GE5Q8 | Carmen Dimick     | gold              |\n| 48Z55 | Jeremy Bowers     | gold              |\n| 90081 | Annabel Miller    | gold              |\n+-------+-------------------+-------------------+\n`,
4624:`+-------+----------------+-------------------+\n| id    | name           | membership_status |\n+-------+----------------+-------------------+\n| 48Z55 | Jeremy Bowers  | gold              |\n| 6LSTG | Burton Grippe  | gold              |\n| 90081 | Annabel Miller | gold              |\n| GE5Q8 | Carmen Dimick  | gold              |\n| XTE42 | Sarita Bartosh | gold              |\n+-------+----------------+-------------------+\n`,
4625:`+-----------+--------+\n| person_id | visits |\n+-----------+--------+\n|     24556 |      3 |\n|     99716 |      3 |\n+-----------+--------+\n`,
4626:`+--------+--------+--------+\n| id     | gender | height |\n+--------+--------+--------+\n| 423327 | male   |     70 |\n+--------+--------+--------+\n`,
4627: `+---------------+-------+\n| name          | id    |\n+---------------+-------+\n| Jeremy Bowers | 48Z55 |\n+---------------+-------+\n`,
4628: `+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| transcript                                                                                                                                                                                                                                                             |\n+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| I was hired by a woman with a lot of money. I am not sure what her name is but I know she is around 5ft 5inch (65 cm) or 5ft 7inch (67cm). She has red hair and she drives a Tesla Model S.I know that she attended the SQL Symphony Concert 3 times in December 2017. |\n+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n`,
4629:`+------------------+--------+-----------+\n| name             | height | car_model |\n+------------------+--------+-----------+\n| Miranda Priestly |     66 | Model S   |\n+------------------+--------+-----------+\n`,
4630: `+------------------+--------+-----------+\n| name             | height | car_model |\n+------------------+--------+-----------+\n| Miranda Priestly |     66 | Model S   |\n+------------------+--------+-----------+\n`,
4631 : `+-----------+----------------------+\n| person_id | event_name           |\n+-----------+----------------------+\n|     99716 | SQL Symphony Concert |\n|     99716 | SQL Symphony Concert |\n|     99716 | SQL Symphony Concert |\n+-----------+----------------------+\n`,
4632 : ` +------------------+| value            |+------------------+| Miranda Priestly |+------------------+`,



};

module.exports.sendQueries = (req, res) => {
  try {
    const [level, team_id] = req.params.id.split(".");
    console.log('feyching queries ',level,team_id);
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
   //   console.log(result);
      if (err || result.length === 0) {
        return res.status(200).json([]);
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
  console.log(queryId,b);
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
    console.log('parsed' ,parsedData, "\n");

    let i = 0;
    for (const row of answers[queryId]) {
      const ele2 = JSON.stringify(row);
      const ele1 = JSON.stringify(parsedData[i]);
      console.log('row ',ele2);
      console.log('rrrr ',ele1);
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
  const delayTime = 1000;
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
        hard: 3,
        medium: 4,
        easy: 2,
      },
      submissions: 11,
      totalScore: 800,
    },
    {
      team_id: 10101,
      teamName: "Query Questers",
      currentLevel: 4,
      queriesSolved: {
        hard: 2,
        medium: 4,
        easy: 2,
      },
      submissions: 10,
      totalScore: 650,
    },
    {
      team_id: 10102,
      teamName: "Data Dragons",
      currentLevel: 3,
      queriesSolved: {
        hard: 2,
        medium: 3,
        easy: 2,
      },
      submissions: 7,
      totalScore: 550,
    },
    {
      team_id: 10103,
      teamName: "Schema Slayers",
      currentLevel: 3,
      queriesSolved: {
        hard: 1,
        medium: 3,
        easy: 2,
      },
      submissions: 9,
      totalScore: 400,
    },
    {
      team_id: 10104,
      teamName: "Table Titans",
      currentLevel: 2,
      queriesSolved: {
        hard: 1,
        medium: 2,
        easy: 2,
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
                    (curr.difficulty === "easy"
                      ? 50 * curr.queriesSolved
                      : curr.difficulty === "medium"
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
