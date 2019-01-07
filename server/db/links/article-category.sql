ALTER TABLE articles
ADD FOREIGN KEY (category_id) REFERENCES categories(id)