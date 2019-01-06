CREATE TABLE articles
(
    id SERIAL PRIMARY KEY,
    article_title VARCHAR(255) UNIQUE NOT NULL,
    article_route VARCHAR(255) UNIQUE NOT NULL,
    publication_date DATE NOT NULL,
    article_description VARCHAR(1000) NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories (id),
    content TEXT NOT NULL,
    views INTEGER DEFAULT 0,
)