CREATE TABLE IF NOT EXISTS movielist (
    id SERIAL PRIMARY KEY,
    title TEXT,
    year TEXT,
    review TEXT,
    image TEXT,
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS watchlist (
	id SERIAL PRIMARY KEY,
	userid integer,
	movieid integer
);