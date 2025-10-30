// backend/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",          // your XAMPP MySQL username
  password: "",          // your MySQL password
  database: "thirsti"    // database you created
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

module.exports = db;
