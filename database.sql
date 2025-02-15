create database data_dungeon;
use data_dungeon;

CREATE TABLE Competition (
    competition_id INT default 88829,
    competitionName VARCHAR(100) default 'Data Odyssey',
    competitionDate DATE,
    startTime TIME,
    endTime TIME
 );
 INSERT INTO Competition VALUES ();
 select * from Competition;
update Competition set competitionName = 'Data Odyssey' where competition_id = 88829;

CREATE TABLE participants (
 teamName VARCHAR(30), 
 email VARCHAR(30) , 
 password VARCHAR(100),
 member_count INT DEFAULT 1,
 level INTEGER default 1 
 );
ALTER TABLE participants ADD COLUMN team_id INT AUTO_INCREMENT PRIMARY KEY; 
ALTER TABLE participants auto_increment = 10010;
alter table  participants add column firstLogin Boolean default TRUE;

select * from participants;
CREATE TABLE queries (
    queryId INTEGER PRIMARY KEY AUTO_INCREMENT,
    description varchar(600) not null,
    level INTEGER not null,
    difficulty varchar(10) not null,
    title VARCHAR (200),
    pdfURL VARCHAR(255)
);
ALTER TABLE queries AUTO_INCREMENT = 4609;

CREATE TABLE solutions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    team_id int,
    queryId INTEGER,
    status VARCHAR(15) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'pending', 'accepted','rejected')),
    CONSTRAINT solverRef FOREIGN KEY (team_id) REFERENCES participants(team_id),
    CONSTRAINT QuestionRef FOREIGN KEY (queryId) REFERENCES queries(queryId)
);
ALTER TABLE solutions AUTO_INCREMENT  = 4392;
ALTER TABLE solutions ADD COLUMN submitted_at DATETIME default current_timestamp;


--
--insert into queries (title, description, level, difficulty) values ('Find Position Holders','Find the top three scorers of the class',1,'Easy');
--insert into queries (title, description, level, difficulty) values ('Class Callibre','A class can be interpreted on what amount of score almost every student is achieving. Find how much intelligent this class is',1,'Easy');
--insert into queries (title, description, level, difficulty) values ('Failed Students','It was recently announced that students scoring below 50 will be considered as failed. Find the students who got failed',1,'Easy');
--insert into queries (title, description, level, difficulty) values ('Similar Students','Teacher want to group students of same age for an activity. Help teacher to get the result',2,'Medium');
--insert into queries (title, description, level, difficulty) values ('Serial List','To avoid any biasness, teacher decided to make the serial list in chronological order. Give the sorted list of students',2,'Medium');
--insert into queries (title, description, level, difficulty) values ('Insights','Find the average score of students grouped by their age, but only include those ages where the average score is above 80. Sort the result in descending order of the average score.',2,'Medium');
-- 
--update queries set level = 3 where queryId = 4612 or queryId = 4609 or queryId = 4611;






update queries set level = 2 where queryId = 4612;


