// lib/db.js
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'tarot',
  waitForConnections: true,
  connectionLimit: 10,
  waitForConnections: true, // queue extra requests until a connection is free
  connectionLimit: 20, // only 20 connections open at once
  queueLimit: 0,
})

export default pool
