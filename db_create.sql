CREATE DATABASE exlight;
USE exlight;
CREATE TABLE artiticles (
	id int,
	title varchar(100),
	date date,
	discription varchar(500),
	content varchar(30000),
	view int,
	route varchar(100),
	category int
);
CREATE TABLE musics (
	id int,
	coverUrl varchar(100),
	fileUrl varchar(100),
	performer varchar(100),
	name varchar(100),
	text varchar(10000),
	listen int,
	date date,
	route varchar(100)
);
CREATE TABLE photos (
	id int,
	date date,
	fileUrl varchar(100),
	description varchar(100),
	views int,
	route varchar(100)
);
CREATE TABLE videos (
	id int,
	date date,
	link varchar(100),
	description varchar(100)
);
CREATE TABLE slides (
	id int,
	title varchar(100),
	content varchar(1000),
	fileUrl varchar(100),
	show boolean
);
CREATE TABLE categories(
	id int,
	name varchar(30),
	route varchar(100)
);