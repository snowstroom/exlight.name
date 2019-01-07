CREATE TABLE video
(
    id SERIAL PRIMARY KEY,
	video_url VARCHAR(1000) NOT NULL,
	video_description VARCHAR(1000),
)