-------------final queries ---------

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Lost Order History',
'Scenario:
John Doe, a long-time customer, claims he has placed several orders but can not find any record of them in her account. He is frustrated and wants a list of all orders he has placed in the past, including order date and status, to verify. 
',1,'easy','/queries/Question1 - Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('The Disappearing Products Mystery ',
'Taha, the owner of ‘Gaming World’, swears that he added new products to his store last week, but when he checks his inventory, some of them are missing. He wants a list of all products he is selling, along with their stock quantity, to double-check. 
',1,'medium','/queries/Question2 - Level1.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES (' The Curious Seller Revenue Report ',
'Scenario: Abdullah,the owner of Zara ,has been running his store for months but has no idea how much revenue he has made. He wants to know the total revenue generated from all the orders he has delivered.
',1,'hard','/queries/Question3 - Level1.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES (' The Best-Seller Challenge  ',
'The marketplace is running a competition to reward the top 5 best-selling products. Your job is to identify these products based on the total quantity sold and provide the product names.
',2,'easy','/queries/Question1 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('What Did I Order Again? ',
'James placed an order but forgot what he purchased! He only remembers the order ID: 12 . He needs a detailed breakdown of his order, including product names, quantities, and the total price per product. Write an SQL query to refresh James’s memory.
',2,'medium','/queries/Question2 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('  The Vanishing Stock Alert  ',
'A warehouse manager is in panic mode! Some products are almost sold out, and those products are in high demand. Find all products where the stock quantity has reached the threshold set by the manager i.e less than 15, so the manager can restock them before more complaints arrive.
',2,'hard','/queries/Question3 - Level2.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('  The Marketplace’s Biggest Spender  ',
'The platform wants to reward its most valuable customer—the one who has spent the most money on orders. Your job is to find out who this customer is and how much they have spent in total. 
',3,'easy','/queries/Question1 - Level3.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('   The Ghost Products  ',
'Some products have been listed forever, but strangely, no one has ever ordered them! The marketing team wants to run a promotion on these “ghost products.” 
',3,'medium','/queries/Question2 - Level3.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('  The Wrong Price Scandal!   ',
'Customers are reporting that their order totals don’t add up correctly. Upon investigation, you realize that the total_amount in the order table has been incorrectly inserted. Use the ordered_items table to recalculate and display the correct order totals (no need to update).
',3,'hard','/queries/Question3 - Level3.pdf');


---2nd database


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Crime Scene Reports','Scenario: Start with the basics. What happened in the city on January 15, 2018?
(date format : yyyymmdd)',4,'easy','/queries/Question1 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Crime Scene Reports (only murders in the city)',
'What are we looking for ? Murders? Find the murder(s) that took place in 
the city on January 15, 2018. (date format : yyyymmdd)'
,4,'medium','/queries/Question2 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 1: Last House on Northwestern Dr',
'Track down the first witness.'
,4,'hard','/queries/Question3 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 2: Annabel on Franklin Ave',
'Find "Annabel" on Franklin Ave'
,5,'easy','/queries/Question1 - Level5.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witnesses Interview',
'Extract interview transcripts mentioning the "gym."'
,5,'medium','/queries/Question2 - Level5.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Gym Check-ins',
'Find gym members who checked in on January the 9th.'
,5,'hard','/queries/Question3 - Level5.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Narrow down the Gym Check-ins',
'Find gym members who checked in on January the 9th, but filter them based on the second witness.'
,6,'easy','/queries/Question1 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Symphony Concert',
'Did the suspects attend a concert in December 2017?Find attendees of the event ï¿½SQL Symphony Concertï¿½ three times in December 2017.'
,6,'medium','/queries/Question2 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Car Clue','A witness spotted a male fleeing the scene in a car with plate containing ï¿½H42W.ï¿½.Find drivers with number plates containing ï¿½H42W.ï¿½'
,6,'hard','/queries/Question3 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Person-Car Match','
Link the driver to gym suspects.  
Task:Find which gym member owns the car.  
'
,7,'easy','/queries/Question1 - Level7.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Confession ','
Jeremy Bowersï¿½ interview reveals a twist.  
Task: Retrieve Jeremyï¿½s full transcript.'
,7,'medium','/queries/Question2 - Level7.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Identify Potential Masterminds','
 Use Jeremyï¿½s clues to find the potential mastermind.  
Task: Identify women with red hair and a Tesla'
,7,'hard','/queries/Question3 - Level7.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Did we miss one clue?','
Use all the clues to find the potential mastermind.  
Task: Identify women with red hair, a Tesla and love for concerts'
,8,'easy','/queries/Question1 - Level8.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Miranda loves Symphony concerts only?
','Did she only ever attend Symphony concerts?  
Task: Prove Jeremyï¿½s statement right
Clue : She never checked in to any other concerts(empty result)'
,8,'medium','/queries/Question2 - Level8.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Seal the case','
Seal the case.  
Task: Declare Miranda Priestly as the mastermind.
Hint : how would you close a case in this scenario?'
,8,'hard','/queries/Question3 - Level8.pdf');



select * from queries;

select * from participants;
delete  from solutions where id = 4441; 
update participants set level = 2 where team_id = 10010;

drop table solutions;
drop table queries;
select * from solutions;