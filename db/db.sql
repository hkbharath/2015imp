create database if not exists impetus;

use impetus;

create table if not exists imp_users(
	name varchar(256) not null,
	username varchar(256) not null primary key,
	password varchar(250)not null,
	email varchar(256) not null,
	college varchar(256) not null
);

create table if not exists imp_catagories(
	name varchar(50) not null primary key,
	pic_path varchar(256)
);

create table if not exists imp_posts(
	title varchar(50) not null primary key,
	catagory varchar(50) references imp_catagories.name,
	pic_path varchar(256),
	content mediumtext not null,
	postdby varchar(256) references imp_users.username,
	postat timestamp default current_timestamp on update current_timestamp,
	edited boolean default false
);

insert into imp_users values('admin','admin','setthisadmin','admin@localhost.com','UVCE');