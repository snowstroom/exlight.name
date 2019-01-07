CREATE TABLE carousel_items 
(
    id SERIAL PRIMARY KEY,
	item_title VARCHAR(255) UNIQUE NOT NULL,
	img_url VARCHAR(1000) NOT NULL,
	article_id INTEGER NOT NULL,
	active BOOL
)