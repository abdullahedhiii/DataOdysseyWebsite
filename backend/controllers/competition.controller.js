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

const oracleTabularAnswers = {
    4609: `\nSTATUS\n--------------------\nORDER_DATE\n---------------------------------------------------------------------------\nshipped\n01-FEB-25 10.30.00.000000 AM\n\npending\n13-FEB-24 07.25.00.000000 AM\n\ndelivered\n02-MAR-24 10.45.00.000000 AM\n\n`,
    4610 : `\nPRODUCT_ID| SELLER_ID\n----------|----------\nNAME\n--------------------------------------------------------------------------------\nDESCRIPTION\n--------------------------------------------------------------------------------\n     PRICE|STOCK_QUANTITY\n----------|--------------\n\t 9|\t    5\nGaming Console\nNext-gen gaming console\n    499.99|\t\t8\n\n`,
    4611 : `\nNAME|TOTAL_REVENUE\n----|-------------\nZara|\t    2222.1\n`,
    4612 : `\nNAME\n--------------------------------------------------------------------------------\n  QUANTITY|TOTAL_PRICE\n----------|-----------\nJeans\n\t 3|\t119.97\n\nGaming Chair\n\t 1|\t199.99\n\n`,

    4613 :`\nNAME\n--------------------------------------------------------------------------------\n  QUANTITY|TOTAL_PRICE\n----------|-----------\nJeans\n\t 3|\t119.97\n\nGaming Chair\n\t 1|\t199.99\n\n`,
    4614 : `\nPRODUCT_ID| SELLER_ID\n----------|----------\nNAME\n--------------------------------------------------------------------------------\nDESCRIPTION\n--------------------------------------------------------------------------------\n     PRICE|STOCK_QUANTITY\n----------|--------------\n\t 1|\t    1\nLaptop\nHigh-performance laptop\n   1200.99|\t       10\n\n\t 9|\t    5\nGaming Console\nNext-gen gaming console\n    499.99|\t\t8\n\n\t10|\t    6\nGaming Chair\nErgonomic gaming chair\n    199.99|\t       12\n\n`,
    
    4615: `\nCUSTOMER_ID\n-----------\nNAME\n--------------------------------------------------------------------------------\nTOTAL_MONEY_SPENT\n-----------------\n\t  2\nJane Smith\n\t  1654.74\n\n`,
    4616 :`\nPRODUCT_ID| SELLER_ID\n----------|----------\nNAME\n--------------------------------------------------------------------------------\nDESCRIPTION\n--------------------------------------------------------------------------------\n     PRICE|STOCK_QUANTITY\n----------|--------------\n\t11|\t    6\nLighting Keyboard\nThe best keyboard in town\n    199.99|\t       22\n\n\t12|\t    2\nShoes\nAir forces\n    299.99|\t       18\n\n`,
    4617 :`\n  ORDER_ID\n----------\nNAME\n--------------------------------------------------------------------------------\nCORRECT_AMOUNT\n--------------\n\t 1\nJohn Doe\n       2421.97\n\n\t 2\nJane Smith\n       1678.94\n\n\t 3\nAlice Johnson\n\t399.96\n\n\t 4\nBob Brown\n\t149.95\n\n\t 5\nCharlie Davis\n\t 79.98\n\n\t 6\nDavid Miller\n       2299.93\n\n\t 7\nEmma Wilson\n       1240.97\n\n\t 8\nFrank Harris\n\t 59.97\n\n\t 9\nGrace Lee\n       1449.44\n\n\t10\nHenry Adams\n\t 59.98\n\n\t11\nIvy Carter\n\t359.96\n\n\t12\nJack Evans\n\t319.96\n\n\t13\nJohn Doe\n\t999.98\n\n\t14\nJane Smith\n       6084.91\n\n\t15\nAlice Johnson\n\t 59.97\n\n\t16\nBob Brown\n       1598.98\n\n\t17\nCharlie Davis\n\t129.99\n\n\t18\nDavid Miller\n\t 89.97\n\n\t19\nEmma Wilson\n\t179.98\n\n\t20\nFrank Harris\n\t199.95\n\n\t21\nGrace Lee\n\t499.99\n\n\t22\nHenry Adams\n\t399.98\n\n\t23\nIvy Carter\n       3602.97\n\n\t24\nJack Evans\n\t119.94\n\n\t25\nKelly Baker\n       3997.45\n\n\t26\nLiam Turner\n\t129.99\n\n\t27\nMia Martin\n\t 89.97\n\n\t28\nNathan Scott\n\t179.98\n\n\t29\nOlivia White\n\t159.96\n\n\t30\nPaul Thomas\n       3099.92\n\n\t31\nJohn Doe\n       1240.97\n\n\t32\nJane Smith\n\t 79.96\n\n\t33\nAlice Johnson\n       2398.47\n\n\t34\nBob Brown\n\t649.95\n\n\t35\nCharlie Davis\n\t 29.99\n\n\t36\nDavid Miller\n\t979.94\n\n`,
    //murder db
    4618 :`\nDESCRIPTION\n--------------------------------------------------------------------------------\nHamilton: Lee, do you yield? Burr: You shot him in the side! Yes he yields!\nReport Not Found\nSecurity footage shows that there were 2 witnesses. The first witness lives at t\nhe last house on Northwestern Dr. The second witness, named Annabel, lives somew\nhere on Franklin Ave.\n\n`,
    4619 : `\nDESCRIPTION\n--------------------------------------------------------------------------------\nSecurity footage shows that there were 2 witnesses. The first witness lives at t\nhe last house on Northwestern Dr. The second witness, named Annabel, lives somew\nhere on Franklin Ave.\n\n`,
    4620 : `\nNAME\n--------------------------------------------------------------------------------\nADDRESS_NUMBER\n--------------\nMorty Schapiro\n\t  4919\n\n`,
    4621 : `\nNAME\n--------------------------------------------------------------------------------\n\tID\n----------\nAnnabel Miller\n     16371\n\n`,
    4622 : `\nNAME\n--------------------------------------------------------------------------------\nTRANSCRIPT\n--------------------------------------------------------------------------------\nAnnabel Miller\nI saw the murder happen, and I recognized the killer from my gym when I was work\ning out last week on January the 9th.\n\nMorty Schapiro\nI heard a gunshot and then saw a man run out. He had a \\\"Get Fit Now Gym\\\" bag.\nThe membership number on the bag started with \\\"48Z\\\". Only gold members have th\nose bags. The man got into a car with a plate that included \\\"H42W\\\".\n\n`,
    4623 : `\nID\n--------------------------------------------------------------------------------\nNAME\n--------------------------------------------------------------------------------\nMEMBERSHIP_STATUS\n--------------------------------------------------------------------------------\nX0643\nShondra Ledlow\nsilver\n\nUK1F2\nZackary Cabotage\nsilver\n\nXTE42\nSarita Bartosh\ngold\n\n1AE2H\nAdriane Pelligra\nsilver\n\n6LSTG\nBurton Grippe\ngold\n\n7MWHJ\nBlossom Crescenzo\nregular\n\nGE5Q8\nCarmen Dimick\ngold\n\n48Z55\nJeremy Bowers\ngold\n\n90081\nAnnabel Miller\ngold\n\n`,
    4624 : `\nID\n--------------------------------------------------------------------------------\nNAME\n--------------------------------------------------------------------------------\nMEMBERSHIP_STATUS\n--------------------------------------------------------------------------------\nXTE42\nSarita Bartosh\ngold\n\n6LSTG\nBurton Grippe\ngold\n\nGE5Q8\nCarmen Dimick\ngold\n\n48Z55\nJeremy Bowers\ngold\n\n90081\nAnnabel Miller\ngold\n\n`,
    4625 : `+-----------+--------+\n| person_id | visits |\n+-----------+--------+\n|     24556 |      3 |\n|     99716 |      3 |\n+-----------+--------+\n`,
    4626 : `+--------+--------+--------+\n| id     | gender | height |\n+--------+--------+--------+\n| 423327 | male   |     70 |\n+--------+--------+--------+\n`,
    4627 : `+---------------+-------+\n| name          | id    |\n+---------------+-------+\n| Jeremy Bowers | 48Z55 |\n+---------------+-------+\n`,
    4628 : `+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| transcript                                                                                                                                                                                                                                                             |\n+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n| I was hired by a woman with a lot of money. I am not sure what her name is but I know she is around 5ft 5inch (65 cm) or 5ft 7inch (67cm). She has red hair and she drives a Tesla Model S.I know that she attended the SQL Symphony Concert 3 times in December 2017. |\n+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+\n`,
    4629 : `+------------------+--------+-----------+\n| name             | height | car_model |\n+------------------+--------+-----------+\n| Miranda Priestly |     66 | Model S   |\n+------------------+--------+-----------+\n`,
    4630 : `\nNAME\n--------------------------------------------------------------------------------\n    HEIGHT\n----------\nCAR_MODEL\n--------------------------------------------------------------------------------\nMiranda Priestly\n\t66\nModel S\n\n`,
    4631 : `\n PERSON_ID\n----------\nEVENT_NAME\n--------------------------------------------------------------------------------\n     99716\nSQL Symphony Concert\n\n     99716\nSQL Symphony Concert\n\n     99716\nSQL Symphony Concert\n\n`,
    4632 : `\nVALUE\n--------------------------------------------------------------------------------\nMiranda Priestly\n`,
}

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

