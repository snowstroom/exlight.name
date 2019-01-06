CREATE TABLE categories 
( 
    id SERIAL PRIMARY KEY,
	category_name VARCHAR(255) UNIQUE NOT NULL,
	category_route VARCHAR(255) UNIQUE NOT NULL,
)