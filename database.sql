create database data_dungeon;
use data_dungeon;

CREATE TABLE Competition (
    competition_id INT PRIMARY KEY AUTO_INCREMENT,
    competitionName VARCHAR(100) NOT NULL DEFAULT 'Data Odyssey',
    competitionDate DATE NOT NULL DEFAULT '2025-02-19',
    startTime TIME NOT NULL DEFAULT '09:30:00',
    endTime TIME NOT NULL DEFAULT '12:00:00'
);

INSERT INTO Competition VALUES ();

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



-------------final queries ---------
update participants set level=1;
INSERT INTO queries (title, description, level, difficulty, pdfURL) 
VALUES ('SQL Investigation Challenge:',
'A frustrated customer, John Doe, insists he has placed multiple orders—but his account shows nothing.\n\nIs it an error, or is something missing?\n\nYour task: Retrieve all past orders placed by John Doe, including order date and status.\nCan you uncover the lost order history?', 
1, 'easy', '/queries/Question1 - Level1.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Inventory Mystery ',
'Taha, the owner of Gaming World, is convinced he added new products last week—but now, some have vanished. Is it a mistake, a glitch, or something more?\n\n
Your task: Retrieve a list of all products Taha is selling, along with their stock quantity.\n\n Can you solve the case of the disappearing products?
',1,'medium','/queries/Question2 - Level1.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Revenue Investigation ',
'
Abdullah, the owner of Zara, has been running his store for months—but he has no idea how much money he’s made. Could his revenue be hiding in plain sight?
\n\nYour task: Write a query to calculate the total revenue from all delivered orders. \n\nTime to show Abdullah the true power of his sales!
',1,'hard','/queries/Question3 - Level1.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES (' SQL Best-Seller Hunt  ',
'The marketplace is on a mission—to reward the top 5 best-selling products. But which products truly dominate the charts?\n\n
Your task: Write a query to find the top 5 products based on total quantity sold. \nCan you uncover the champions of the marketplace?',2,'easy','/queries/Question1 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Order Recall Challenge',
'James placed an order but completely forgot what he purchased—all he remembers is Order ID: 12.\n\n
Your task: Write a query to retrieve a detailed breakdown of his order, including product names, quantities, and the total price per product.\n
Can you help James remember his order before it arrives?',2,'medium','/queries/Question2 - Level2.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES (' SQL Stock Shortage Alert   ',
'The warehouse manager is in panic mode—high-demand products are running out fast! If they are not restocked soon, customer complaints will flood in.\n\n
Your task: Write a query to find all products where the stock quantity is less than 15, so the manager can act before it is too late.\n
Can you prevent a supply crisis?
',2,'hard','/queries/Question3 - Level2.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('  SQL High Roller Hunt   ',
'The marketplace is rolling out a VIP reward for its biggest spender—the customer who has spent the most money on orders. But who is it?\n\n
Your task: Write a query to find the top spender and the total amount they have spent.',3,'easy','/queries/Question1 - Level3.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('  SQL Ghost Hunt ',
'Some products have been sitting on the marketplace forever, yet no one has ever ordered them.\n\n Are they cursed? Forgotten? Or just waiting for their time to shine?
\nYour task: Write a query to find all “ghost products”—products that have never been ordered.
\nTime to bring these forgotten items back to life!
',3,'medium','/queries/Question2 - Level3.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES (' SQL Pricing Scandal   ',
'Customers are furious—their order totals don’t add up! Upon investigation, something seems off in the order records.\n\n Could it be a mistake, or is someone like Talha behind this? ?
\nYo
-ur task: Recalculate the correct order totals using the ordered_items table and display them (without updating).
\nCan you uncover the truth before customers lose trust?',3,'hard','/queries/Question3 - Level3.pdf');


---2nd database


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Investigation Challenge:',
'Rumors are swirling in SQL City—multiple incidents, conflicting stories. What really went down on January 15, 2018?\n\n
Your task: Write a query to uncover the truth hidden in the crime scene reports.\n The facts are in the data—if you know where to look.
',4,'easy','/queries/Question1 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Crime Challenge',
'A deadly murder shook SQL City on January 15, 2018. Who was the victim? What really happened at the scene?\n\n
Your task: Write a query to sift through crime scene reports—but only focus on murders.\n The truth is buried in the data. Can you find it?'
,4,'medium','/queries/Question2 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 1: Last House on Northwestern Dr',
'A crucial witness lives at the last house on Northwestern Dr—but what does last really mean?\n\n
Your task: Write a query to track them down. Are house addresses ordered numerically? Alphabetically? Something else?\n The answer is in the data. 
'
,4,'hard','/queries/Question3 - Level4.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('Witness 2: Annabel on Franklin Ave',
'A second witness has been identified—Annabel on Franklin Ave. But who is she really?\n\n
Your task: Write a query to track her down.\n You might want to cast a wide net—sometimes the smallest details hide in plain sight.
',5,'easy','/queries/Question1 - Level5.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Investigation Challenge',
'The witnesses have spoken, and their words hold the truth. Somewhere in their transcripts, the gym is mentioned—but why?\n\n
Your task: Write a query to pull all witness interviews that contain the word "gym."\n The key testimony is waiting to be uncovered.',5,'medium','/queries/Question2 - Level5.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Surveillance Challenge',
'The gym—an ordinary place, or the scene of something more? January 9 holds a clue, but who was there to see it?\n\n
Your task: Write a query to find all gym members who checked in on January 9.\n Their presence might not be a coincidence.',5,'hard','/queries/Question3 - Level5.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Suspect Hunt',
'A key witness recalls a runner at the gym on January 9—but it wasn’t just any runner. They carried a bag exclusive to Gold members.\n\n
Your task: Find gym members with Gold membership who checked in on January 9.\n One of them might be the person we are looking for.',6,'easy','/queries/Question1 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Alibi Investigation:',
'A suspect claims an alibi—but does it hold up?\n A witness mentioned a love for concerts, and the SQL Symphony Concert took place multiple times in December 2017.\n\n
Your task: Find individuals who attended this event at least three times in December 2017. \nWas the suspect enjoying the music, or do they have something to hide?',6,'medium','/queries/Question2 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Getaway Car Chase',
'A male suspect was seen fleeing the scene—but they left behind one crucial detail: a license plate fragment containing "H42W." \n\n
Your task: Write a query to track down drivers with plates matching this pattern.\n Could this be the break in the case?',6,'hard','/queries/Question3 - Level6.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Final Showdown','
The gym suspect and the getaway car—are they the same person? The answer lies in what you have already uncovered.\n\n
Your task: Use your previous query on gym check-ins and match it with car ownership records. \nLog only the name and ID of the suspect.
\nIs this the moment you unmask the killer?.  
'
,7,'easy','/queries/Question1 - Level7.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Final Puzzle ','
There’s always a mastermind—someone pulling the strings from the shadows. Jeremy Bowers confession reveals a new twist, but his identification holds more than just a name.\n
Your task: Retrieve Jeremy’s full interview transcript.\n But think—what does identification really mean in this scenario?\n Could it lead to something bigger?'
,7,'medium','/queries/Question2 - Level7.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Mastermind Hunt:','
Jeremy left behind clues, but what do they really mean? The mastermind might not have acted alone.\n
Your task: Use the information to identify women who have red hair and own a Tesla.\n Could one of them be pulling the strings? '
,7,'hard','/queries/Question3 - Level7.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Ultimate Reveal:','
Did you miss a clue? Or maybe… we wanted you to miss one?  \nEvery detail matters, and the mastermind has been hiding in plain sight all along.\n
Your task: Use all the clues to identify potential suspects. \nAre you about to crack the case wide open? '
,8,'easy','/queries/Question1 - Level8.pdf');

insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Truth Test
','Jeremy made a bold claim—Miranda loves Symphony Concerts. \nBut is that really all she ever attended? Or is there more to the story?\n
Your task: Prove Jeremy’s statement by checking Miranda’s event history.\n If she only ever attended Symphony Concerts, what should your query return'
,8,'medium','/queries/Question2 - Level8.pdf');


insert into queries (title, description, level, difficulty,pdfURL) 
VALUES ('SQL Case Closed','
It’s time to seal the case. Every clue, every log, every connection led to this moment. The mastermind behind it all? \nMiranda Priestly.
\nYour task: Officially declare Miranda Priestly as the mastermind and log your final answer.
\nHow is a murder case closed ? Think about the final step before justice is served.'
,8,'hard','/queries/Question3 - Level8.pdf');


