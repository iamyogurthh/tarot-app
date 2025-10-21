// lib/db.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "",
  database: "tarot",
  waitForConnections: true,
  
});

export default pool;