function deepEqual(queryId, b, selectedDialect) {
  // console.log(queryId, b, oracleTabularAnswers[queryId]);
  console.log(selectedDialect, '\n\n');
  console.log(queryId,'\n\n');
  console.log(b,'\n\n');
  selectedDialect === 'oracle' && console.log('printing oracle answer ' ,oracleTabularAnswers[queryId],'\n\n');
  console.log(tabularAnswers[queryId],'\n\n');
  try {
    if(selectedDialect === 'oracle' && oracleTabularAnswers[queryId] === b) {console.log('comparing as oracle,') ;return true;}
    if (tabularAnswers[queryId] == b) return true;
    if(selectedDialect === 'oracle') return false;
    let parsedData = [];

    if (selectedDialect === "postgresql") {
      let lines = b.split("\n").map(line => line.trim()).filter(line => line.length > 0);

      const filteredLines = lines
      .filter(line => !/^(CREATE TABLE|INSERT \d+ \d+)$/.test(line)) 
      .filter(line => !/^\(\d+ rows?\)$/.test(line)); 

      const headerIndex = filteredLines.findIndex(line => line.includes("|") && !line.includes("+-"));

      if (headerIndex === -1) {
        const header = filteredLines[0];  // First line is the header
        parsedData = filteredLines.slice(2).map(row => [row]); // Data starts from index 2
      } else {
        parsedData = filteredLines.slice(headerIndex + 2).map(row =>
          row.split("|").map(ele => ele.trim()).filter(cell => cell.length > 0)
        );
      }
    } else { // MySQL Parsing
      parsedData = b
        .split("\n")
        .slice(3, -1) // Remove first 3 and last line
        .map((row) =>
          row
            .split("|")
            .slice(1, -1)
            .map((ele) => ele.trim())
        )
        .slice(0, -1);
    }


    let i = 0;
    for (const row of answers[queryId]) {
      const ele2 = JSON.stringify(row);
      const ele1 = JSON.stringify(parsedData[i]);
    
      if (ele1 !== ele2) {
        return false;
      } 
      i++;
    }

    return true;
  } catch (err) {
    return false;
  }
}


