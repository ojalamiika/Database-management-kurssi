CREATE TABLE User (
    customer_id INT PRIMARY KEY NOT NULL,
    name CHAR(50) NOT NULL,
    username CHAR(50) NOT NULL,
    password CHAR(50) NOT NULL,
    birth_date DATE,
    favourite_movies JSON
);

CREATE TABLE Movie (
    movie_id INT PRIMARY KEY NOT NULL,
    movie_name CHAR(50) NOT NULL,
    year INT NOT NULL,
    genre CHAR(50) NOT NULL,
    keywords CHAR(50) NOT NULL,
    review_id INT
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY NOT NULL,
    customer_id INT NOT NULL,
    review_date DATE NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES User(customer_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id)
);