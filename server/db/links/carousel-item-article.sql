ALTER TABLE carousel_items
    ADD FOREIGN KEY (article_id) REFERENCES articles(id)