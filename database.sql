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

insert into queries (title, description, level, difficulty,pdfURL) 
values ('Identifying Frequent Gym Visitors',
'Find the top 3 people who checked into the gym the most times in a single day. Display their names, the date, and the number of check-ins.
',1,'Easy','/queries/Question1-Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL)
values ('High Earning Drivers',
'List the names of people whose annual income is above $100,000 and who drive a car manufactured by Tesla.',1,'Medium','/queries/Question2-Level1.pdf');

insert into queries (title, description, level, difficulty,pdfURL)
values ('Crime Scene Correlations',
'Identify the cities where multiple crime scenes of type ''Homicide'' have been reported. Display the city and the count of incidents.
',1,'Hard','/queries/Question3-Level1.pdf');
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