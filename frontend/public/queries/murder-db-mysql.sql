
CREATE TABLE get_fit_now_member (id VARCHAR(100) PRIMARY KEY,person_id integer,name VARCHAR(100),membership_start_date integer,membership_status VARCHAR(100),FOREIGN KEY (person_id) REFERENCES person(id));CREATE TABLE get_fit_now_check_in (membership_id VARCHAR(100),check_in_date integer,check_in_time integer,check_out_time integer,FOREIGN KEY (membership_id) REFERENCES get_fit_now_member(id));
