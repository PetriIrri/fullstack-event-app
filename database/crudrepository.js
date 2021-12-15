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
  findAll: () => {
    function findAll(resolve, reject) {
      pool.query("SELECT * FROM Events", (err, locations) => {
        if (err) {
          reject(err);
        } else {
          resolve(locations);
        }
      });
    }
    return new Promise(findAll);
  },
};

module.exports = connectionFunctions;