function statusSender(email, id, team_id, query, answer,selectedDialect) {
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

          if (deepEqual(query.queryId, answer,selectedDialect)) {
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
                  console.log('setting level of team as ',levels+1,team_id)
                  const updateQuery = `
                    UPDATE participants 
                    SET level = ?, levelCrossedAt = NOW()
                    WHERE team_id = ?`;
                  
                  db.execute(updateQuery, [levels + 1, team_id], (err4, result4) => {
                    if (err4) {
                      console.error("Error updating participant level:", err4);
                    }
                  });
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
  const { email, team_id, query, answer,selectedDialect} = req.body;
  const q = "Insert into solutions (team_id,queryId) values (?,?)";
  try {
    db.query(q, [team_id, query.queryId], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong!" });
      } else {
        statusSender(email, result.insertId, team_id, query, answer,selectedDialect);
        res.status(200).json({ message: "File Submitted" });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports.sendLeaderboardData = (req, res) => {
  try {
    const q = `
    SELECT p.*,count(s.id) as num_submissions 
    FROM participants p
    join solutions s on s.team_id = p.team_id
    group by p.team_id
    `;
    db.query(q, [], async (err, result1) => {
      if (err || result1.length === 0) {
        return res.status(400).json({ message: "Something went wrong" });
      }

      try {
        const finalResult = await Promise.all(
          result1.map(async (team) => {
            let levelStatus = {};
            for (let i = 1; i <= 8; i++) {
              if (i > team.level) {
                levelStatus[`Level ${i}`] = "Not Attempted";
              } else if (i === team.level) {
                levelStatus[`Level ${i}`] = "Attempting";
              } else {
                levelStatus[`Level ${i}`] = "Passed";
              }
            }

            return {
              team_id: team.team_id,
              teamName: team.teamName,
              currentLevel: team.level,
              lastLevelPassed: team.level-1,
              lastPassedTime: team.levelCrossedAt, // Timestamp of last passed level
              submissions : team.num_submissions,
              ...levelStatus,
            };
          })
        );

        finalResult.sort((a, b) => {
          if (b.lastLevelPassed !== a.lastLevelPassed) {
            return b.lastLevelPassed - a.lastLevelPassed; // Higher level first
          }
          return new Date(a.lastPassedTime) - new Date(b.lastPassedTime); // Earlier timestamp first
        });

        res.status(200).json({
          message: "Success",
          teamData: finalResult,
        });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};
