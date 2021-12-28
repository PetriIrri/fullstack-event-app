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
      LEFT JOIN Event_tags ON Events.id = Event_tags.event_id
      LEFT JOIN Tags ON Event_tags.tag_id = Tags.id
      GROUP BY Events.id;`;
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
      // GROUP BY NULL is so that GROUP_CONCAT does
      // not return null row when not finding a record.
      const sql = `SELECT Events.*,
      GROUP_CONCAT(Tags.tag_name SEPARATOR ', ') AS tags
      FROM Events
      INNER JOIN Event_tags ON Events.id = Event_tags.event_id
      INNER JOIN Tags ON Event_tags.tag_id = Tags.id
      WHERE Events.id = ?
      GROUP BY NULL;`;
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
  deleteById: (id) => {
    function deleteById(resolve, reject) {
      const sql = "DELETE FROM Events WHERE id=?";
      pool.query(sql, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
    return new Promise(deleteById);
  },
};

module.exports = connectionFunctions;
