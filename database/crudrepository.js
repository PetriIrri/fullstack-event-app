require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

//create database functions here
let connectionFunctions = {
  placeholder: "placeholder",
};

module.exports = connectionFunctions;