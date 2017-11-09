DROP DATABASE IF EXISTS puppies;
        CREATE DATABASE puppies;

\c puppies;

           CREATE TABLE breeds (
                     ID SERIAL PRIMARY KEY,
                   name VARCHAR
);



           CREATE TABLE pups (
                     ID SERIAL PRIMARY KEY,
                   name VARCHAR,
               breed_ID INTEGER REFERENCES breeds,
                    age INTEGER,
                    sex VARCHAR
);

            INSERT INTO breeds(name)
                 VALUES ('Retriever');

            INSERT INTO pups (name, breed_ID, age, sex)
                 VALUES ('Tyler',1, 3, 'M');
