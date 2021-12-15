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
      const sql = `SELECT Events.*,
      GROUP_CONCAT(Tags.tag_name SEPARATOR ', ') AS tags
      FROM Events
      INNER JOIN Event_tags ON Events.id = Event_tags.event_id
      INNER JOIN Tags ON Event_tags.tag_id = Tags.id;`;
      pool.query(sql, (err, locations) => {
        if (err) {
          reject(err);
        } else {
          resolve(locations);
        }
      });
    }
    return new Promise(findAll);
  },
  findById: (id) => {
    function findById(resolve, reject) {
      // This will return a row of null if no record is found.
      // It happens because of GROUP_CONCAT
      const sql = `SELECT Events.*,
      GROUP_CONCAT(Tags.tag_name SEPARATOR ', ') AS tags
      FROM Events
      INNER JOIN Event_tags ON Events.id = Event_tags.event_id
      INNER JOIN Tags ON Event_tags.tag_id = Tags.id
      WHERE Events.id = ?;`;
      pool.query(sql, id, (err, location) => {
        if (err) {
          reject(err);
        } else {
          resolve(location);
        }
      });
    }
    return new Promise(findById);
  },
};

module.exports = connectionFunctions;
