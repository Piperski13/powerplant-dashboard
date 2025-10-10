# *Currently outdated readme - Refactor done recently - creating new readme in progress...
# Node.js Express PostgreSQL CRUD App with EJS Views & JWT Authentication

A refactored full-stack web application originally built in 2024, now rebuilt ( 2025 ) to use **EJS templating** for server-side rendering, simplified data handling, and removal of unnecessary frontend fetch calls.
The project features **JWT-based authentication**, **MVC architecture**, and an **automated database setup script** for easy initialization.

## 🚀 Features 

- **Full CRUD Functionality** - create, read, update, and delete records directly through EJS-rendered views

- **User Authentication via JWT** - protected routes using secure JWT validation middleware

- **Server-Side Rendering (EJS)** - real-time data updates and dynamic pages based on logged-in user data

- **PostgreSQL Integration** - all data operations handled through RESTful-style controllers and models

- **Input Filtering** - filter and search records efficiently in the records view

- **Centralized Error Handling** - consistent error responses across the app

- **MVC Architecture** - clean structure separating logic, views, and data access layers

- **Responsive Design** - layout optimized for both desktop and mobile

## 🧩 Technologies

- **EJS** - server-side templating for dynamic HTML rendering
- **CSS** - styling language
- **JavaScript (ES6)** - core language for backend logic and interactivity
- **Node.js** - JavaScript runtime environment
- **Express.js** - minimalist web framework for Node.js
- **PostgreSQL** - relational database for data persistence
- **pg** - official PostgreSQL client for Node.js

## ⚙️ Getting Started

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
    PORT=
    DB_USER=
    DB_HOST=
    DB_DATABASE=
    DB_PASSWORD=
    DB_PORT=
    JWT_SECRET=
    DB_CONNECTION_STRING=
    ```
    
### Database Setup

1. To automatically create and populate your PostgreSQL database, run:

    ```bash
    node db/populatedb.js
    ```
   This script will generate the required tables and seed example data.
   <br>Note: You will need to create DB itself manualy inside of a psql:
   ```bash
   CREATE DATABASE DB_DATABASE;
   ```
    
### Running the app

1. Start the server:

    ```bash
    npm start
    ```

2. The server will start on `http://localhost:3000` by default.

# API Endpoints

## Login router ' / ' :
------------------------ 
| Method | Endpoint                 | Description                                             |
| ------ | ------------------------ | --------------------------------------------------------|
| GET    | `/`                      | Shows login page                                        |
| POST   | `/login`                 | Logs in user, creates cookie, redirects to welcome page |
| GET    | `/logout`                | Clears cookie, redirects to login page                  |

## View router ' /viewPage ' :
------------------------ 
| Method | Endpoint                 | Description                                                |
| ------ | ------------------------ | -----------------------------------------------------------|
| GET   | `/welcome`                | Renders a welcome page, sends user object                  |
| GET   | `/recordsViewPage`        | Renders a recordsView page, shows all data, data filtering |
| GET   | `/addRecord`              | Renders a add record page                                  |
| GET   | `/addRecord/:id`          | Renders a uppdate record page with populated data          |

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

# Database: energetika

## Table: EvidencijaElektrane ( evidencijaelektrana )

The `evidencijaelektrana` table stores information about power plants.

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
  
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('0', 'Voda', 0);<br>
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('1', 'Vetar', 0);<br>
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('2', 'Ugalj', 0);<br>

## Table: korisnik ( korisnik )

The `korisnik` table stores information about user of the application

### Attributes:

| Column Name             | Data Type              | Constraints                      | Description                                |
|-------------------------|------------------------|----------------------------------|--------------------------------------------|
| idkorisnika             | integer                | NOT NULL, PRIMARY KEY            | Unique identifier of the user              |
| prezime                 | character varying(50)  | NOT NULL                         | User's last name                           |
| ime                     | character varying(40)  | NOT NULL                         | User's first name                          |
| email                   | character varying(50)  | NOT NULL, PRIMARY KEY            | User's email address                       |
| korisnickoime           | character varying(30)  | NOT NULL                         | Username of the user                       |
| sifra                   | character varying(30)  | NOT NULL                         | User's identification number               |
| urlslike                | character varying(250) | NOT NULL, PRIMARY KEY            | URL of the user's picture                  |
| statusucesca            | character varying(30)  | NOT NULL                         | User's status                              |                              

- Using SQL Shell, create user:

INSERT INTO korisnik (PREZIME, IME, EMAIL, KORISNICKOIME, SIFRA, URLSLIKE, STATUSUCESCA)<br> 
VALUES ('Пиперски', 'Алекса', 'mr.alexpiperski@gmail.com', 'aleksap', 'ap', 'admin.jpg', 'admin');<br>

# Middleware

In this project, two middleware functions are implemented:

- **cookieJwtToken**: This middleware checks if the user's token is valid and not expired. It ensures that only authenticated users can access certain routes, providing an additional layer of security by automatically logging out users with invalid or expired tokens.

- **bussinessRule**: This middleware is used when attempting to add a new record. It verifies that the current number of records does not exceed the maximum allowed limit (10). This prevents users from creating more records than the allowed threshold, maintaining data integrity.

