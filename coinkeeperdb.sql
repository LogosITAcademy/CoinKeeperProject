create database if not exists coinkeeperdb;
use coinkeeperdb;

create table if not exists users (
	user_id int primary key auto_increment,
	user_name varchar (100),
    user_surname varchar (100),
    user_email varchar(100) unique,
    user_passwords varchar(100),
    user_photo varchar(300),
    user_balance int,
    user_balance_currency varchar(3)
);
