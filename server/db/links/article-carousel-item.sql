
ALTER TABLE articles
    ADD FOREIGN KEY (carousel_item_id) REFERENCES carousel_items(id)