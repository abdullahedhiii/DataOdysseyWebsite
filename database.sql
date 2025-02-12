create database data_dungeon;
use data_dungeon;

select * from participants;
select * from solutions;
select * from queries;

drop table solutions;
drop table queries;
drop table participants;

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
    description varchar(300) not null,
    level INTEGER not null,
    difficulty varchar(10) not null,
    title VARCHAR (50),
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

CREATE TABLE testDB (
    testId INTEGER PRIMARY KEY,
    testName varchar(100),
    age INTEGER,
    score FLOAT
);

select * from testDB;
insert into testDB values (0,'Taha Khan',20,86.0);
insert into testDB values (1, 'Sara Ali', 22, 92.5);
insert into testDB values (2, 'Omar Farooq', 25, 78.0);
insert into testDB values (3, 'Lina Ahmed', 19, 88.5);
insert into testDB values (4, 'Zaid Khan', 21, 75.5);
insert into testDB values (5, 'Aisha Siddiqui', 23, 95.0);
insert into testDB values (6, 'Hassan Rizvi', 24, 84.5);
insert into testDB values (7, 'Maya Shah', 20, 91.0);
insert into testDB values (8, 'Imran Javed', 27, 80.0);
insert into testDB values (9, 'Nadia Malik', 26, 78.5);
insert into testDB values (10, 'Jawwad', 20, 38.5);

drop table solutions;
select * from solutions;
select * from queries;
show constraint






-------------final queries ---------
insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Crime Scene Reports','Scenario: Start with the basics. What happened in the city on January 15, 2018?
(date format : yyyymmdd)',1,'easy','/queries/Question1 - Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Crime Scene Reports (only murders in the city)',
'What are we looking for ? Murders? Find the murder(s) that took place in 
the city on January 15, 2018. (date format : yyyymmdd)'
,1,'medium','/queries/Question2 - Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 1: Last House on Northwestern Dr',
'Track down the first witness.'
,1,'hard','/queries/Question3 - Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 2: Annabel on Franklin Ave',
'Find "Annabel" on Franklin Ave'
,1,'easy','/queries/Question1 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witnesses Interview',
'Extract interview transcripts mentioning the "gym."'
,2,'medium','/queries/Question2 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Gym Check-ins',
'Find gym members who checked in on January the 9th.'
,2,'hard','/queries/Question3 - Level2.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Narrow down the Gym Check-ins',
'Find gym members who checked in on January the 9th, but filter them based on the second witness.'
,3,'easy','/queries/Question1 - Level3.pdf');

select * from queries;