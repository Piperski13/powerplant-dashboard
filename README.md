# Node.js Express PostgreSQL CRUD App with EJS Views & Passport Authentication
A refactored full-stack web application originally built in 2024, now rebuilt ( 2025 ) to use **EJS templating** for server-side rendering, simplified data handling, switched from JWT to Passport for session-based authentication, and removal of unnecessary frontend fetch calls. <br>
**Passport.js session-based authentication with bcrypt password hashing**, **MVC architecture**, and an **automated database setup script** for easy initialization.

## Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database: energetika](#database-energetika)
- [Middleware](#middleware)
- [Screenshots](#screenshots)
- [Future Improvements](#-future-improvements)

---

## 🚀 Features

[⬆ Back to Table of Contents](#table-of-contents)

- **Full CRUD Functionality** - create, read, update, and delete records directly through EJS-rendered views

- **User Authentication via Passport.js** - session-based authentication with bcrypt password hashing

- **Per-User Data Views** - each user only sees records they created; all records are linked to the user's profile

- **Server-Side Rendering (EJS)** - real-time data updates and dynamic pages based on logged-in user data

- **PostgreSQL Integration** - all data operations handled through RESTful-style controllers and models

- **Input Filtering** - filter and search records efficiently in the records view

- **Centralized Error Handling** - consistent error responses across the app

- **MVC Architecture** - clean structure separating logic, views, and data access layers

- **Responsive Design** - layout optimized for both desktop and mobile

## 🧩 Technologies

[⬆ Back to Table of Contents](#table-of-contents)

- **EJS** - server-side templating for dynamic HTML rendering
- **CSS** - styling language
- **JavaScript (ES6)** - core language for backend logic and interactivity
- **Node.js** - JavaScript runtime environment
- **Express.js** - minimalist web framework for Node.js
- **PostgreSQL** - relational database for data persistence
- **pg** - official PostgreSQL client for Node.js

## Getting Started

[⬆ Back to Table of Contents](#table-of-contents)

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

[⬆ Back to Table of Contents](#table-of-contents)

## Login router ('/')

---

| Method | Endpoint  | Description                                                                                        |
| ------ | --------- | -------------------------------------------------------------------------------------------------- |
| GET    | `/`       | Renders the login page                                                                             |
| POST   | `/login`  | Authenticates the user using Passport.js, establishes a session, and redirects to the welcome page |
| GET    | `/logout` | Ends the user session and redirects to the login page                                              |

## View router ('/viewPage')

---

| Method | Endpoint           | Description                                                                                  |
| ------ | ------------------ | -------------------------------------------------------------------------------------------- |
| GET    | `/welcome`         | Renders the welcome page and passes the logged-in user object                                |
| GET    | `/recordsViewPage` | Renders the records view page, displaying only the logged-in user's data with filter options |
| GET    | `/addRecord`       | Renders the page for adding a new record                                                     |
| GET    | `/addRecord/:id`   | Renders the update record page with pre-filled data for the selected record                  |

## Record router ('/records')

---

| Method | Endpoint      | Description                                                      |
| ------ | ------------- | ---------------------------------------------------------------- |
| POST   | `/create/`    | Creates a new record linked to the logged-in user                |
| POST   | `/update/:id` | Updates an existing record that it belongs to the logged-in user |
| GET    | `/delete/:id` | Deletes a record that it belongs to the logged-in user           |

# Database: energetika

[⬆ Back to Table of Contents](#table-of-contents)

## Table: EvidencijaElektrane ( evidencijaelektrana )

The `evidencijaelektrana` table stores information about power plants.

### Attributes:

| Column Name       | Data Type              | Constraints           | Description                                                   |
| ----------------- | ---------------------- | --------------------- | ------------------------------------------------------------- |
| id                | integer                | NOT NULL, PRIMARY KEY | Unique identifier for each record                             |
| nazivelektrane    | character varying(100) | NOT NULL              | Name of the power plant                                       |
| mesto             | character varying(100) | NOT NULL              | Location of the power plant                                   |
| adresa            | character varying(50)  | NOT NULL              | Address of the power plant                                    |
| datumpustanjaurad | date                   | NOT NULL              | Date the power plant was put into operation                   |
| sifravrstepogona  | integer                | NOT NULL              | Foreign key referencing VrstaPogona table                     |
| user_id           | integer                | NOT NULL              | Foreign key referencing Korisnici table (owner of the record) |

### Foreign Key Constraints:

- **fk_pripada**:
  - **Column**: `sifravrstepogona`
  - **References**: `VrstaPogona(sifra)`
  - **Actions**:
    - ON UPDATE CASCADE
    - ON DELETE RESTRICT

- **fk_user**:
  - **Column**: `user_id`
  - **References**: `Korisnici(id)`
  - **Actions**:
    - ON UPDATE CASCADE
    - ON DELETE CASCADE


## Table: VrstaPogona ( vrstapogona )

The `vrstapogona` table stores information about type power plants as well as the total number of active power plants.
This table is 'support-table' for our main table evidencijaelektrana

### Attributes:

| Column Name         | Data Type              | Constraints           | Description                            |
| ------------------- | ---------------------- | --------------------- | -------------------------------------- |
| sifra               | integer                | NOT NULL, PRIMARY KEY | Unique identifier for each power-plant |
| naziv               | character varying(100) | NOT NULL              | Name of the power plant                |
| ukupanbrojelektrana | character varying(100) | NOT NULL              | Total number of power-plants           |

- The values are predefined and user has option of choosing from the dropdown element for these three types of power plants while trying to create a Record of power plant :

INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('0', 'Voda', 0);<br>
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('1', 'Vetar', 0);<br>
INSERT INTO "VrstaPogona" (Sifra, Naziv, UkupanBrojElektrana) VALUES ('2', 'Ugalj', 0);<br>

## Table: korisnici ( korisnici )

The `korisnici` table stores information about users of the application

### Attributes:

| Column Name | Data Type              | Constraints          | Description                   |
| ----------- | ---------------------- | -------------------- | ----------------------------- |
| id          | integer                | PRIMARY KEY          | Unique identifier of the user |
| email       | character varying(100) | NOT NULL, UNIQUE     | User's email address          |
| password    | character varying(100) | NOT NULL             | Hashed password using bcrypt  |
| surname     | character varying(50)  | NOT NULL             | User's first name             |
| lastname    | character varying(50)  | NOT NULL             | User's last name              |

- The `password` field is stored as a **hashed value using bcrypt**, so **plaintext passwords are never stored**.  
- Because of this, you **cannot create users directly using SQL shell** with plain-text passwords.  
- Users must be created via the **Sign In / Register form** (`/sign-in`), which automatically hashes the password before storing it in the database.  


# Middleware

[⬆ Back to Table of Contents](#table-of-contents)

This project currently includes one custom middleware function:

- **isAuthenticated**:  
  This middleware checks if the user is logged in using Passport.js.  
  It ensures that only authenticated users can access protected routes.  
  If the user is not authenticated, they are redirected to the login page.

This middleware is applied globally to all `/viewPage` and `/records` routes to protect access from unauthorized users.

---

## Screenshots

[⬆ Back to Table of Contents](#table-of-contents)

|  Login Page |
|------------|
| ![Login Page](public/images/login.jpg)

| Sign-in Page |
| ----------   |
| ![Login Page](public/images/sign-in.jpg)

| Hashed Passwords |
| ---------- |
| ![Login Page](public/images/hashed-passwrods.jpg)

| Welcome Page |
| ------------ |
| ![Welcome Page](public/images/welcome.jpg)

| View Records Page |
| ----------------- |
| ![View Records Page](public/images/view-records.jpg)

| Add Record Page |
| --------------- |
| ![Add Record Page](public/images/add-record.jpg)

| Update Record Page |
| ------------------ |
| ![Update Record Page](public/images/update-recrod.jpg)

| 404 Page - Displayed when a user accesses a non-existent route |
| ------------------ |
| ![Update Record Page](public/images/404.jpg)

| Rendered when an authenticated user tries to access the login/sign in page |
| ------------------ |
| ![Update Record Page](public/images/login-user-true.jpg)

| Logout Button |
| ------------- |
| ![Logout Button](public/images/logout.jpg)

---

## 🚀 Future Improvements - ( work in progress )

[⬆ Back to Table of Contents](#table-of-contents)

- **Form Validation** — Implement both client-side and server-side form validation for better data integrity.
- **Deployment** — Host the application online after implementing all planned features.
