/**
 * crudrepository module that has everything related to database connection
 * and functions.
 * @module database/crudrepository
 * @author Petri Irri
 * @requires dotenv
 * @requires mysql
 */
require("dotenv").config();

/**
 * mysql module.
 * @type {object}
 * @constant
 */
const mysql = require("mysql");

/**
 * mysql pool object
 * @type {object}
 * @constant
 */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

/**
 * Object that has all database connection functions of the API.
 * @namespace connectionFunctions
 */
let connectionFunctions = {
  /**
   * A function in connectionFunctions that returns all events
   * from database with their associated tags.
   * @function findAll
   * @memberof module:database/crudrepository~connectionFunctions
   * @returns {Promise} On success the promise will be resolved with object
   * containing data of all events in database. </br>
   * On error the promise will be rejected with an error.
   */
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
  /**
   * A function in connectionFunctions that returns a specific
   * events data from database by events id.
   * @function findById
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {number} id - The id of the event.
   * @returns {Promise} On success the promise will be resolved with object
   * containing data of the requested event. </br>
   * On error the promise will be rejected with an error.
   */
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
  /**
   * A function in connectionFunctions that takes an event object
   * and inserts that object into the database.
   * @function addEvent
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {Object} event - The event that is to be added to the database.
   * @param {string} event.event_name - The name of the event.
   * @param {string} event.event_organizer - The organizer of the event.
   * @param {string} event.event_url - The url of the event for redirecting to organizers web page.
   * @param {string} event.short_description - The short description of the event.
   * @param {string} event.full_description - The full description of the event.
   * @param {string} event.start_date - The start date of the event.
   * @param {string} event.end_date - The end date of the event.
   * @param {number} event.latitude - The latitude of the event.
   * @param {number} event.longitude - The longitude of the event.
   * @param {string} event.address - The address of the event.
   * @param {string} event.city - The city where the event is held.
   * @param {number[]} event.tags - The ids of the tags to be associated with the event.
   * @returns {Promise} On success the promise will be resolved with the results
   * of the query.</br>
   * On error the promise will be rejected with an error.
   */
  addEvent: (event) => {
    function save(resolve, reject) {
      const query = `INSERT INTO Events SET ?`;
      pool.query(query, event, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
    return new Promise(save);
  },
  /**
   * A function in connectionFunctions that takes an eventTag object
   * and inserts that into the database.
   * @function addTag
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {Object} eventTag - The tag that is to be associated with a specific event.
   * @param {number} eventTag.event_id - The id of the event that the tag will be associated with.
   * @param {number} eventTag.tag_id - The id of the tag that is to be associated with an event.
   * @returns {Promise} On success the promise will be resolved with the results
   * of the query.</br>
   * On error the promise will be rejected with an error.
   */
  addTag: (eventTag) => {
    function save(resolve, reject) {
      const query = `INSERT INTO Event_tags SET ?`;
      pool.query(query, eventTag, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
    return new Promise(save);
  },
  /**
   * A function in connectionFunctions that takes an id of an event
   * and deletes that events tags from database
   * @function deleteTags
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {number} id - The id of the event.
   * @returns {Promise} On success the promise will be resolved with the
   * results of the query. </br>
   * On error the promise will be rejected with an error.
   */
  deleteTags: (id) => {
    function del(resolve, reject) {
      const query = `DELETE FROM Event_tags WHERE event_id=?`;
      pool.query(query, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
    return new Promise(del);
  },
  /**
   * A function in connectionFunctions that takes an event object and id
   * of the event to be updated. Updates the event with same id with values
   * in event object.
   * @function updateEvent
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {Object} event - The event with values to be updated
   * @param {string} [event.event_name] - The name of the event.
   * @param {string} [event.event_organizer] - The organizer of the event.
   * @param {string} [event.event_url] - The url of the event for redirecting to organizers web page.
   * @param {string} [event.short_description] - The short description of the event.
   * @param {string} [event.full_description] - The full description of the event.
   * @param {string} [event.start_date] - The start date of the event.
   * @param {string} [event.end_date] - The end date of the event.
   * @param {number} [event.latitude] - The latitude of the event.
   * @param {number} [event.longitude] - The longitude of the event.
   * @param {string} [event.address] - The address of the event.
   * @param {string} [event.city] - The city where the event is held.
   * @param {number} id - The id of the event.
   * @returns {Promise} On success the promise will be resolved with the
   * results of the query. </br>
   * On error the promise will be rejected with an error.
   */
  updateEvent: (event, id) => {
    function save(resolve, reject) {
      const query = `UPDATE Events SET ? WHERE id = ?`;
      pool.query(query, [event, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
    return new Promise(save);
  },
  /**
   * A function in connectionFunctions that takes an id of an event
   * and deletes that event from database
   * @function deleteById
   * @memberof module:database/crudrepository~connectionFunctions
   * @param {number} id - The id of the event.
   * @returns {Promise} On success the promise will be resolved with the
   * results of the query. </br>
   * On error the promise will be rejected with an error.
   */
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
