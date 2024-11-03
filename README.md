# Node.js Express PostgreSQL CRUD API with JWT Auth

A CRUD API built with Node.js, Express, and PostgreSQL for managing records in a sample database. Login Auth

## Features

- **Create, Read, Update, and Delete** records
- RESTful endpoints for interacting with PostgreSQL tables
- Organized codebase using MVC architecture (Models, Views, Controllers)
- Centralized error handling

## Technologies

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
    git clone https://github.com/Piperski13/node-api-postgres.git

    ```

2. Navigate into the project directory:

    ```bash
    cd node-api-postgres
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
    DB_PORT
    ```
    
### Running the API

1. Start the server:

    ```bash
    node server.js
    ```

2. The server will start on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint               | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/records`          | Create a new record   |
| GET    | `/api/records`          | Retrieve all records  |
| GET    | `/api/records/:id`      | Retrieve a single record by ID |
| PUT    | `/api/records/:id`      | Update a record by ID |
| DELETE | `/api/records/:id`      | Delete a record by ID |


# Database: energetika

## Table: EvidencijaElektrane ( evidencijaelektrane )

The `evidencijaelektrane` table stores information about power plants.

### Attributes:

| Column Name              | Data Type               | Constraints                       | Description                                |
|-------------------------|------------------------|----------------------------------|--------------------------------------------|
| id                      | integer                | NOT NULL, PRIMARY KEY            | Unique identifier for each record          |
| nazivelektrane         | character varying(100) | NOT NULL                         | Name of the power plant                    |
| mesto                   | character varying(100) | NOT NULL                         | Location of the power plant                |
| adresa                  | character varying(50)  | NOT NULL                         | Address of the power plant                 |
| datumpustanjaurad      | date                   | NOT NULL                         | Date the power plant was put into operation|
| sifravrstepogona       | integer                | NOT NULL                         | Foreign key referencing VrstaPogona table  |

### Foreign Key Constraints:

- **fk_pripada**: 
  - **Column**: `sifravrstepogona`
  - **References**: `VrstaPogona(sifra)`
  - **Actions**: 
    - ON UPDATE CASCADE
    - ON DELETE RESTRICT

