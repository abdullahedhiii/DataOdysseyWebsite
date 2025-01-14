create database data_dungeon;
use data_dungeon;

CREATE TABLE participants (
 teamName VARCHAR(30), 
 email VARCHAR(30) PRIMARY KEY, 
 password VARCHAR(100),
 member_count INT DEFAULT 1,
 level INTEGER default 1 
 );
 
CREATE TABLE queries (
    queryId INTEGER PRIMARY KEY AUTO_INCREMENT,
    description varchar(300) not null,
    level INTEGER not null,
    difficulty varchar(10) not null,
    title VARCHAR (50)
);
ALTER TABLE queries AUTO_INCREMENT = 4609;

CREATE TABLE solutions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email varchar(30),
    queryId INTEGER,
    status VARCHAR(15) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'pending', 'accepted')),
    CONSTRAINT solverRef FOREIGN KEY (email) REFERENCES participants(email),
    CONSTRAINT QuestionRef FOREIGN KEY (queryId) REFERENCES queries(queryId)
);
ALTER TABLE solutions AUTO_INCREMENT  = 4392;

insert into queries (title, description, level, difficulty) values ('Tracking Time Efficiency of Top Participants','To highlight time efficiency, the organizers want to find the fastest participant in solving at least 5 problems while maintaining a position in the top 10 scorers.',1,'Easy');
insert into queries (title, description, level, difficulty) values ('Identifying the Clutch Performers','During the competition, organizers want to identify users who made a significant comeback by being outside the top 10 in the first half but finishing in the top 5 by the end. This will highlight participants who showed exceptional performance under pressure.',1,'Medium');
insert into queries (title, description, level, difficulty) values ('Detecting Problem Masters','The organizers want to reward users who solved the hardest problems (those solved by the least number of participants). The query should list the hardest problems and the users who solved them.',1,'Hard');

drop table solutions;
drop table queries;
select * from queries;