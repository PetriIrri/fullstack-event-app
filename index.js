/**
 * Module that starts the server.
 * @module index
 * @author Petri Irri
 * @requires express
 * @requires module:routes/events
 * @requires cors
 * @requires path
 */

/**
 * Express module
 * @type {object}
 * @constant
 */
const express = require("express");
/**
 * Events module that has all route locations.
 * @type {object}
 * @constant
 */
const locations = require("./routes/events.js");
/**
 * Cors module
 * @type {object}
 * @constant
 */
const cors = require("cors");
/**
 * Express application
 * @type {object}
 * @constant
 * @namespace app
 */
const app = express();
/**
 * Path module
 * @type {object}
 * @constant
 */
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

/**
 * Route serving events data
 * @name use/events
 * @function
 * @memberof module:index~app
 * @inner
 * @param {string} path - Express path.
 * @param {object} locations - Express router.
 */
app.use("/events", locations);

/**
 * Route serving frontend React app
 * @name get*
 * @function
 * @memberof module:index~app
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 8080;
const server = app.listen(port, async () => {
  console.log(`Listening on port ${server.address().port}`);
});
