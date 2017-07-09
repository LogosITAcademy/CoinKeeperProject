create database if not exists coinkeeperdb;
use coinkeeperdb;

create table if not exists users (
	user_id int primary key auto_increment,
	user_name varchar (100),
    user_surname varchar (100),
    user_email varchar(100) unique,
    user_passwords varchar(100),
    user_photo varchar(300)
);
create table if not exists spends (
	spends_id int primary key auto_increment,
	spends_category varchar (100),
    spends_amount int,
    spends_ico varchar(400),
    spends_currency varchar(20),
    spends_date date,
    fk_user int
);
create table if not exists savings (
	savings_id int primary key auto_increment,
	savings_category varchar (100),
    savings_amount int,
    savings_ico varchar(400),
    savings_currency varchar(20),
    savings_inbalance BOOLEAN,
    savings_date date,
    fk_user int
);
create table if not exists savings_history(
	savings_history_id int primary key auto_increment,
	savings_history_category varchar (100),
    savings_history_amount int,
    savings_history_date date,
    fk_user int
);
create table if not exists spends_history(
	spends_history_id int primary key auto_increment,
	spends_history_category varchar (100),
    spends_history_amount int,
    spends_history_date date,
    fk_user int
);

alter table savings_history add constraint savings_history_users foreign key(fk_user)references users (user_id);
alter table spends_history add constraint spends_history_users foreign key(fk_user)references users (user_id);

alter table savings add constraint savings_users foreign key(fk_user)references users (user_id);
alter table spends  add constraint spends_users foreign key (fk_user) references users(user_id );