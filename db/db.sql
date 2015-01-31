create database if not exists impetus;

use impetus;

create table if not exists imp_users(
	name varchar(50),
	username varchar(20),
	password varchar(200),
	email varchar(50),
	college varchar(50)
)

insert into imp_users values('admin','admin','setthisadmin','admin@localhost.com','UVCE');