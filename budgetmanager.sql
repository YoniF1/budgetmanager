create table users(
	id serial not null primary key,
	chat_id INT not null,
	name varchar(50) not null,
	phone_number varchar(20) not null,
	number_of_people INT DEFAULT 1,
	country varchar(100) not null,
	email varchar(50) not null,
	monthly_income integer not null
)

create table expenses(
	id serial not null primary key,
	user_id INT,
	category_id INT,
	amount decimal not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (category_id) REFERENCES categories(id)
)

ALTER TABLE expenses 
ALTER COLUMN amount SET DEFAULT 0;

create table categories(
	id SERIAL PRIMARY KEY,
	name varchar(100) not null
)
