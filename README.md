# Node.js with MySQL — User Management CRUD

A beginner-friendly **Node.js + Express + MySQL** project that demonstrates how to connect a Node.js application with a MySQL database and perform complete **CRUD operations** on user data.

This project was built as a practical learning project to understand how a backend application communicates with a relational database and how user data can be created, displayed, updated, and deleted through an Express web application.

---

## 🚀 Features

- 🔗 Connect Node.js application with MySQL
- 👥 Display all users stored in the database
- ➕ Add new users
- ✏️ Update existing user information
- 🗑️ Delete users
- 🔐 Password verification before updating a user
- 🔐 Email and password verification before deleting a user
- 📊 Display total number of users
- 🎲 Generate sample/fake user data using Faker
- 🖥️ Server-side rendering using EJS
- 🔄 Support for PATCH and DELETE requests using Method Override
- 📁 Separate EJS views for different user operations

---

## 🛠️ Tech Stack

### Backend
- **Node.js**
- **Express.js**

### Database
- **MySQL**
- **mysql2**

### Templating
- **EJS**

### Other Tools & Packages
- **@faker-js/faker** — Generate sample user data
- **method-override** — Enable HTTP methods such as PATCH and DELETE from HTML forms
- **path** — Handle file and directory paths

---

## 📂 Project Structure

```text
NODE-WITH-SQL-MYSQL/
│
├── views/
│   ├── home.ejs
│   ├── showusers.ejs
│   ├── edit.ejs
│   ├── add.ejs
│   └── delete.ejs
│
├── index.js
├── schema.sql
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### File Description

| File / Folder | Description |
|---|---|
| `index.js` | Main Express server and application logic |
| `schema.sql` | SQL schema for creating the `user` table |
| `views/` | EJS templates used to render the web pages |
| `home.ejs` | Displays the total number of users |
| `showusers.ejs` | Displays all users |
| `add.ejs` | Form for adding a new user |
| `edit.ejs` | Form for editing an existing user |
| `delete.ejs` | Form for deleting a user |
| `package.json` | Project dependencies and configuration |
| `.gitignore` | Files excluded from Git tracking |

---

# 🗄️ Database Structure

The project uses a MySQL database containing a `user` table.

### User Table

```text
+----------+-------------+----------------+
| Column   | Data Type   | Constraint     |
+----------+-------------+----------------+
| id       | VARCHAR(50) | PRIMARY KEY    |
| name     | VARCHAR(50) | UNIQUE         |
| email    | VARCHAR(50) | UNIQUE, NOT NULL |
| password | VARCHAR(50) | NOT NULL       |
+----------+-------------+----------------+
```

The database schema is provided in:

```text
schema.sql
```

The schema creates the table using:

```sql
CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
```

---

# 🔄 CRUD Operations

The main purpose of this project is to understand **CRUD operations**.

CRUD stands for:

| Operation | HTTP Method | Purpose |
|---|---|---|
| Create | POST | Add a new user |
| Read | GET | Display user data |
| Update | PATCH | Modify existing user data |
| Delete | DELETE | Remove a user |

---

## 1. 🏠 Home Page

### Route

```http
GET /
```

The home route queries MySQL to count the total number of users and displays the count through an EJS page.

Conceptually:

```sql
SELECT COUNT(*) FROM user;
```

---

## 2. 👥 Display All Users

### Route

```http
GET /user
```

This route retrieves all users from the MySQL database.

```sql
SELECT * FROM user;
```

The retrieved records are passed to the `showusers.ejs` template.

---

## 3. ✏️ Edit User

### Route

```http
GET /user/:id/edit
```

The user's ID is received through the URL.

Example:

```text
/user/123/edit
```

The application retrieves the corresponding user from MySQL and displays the edit form.

---

## 4. 🔄 Update User

### Route

```http
PATCH /user/:id
```

The user provides their password before changing their name.

The application:

1. Receives the user ID.
2. Retrieves the user from MySQL.
3. Checks the entered password.
4. If the password is correct, updates the user's name.
5. Redirects back to the users page.

Example SQL operation:

```sql
UPDATE user
SET name = 'newName'
WHERE id = 'userID';
```

Because HTML forms do not directly support PATCH requests, the project uses **method-override**.

---

## 5. ➕ Add User

### Display Add Form

```http
GET /user/add
```

This displays the user registration form.

### Create User

```http
POST /user/add
```

The form sends:

```text
id
name
email
password
```

The application then inserts the new user into MySQL.

Example:

```sql
INSERT INTO user
VALUES ('id', 'name', 'email', 'password');
```

After successful insertion, the application redirects to:

```text
/user
```

---

## 6. 🗑️ Delete User

### Display Delete Page

```http
GET /user/:id/delete
```

This displays a confirmation form for the selected user.

### Delete User

```http
DELETE /user/:id/delete
```

Before deleting a user, the application verifies:

- Email
- Password

If the credentials are correct, the user is deleted from the database.

Example:

```sql
DELETE FROM user
WHERE id = 'userID';
```

After deletion, the application redirects to:

```text
/user
```

---

# 🎲 Fake User Data

The project also includes **Faker.js** for generating sample user information.

The application uses:

```javascript
const { faker } = require('@faker-js/faker');
```

A helper function generates:

```text
ID
Name
Email
Password
```

This can be used to populate the database with sample users while learning database operations.

---

# 🔌 MySQL Connection

The Node.js application connects to a local MySQL server using the `mysql2` package.

The connection is configured in `index.js`:

```javascript
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "YOUR_PASSWORD"
});
```

> **Important:** Replace the database password with your own local MySQL password. Never publish your real database password on GitHub.

---

# 📦 Installation

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- MySQL
- npm
- Git

You can verify Node.js and npm:

```bash
node --version
npm --version
```

Check MySQL:

```bash
mysql --version
```

---

# ⚙️ Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Syed-mohammad-wasique-Junaid/NODE-WITH-SQL-MYSQL.git
```

