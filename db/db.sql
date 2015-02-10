create database if not exists impetus;

use impetus;

create table if not exists imp_users(
	name varchar(256) not null,
	username varchar(256) primary key,
	password varchar(256) not null,
	email varchar(256) not null,
	college varchar(256) not null,
	privilage varchar(10) default "user"
);



create table if not exists imp_catagories(
	name varchar(50) primary key,
	pic_path varchar(256)
);

create table if not exists imp_events(
	title varchar(50) primary key,
	catagory varchar(50) references imp_catagories.name on update cascade on delete cascade,
	pic_path varchar(256),
	content mediumtext not null,
	postdby varchar(256) references imp_users.username on update cascade on delete cascade,
	postat timestamp default current_timestamp on update current_timestamp,
	edited boolean default false
);

create table if not exists imp_posts(
	titile varchar(256) primary key,
	content mediumtext not null,
	postby varchar(256) references imp_users.username on update cascade on delete cascade,
	postat timestamp default current_timestamp on update current_timestamp,
	edited boolean default false
);

create table if not exists imp_followers(
	username varchar(256) references imp_users.username on delete cascade on update cascade,
	event varchar(50) references imp_events.titile on delete cascade on update cascade
);

create table if not exists imp_queries(
	username varchar(256) references imp_users.username on delete cascade on update cascade,
	event varchar(50) references imp_events.title on delete cascade on update cascade,
	query mediumtext not null
);

create table if not exists imp_logs(
	session_user varchar(256) references imp_users.username on delete cascade on update cascade,
	error_desc mediumtext,
	script varchar(256) not null,
	resolved boolean default false
);

insert into imp_users values('admin','admin','setthisadmin','admin@localhost.com','UVCE');
insert into imp_users values('guest','guest','','','UVCE');