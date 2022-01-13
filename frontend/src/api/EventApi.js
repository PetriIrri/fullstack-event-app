/**
 * Module for frontend to connect to backend using axios.
 * @module src/api/EventApi
 * @author Petri Irri
 * @requires axios
 */

import axios from "axios";

/**
 * Url for API calls.
 * @type {string}
 * @constant
 */
const url = process.env.REACT_APP_API_URL;

/**
 * Function that fetches all events from API.
 * @function fetchAll
 * @memberof module:src/api/EventApi
 * @returns {object} Returns an object containing all events.
 */
export const fetchAll = async () => {
  let result = await axios.get(url);
  return result;
};

/**
 * Function that fetches event data by id.
 * @function fetchById
 * @memberof module:src/api/EventApi
 * @param {number} id The id of the event to be fetched.
 * @returns {object} Returns an object containing all the data of requested event.
 */
export const fetchById = async (id) => {
  let result = await axios.get(url + id);
  return result;
};
