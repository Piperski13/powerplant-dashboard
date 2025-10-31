const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SQL = `
-- Create tables

CREATE TABLE IF NOT EXISTS Korisnici (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(100) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL ,
    is_admin BOOLEAN DEFAULT FALSE
);

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
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_pripada FOREIGN KEY (sifravrstepogona)
    REFERENCES VrstaPogona (sifra)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES Korisnici (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Insert default data

INSERT INTO VrstaPogona (sifra, naziv, ukupanbrojelektrana)
VALUES
  (0, 'Voda', 0),
  (1, 'Vetar', 0),
  (2, 'Ugalj', 0)
ON CONFLICT (sifra) DO NOTHING;
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  try {
    await client.connect();
    await client.query(SQL);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminExists = await client.query(
      "SELECT * FROM Korisnici WHERE email = $1",
      [adminEmail]
    );

    if (adminExists.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await client.query(
        `INSERT INTO Korisnici (email, password, surname, lastname, is_admin)
         VALUES ($1, $2, $3, $4, TRUE)`,
        [
          adminEmail,
          hashedPassword,
          process.env.ADMIN_SURNAME,
          process.env.ADMIN_LASTNAME,
        ]
      );

      console.log("✅ Admin user created successfully!");
    } else {
      console.log("ℹ️ Admin user already exists, skipping creation.");
    }

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database: ", err);
  } finally {
    await client.end();
  }
}

main();
