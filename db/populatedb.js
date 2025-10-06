#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
-- Create tables

CREATE TABLE IF NOT EXISTS VrstaPogona (
  sifra INTEGER PRIMARY KEY,
  naziv VARCHAR(100) NOT NULL,
  ukupanbrojelektrana INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS EvidencijaElektrana (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nazivelektrane VARCHAR(100) NOT NULL,
  mesto VARCHAR(100) NOT NULL,
  adresa VARCHAR(50) NOT NULL,
  datumpustanjaurad DATE NOT NULL,
  sifravrstepogona INTEGER NOT NULL,
  CONSTRAINT fk_pripada FOREIGN KEY (sifravrstepogona)
    REFERENCES VrstaPogona (sifra)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Korisnik (
  idkorisnika INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  prezime VARCHAR(50) NOT NULL,
  ime VARCHAR(40) NOT NULL,
  email VARCHAR(50) NOT NULL,
  korisnickoime VARCHAR(30) NOT NULL,
  sifra VARCHAR(30) NOT NULL,
  urlslike VARCHAR(250) NOT NULL,
  statusucesca VARCHAR(30) NOT NULL
);

-- Insert default data

INSERT INTO VrstaPogona (sifra, naziv, ukupanbrojelektrana)
VALUES
  (0, 'Voda', 0),
  (1, 'Vetar', 0),
  (2, 'Ugalj', 0)
ON CONFLICT (sifra) DO NOTHING;

INSERT INTO Korisnik (prezime, ime, email, korisnickoime, sifra, urlslike, statusucesca)
VALUES
  ('Пиперски', 'Алекса', 'mr.alexpiperski@gmail.com', 'aleksap', 'ap', 'admin.jpg', 'admin')
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database: ", err);
  } finally {
    await client.end();
  }
}

main();
