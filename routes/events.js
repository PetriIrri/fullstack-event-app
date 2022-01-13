/**
 * Route module tha houses all the routes used by the API
 * and validation of received values in req.body and req.params.
 * @module routes/events
 * @author Petri Irri
 * @requires express
 * @requires module:database/crudrepository
 * @requires jsonschema.Validator
 */

/**
 * express module.
 * @constant
 */
const express = require("express");
/**
 * Express router for API routing
 * @type {Object}
 * @constant
 * @namespace eventsRouter
 */
const router = express.Router();
/**
 * Database connection functions.
 * @type {object}
 * @constant
 */
const connection = require("../database/crudrepository");
var Validator = require("jsonschema").Validator;
var v = new Validator();

/**
 * Jsonschema for validating events to be added to the database.
 * @namespace
 * @property {string} type - Type of event object.
 * @property {Object} properties - properties that the event can have.
 * @property {string} properties.event_name - The events name.
 * @property {string} properties.event_organizer - The events organizer.
 * @property {string} properties.event_url - The url to organizers page.
 * @property {string} properties.short_description - The events short description.
 * @property {string} properties.full_description - The events full description.
 * @property {string} properties.end_date - The events end date.
 * @property {string} properties.start_date - The events start date.
 * @property {number} properties.latitude - The events latitude coordinates.
 * @property {number} properties.longitude - The events longitude coordinates.
 * @property {string} properties.address - The address where the event is held.
 * @property {string} properties.city - The city where the event is held.
 * @property {number[]} properties.tags - The tag ids associated with the event.
 * @property {string[]} required - The required properties for event object.
 * @property {boolean} additionalProperties - Are additional properties allowed for event object.
 */
const newEventSchema = {
  type: "object",
  properties: {
    event_name: { type: "string" },
    event_organizer: { type: "string" },
    event_url: { type: "string", format: "uri-template" },
    short_description: { type: "string", maxLength: 500 },
    full_description: { type: "string" },
    start_date: { type: "string", format: "date" },
    end_date: { type: "string", format: "date" },
    latitude: { type: "number", minimum: -90, maximum: 90 },
    longitude: { type: "number", minimum: -180, maximum: 180 },
    address: { type: "string" },
    city: { type: "string" },
    tags: { type: "array", items: { type: "number" } },
  },
  required: [
    "event_name",
    "event_organizer",
    "event_url",
    "short_description",
    "full_description",
    "start_date",
    "end_date",
    "latitude",
    "longitude",
    "address",
    "city",
    "tags",
  ],
  additionalProperties: false,
};

/**
 * Jsonschema for validating event objects used for updating
 * an events details.
 * @namespace
 * @property {string} type - Type of event object.
 * @property {Object} properties - properties that the event can have.
 * @property {string} properties.event_name - The events name.
 * @property {string} properties.event_organizer - The events organizer.
 * @property {string} properties.event_url - The url to organizers page.
 * @property {string} properties.short_description - The events short description.
 * @property {string} properties.full_description - The events full description.
 * @property {string} properties.end_date - The events end date.
 * @property {string} properties.start_date - The events start date.
 * @property {number} properties.latitude - The events latitude coordinates.
 * @property {number} properties.longitude - The events longitude coordinates.
 * @property {string} properties.address - The address where the event is held.
 * @property {string} properties.city - The city where the event is held.
 * @property {number[]} properties.tags - The tag ids associated with the event.
 * @property {boolean} additionalProperties - Are additional properties allowed for event object.
 */
const updateEventSchema = {
  type: "object",
  properties: {
    event_name: { type: "string" },
    event_organizer: { type: "string" },
    event_url: { type: "string", format: "uri-template" },
    short_description: { type: "string", maxLength: 500 },
    full_description: { type: "string" },
    start_date: { type: "string", format: "date" },
    end_date: { type: "string", format: "date" },
    latitude: { type: "number", minimum: -90, maximum: 90 },
    longitude: { type: "number", minimum: -180, maximum: 180 },
    address: { type: "string" },
    city: { type: "string" },
    tags: { type: "array", items: { type: "number" } },
  },
  additionalProperties: false,
};

/**
 * Schema for validating that received id is > 0.
 * @namespace
 * @property {string} type - type of received id.
 * @property {number} minimum - minimum value of id.
 */
const idSchema = { type: "integer", minimum: 1 };

/**
 * Function that checks that given params match given schema.
 * Throws error if params do not match schema.
 * @function checkValid
 * @param {Object} schema - The schema that is used to validate params.
 * @param {*} params - Parameters that are validated against schema.
 */
function checkValid(schema, params) {
  v.validate(params, schema, {
    throwError: true,
    allowUnknownAttributes: false,
  }).valid == true
    ? true
    : false;
}

/**
 * Route serving data on all events in database.
 * @name get/
 * @function
 * @memberof module:routes/events~eventsRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get("/", async (req, res) => {
  try {
    let data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).end(JSON.stringify(err));
  }
});

/**
 * Route serving data on a specific event based on id.
 * @name get/:id
 * @function
 * @memberof module:routes/events~eventsRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get("/:id([0-9]+$)", async (req, res) => {
  try {
    checkValid(idSchema, parseInt(req.params.id));
    let data = await connection.findById(req.params.id);
    if (data.length > 0) {
      res.status(200).send(data);
    } else {
      res
        .status(404)
        .end(JSON.stringify({ msg: "No resource found with given id" }));
    }
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

/**
 * Route serving post request for adding an event to database.
 * @name post/
 * @function
 * @memberof module:routes/events~eventsRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post("/", async (req, res) => {
  try {
    //validate request body against newEventSchema
    checkValid(newEventSchema, req.body);
    // take tags to their own variable and create newEvent without them
    const { tags, ...newEvent } = req.body;
    let result = await connection.addEvent(newEvent);
    // get the created records id from result
    const eventId = result.insertId;
    //loop through the given tags and add them.
    for (let index = 0; index < tags.length; index++) {
      await connection.addTag({ event_id: eventId, tag_id: tags[index] });
    }
    res.status(201).send(JSON.stringify({ msg: "New record added" }));
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

/**
 * Route serving put requests for updating events data in database.
 * @name put/:id
 * @function
 * @memberof module:routes/events~eventsRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.put("/:id([0-9]+$)", async (req, res) => {
  try {
    checkValid(idSchema, parseInt(req.params.id));
    checkValid(updateEventSchema, req.body);
    if (req.body.tags) {
      const { tags, ...event } = req.body;
      await connection.updateEvent(event, req.params.id);
      await connection.deleteTags(req.params.id);
      for (let index = 0; index < tags.length; index++) {
        await connection.addTag({
          event_id: req.params.id,
          tag_id: tags[index],
        });
      }
    } else {
      let event = req.body;
      await connection.updateEvent(event, req.params.id);
    }
    res.status(200).send(JSON.stringify({ msg: "Record updated" }));
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

/**
 * Route serving delete requests for deleting an event in database.
 * @name post/
 * @function
 * @memberof module:routes/events~eventsRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.delete("/:id([0-9]+$)", async (req, res) => {
  try {
    checkValid(idSchema, parseInt(req.params.id));
    let data = await connection.deleteById(req.params.id);
    // if affectedRows = 0 no row was deleted. meaning no row
    // with given id was found.
    if (data.affectedRows == 0) {
      res
        .status(400)
        .end(JSON.stringify({ msg: "no record with the given id found" }));
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

module.exports = router;
