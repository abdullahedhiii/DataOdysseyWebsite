const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    process.exit(1);
  }
  else console.log("Connected to MySQL database");
});

module.exports = db;