Move into the project:

```bash
cd NODE-WITH-SQL-MYSQL
```

---

## 2. Install Dependencies

Run:

```bash
npm install
```

This installs the packages required by the project.

---

## 3. Start MySQL

Make sure your MySQL server is running.

Then open MySQL:

```bash
mysql -u root -p
```

---

## 4. Create the Database

Create the database used by the project:

```sql
CREATE DATABASE delta_app;
```

Select it:

```sql
USE delta_app;
```

Then create the user table using the contents of:

```text
schema.sql
```

You can also run:

```sql
SOURCE schema.sql;
```

---

## 5. Configure MySQL Credentials

Open:

```text
index.js
```

Update:

```javascript
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "delta_app",
    password: "YOUR_PASSWORD"
});
```

Use the password configured for your local MySQL installation.

---

# ▶️ Running the Project

Start the server:

```bash
node index.js
```

You should see:

```text
server is listening to port : 8080
```

Then open:

```text
http://localhost:8080
```

---

# 🌐 Routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/` | Home page / user count |
| `GET` | `/user` | Display all users |
| `GET` | `/user/add` | Show add-user form |
| `POST` | `/user/add` | Create a new user |
| `GET` | `/user/:id/edit` | Show edit form |
| `PATCH` | `/user/:id` | Update user |
| `GET` | `/user/:id/delete` | Show delete confirmation |
| `DELETE` | `/user/:id/delete` | Delete user |

---

# 🔄 Application Flow

```text
        ┌─────────────────┐
        │   Web Browser   │
        └────────┬────────┘
                 │
                 │ HTTP Request
                 ▼
        ┌─────────────────┐
        │ Express Server  │
        │    Node.js      │
        └────────┬────────┘
                 │
                 │ SQL Query
                 ▼
        ┌─────────────────┐
        │  MySQL Database │
        │   delta_app     │
        └────────┬────────┘
                 │
                 │ Query Result
                 ▼
        ┌─────────────────┐
        │    EJS Views    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   Web Browser   │
        └─────────────────┘
```

---

# 🧠 Concepts Learned

This project helps demonstrate several important backend concepts:

### Node.js

- Running JavaScript on the server
- Using npm packages
- Managing application dependencies

### Express.js

- Creating a web server
- Routing
- Handling HTTP requests
- Handling form data
- Using middleware

### MySQL

- Creating databases
- Creating tables
- Inserting records
- Selecting records
- Updating records
- Deleting records
- Using SQL queries from Node.js

### EJS

- Server-side rendering
- Passing data from Express to HTML
- Creating dynamic web pages

### HTTP Methods

Understanding:

```text
GET
POST
PATCH
DELETE
```

### Method Override

Using:

```javascript
methodOverride("_method")
```

to support PATCH and DELETE operations from HTML forms.

### CRUD

Understanding the complete lifecycle of database records:

```text
CREATE → READ → UPDATE → DELETE
```

---

# 📚 Project Purpose

The main purpose of this project is **learning backend development and database integration**.

Instead of working with a database separately, this project demonstrates how a Node.js/Express application can communicate directly with MySQL and perform database operations based on user requests.

It provides a simple foundation for understanding how larger applications handle:

```text
Frontend
   ↓
Express / Node.js
   ↓
SQL Queries
   ↓
MySQL
   ↓
Query Results
   ↓
EJS
   ↓
Frontend
```

---

# 🔐 Security Note

This project is intended primarily for **learning purposes**.

For a production application, the following improvements should be implemented:

- Store database credentials in environment variables
- Use parameterized SQL queries
- Hash passwords instead of storing plain-text passwords
- Add proper input validation
- Add authentication and authorization
- Improve error handling
- Add CSRF protection where appropriate
- Use HTTPS in production

For example, database credentials should ideally be stored in:

```text
.env
```

instead of directly inside `index.js`.

---

# 🚀 Possible Future Improvements

The project can be extended by adding:

- 🔐 User authentication and login
- 🔑 Password hashing with bcrypt
- 👤 User sessions
- 🔎 Search users
- 📄 Pagination
- ✅ Better form validation
- 🚨 Improved error handling
- 🔒 Environment variables
- 🛡️ Parameterized SQL queries
- 🎨 Improved UI/UX
- 📱 Responsive design
- 🔗 REST API endpoints
- 📊 Admin dashboard

---

# 🎯 Learning Outcome

After completing this project, you should have a basic understanding of how to build a web application that connects:

**Node.js → Express → MySQL → EJS**

and how to implement database-driven **CRUD operations** using JavaScript and SQL.

---

## 👨‍💻 Author

**Syed Mohammad Wasique Junaid**

GitHub:  
[Syed-mohammad-wasique-Junaid](https://github.com/Syed-mohammad-wasique-Junaid)

---

## ⭐ If You Found This Useful

If this repository helped you understand **Node.js, Express, MySQL, EJS, or CRUD operations**, consider giving the repository a ⭐.

---

## 📄 License

This project is created for educational and learning purposes.