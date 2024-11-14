# Node.js Express PostgreSQL CRUD API with JWT Auth / Vanilla Frontend

A CRUD API built with Node.js, Express, and PostgreSQL for managing records in a sample database. JWT is used for authentication user from database

## Features

- **Create, Read, Update, and Delete** records
- Authentication of user via JWT / protected routes - fetching data from the user table
- RESTful endpoints for interacting with PostgreSQL tables
- Real-time updatable HTML - fetching data from the logged user
- Organized codebase using MVC architecture (Models, Views, Controllers)
- Middleware for checking business rule - fetching data from support table to check if limit is reached
- Centralized error handling

## Technologies

- **HTML/CSS**: Markup and styling languages
- **JavaScript**: Programming language, dynamic content
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database
- **pg**: Node.js PostgreSQL client

## Getting Started

### Prerequisites

Ensure you have these installed:

- [Node.js](https://nodejs.org/) (version 14+)
- [PostgreSQL](https://www.postgresql.org/) (version 12+)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Piperski13/node-fullstack-postgres

    ```

2. Navigate into the project directory:

    ```bash
    cd node-fullstack-postgres
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add your PostgreSQL credentials

    ```plaintext
    PORT,
    DB_USER,
    DB_HOST,
    DB_DATABASE,
    DB_PASSWORD,
    DB_PORT,
    JWT_SECRET
    ```
    
### Running the API

1. Start the server:

    ```bash
    node server.js
    ```

2. The server will start on `http://localhost:3000` by default.

# API Endpoints

## Router /records:
------------------------ 
| Method | Endpoint                 | Description                                     |
| ------ | ------------------------ | ------------------------------------------------|
| POST   | `/records`               | Create a new record                             |
| GET    | `/records`               | Retrieve all records                            |
| GET    | `/records/user/:id`      | Retrieve a single record by ID                  |
| PUT    | `/records/user/:id`      | Update a record by ID                           |
| DELETE | `/records/user/:id`      | Delete a record by ID                           |
| GET    | `/records/type`          | Get all power plants from the table vrstapogona |

## Router /login:
------------------------ 
| Method | Endpoint                 | Description                                     |
| ------ | ------------------------ | ------------------------------------------------|
| POST   | `/login`                 | Logs user if password != false                  |
| GET    | `/login/logout`          | Logs out user / clears cookie                   |
| GET    | `/user-data`             | Retrieves user data from cookie                 |

## Router /api:
------------------------ 
| Method | Endpoint                 | Description                                             |
| ------ | ------------------------ | --------------------------------------------------------|
| POST   | `/api/increment`         | Increments total records of certain type of power plant |
| POST   | `/api/decrement`         | Decrements total records of certain type of power plant |


# Database: energetika

## Table: EvidencijaElektrane ( evidencijaelektrane )

The `evidencijaelektrane` table stores information about power plants.

### Attributes:

| Column Name             | Data Type              | Constraints                      | Description                                |
|-------------------------|------------------------|----------------------------------|--------------------------------------------|
| id                      | integer                | NOT NULL, PRIMARY KEY            | Unique identifier for each record          |
| nazivelektrane          | character varying(100) | NOT NULL                         | Name of the power plant                    |
| mesto                   | character varying(100) | NOT NULL                         | Location of the power plant                |
| adresa                  | character varying(50)  | NOT NULL                         | Address of the power plant                 |
| datumpustanjaurad       | date                   | NOT NULL                         | Date the power plant was put into operation|
| sifravrstepogona        | integer                | NOT NULL                         | Foreign key referencing VrstaPogona table  |

### Foreign Key Constraints:

- **fk_pripada**: 
  - **Column**: `sifravrstepogona`
  - **References**: `VrstaPogona(sifra)`
  - **Actions**: 
    - ON UPDATE CASCADE
    - ON DELETE RESTRICT

## Table: VrstaPogona ( vrstapogona )

The `vrstapogona` table stores information about type power plants as well as the total number of active power plants.
This table is 'support-table' for our main table evidencijaelektrana

### Attributes:

| Column Name             | Data Type              | Constraints                      | Description                                |
|-------------------------|------------------------|----------------------------------|--------------------------------------------|
| sifra                   | integer                | NOT NULL, PRIMARY KEY            | Unique identifier for each power-plant     |
| naziv                   | character varying(100) | NOT NULL                         | Name of the power plant                    |
| ukupanbrojelektrana     | character varying(100) | NOT NULL                         | Total number of power-plants               |

- The values are predefined and user has option of choosing from the dropdown element for these three types of power plants while trying to create a Record of power plant :
  
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('0', 'Voda', 0);
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('1', 'Vetar', 0);
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('2', 'Ugalj', 0);

## Table: korisnik ( korisnik )

The `korisnik` table stores information about user of the application

### Attributes:

| Column Name             | Data Type              | Constraints                      | Description                                |
|-------------------------|------------------------|----------------------------------|--------------------------------------------|
| idkorisnika             | integer                | NOT NULL, PRIMARY KEY            | Unique identifier for each power-plant     |
| prezime                 | character varying(50)  | NOT NULL                         | Name of the power plant                    |
| ime                     | character varying(40)  | NOT NULL                         | Total number of power-plants               |
| email                   | character varying(50)  | NOT NULL, PRIMARY KEY            | Unique identifier for each power-plant     |
| korisnickoime           | character varying(30)  | NOT NULL                         | Name of the power plant                    |
| sifra                   | character varying(30)  | NOT NULL                         | Total number of power-plants               |
| urlslike                | character varying(250) | NOT NULL, PRIMARY KEY            | Unique identifier for each power-plant     |
| statusucesca            | character varying(30)  | NOT NULL                         | Name of the power plant                    |                              

- Using SQL Shell, create user:

INSERT INTO "KORISNIK" (PREZIME, IME, EMAIL, KORISNICKOIME, SIFRA, URLSLIKE, STATUSUCESCA) 
VALUES ('Пиперски', 'Алекса', 'mr.alexpiperski@gmail.com', 'aleksap', 'ap', 'admin.jpg', 'admin');
