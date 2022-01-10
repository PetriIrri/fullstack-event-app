const express = require("express");
const router = express.Router();
const connection = require("../database/crudrepository");
var Validator = require("jsonschema").Validator;
var v = new Validator();

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

const idSchema = { type: "integer", minimum: 1 };

function checkValid(schema, params) {
  v.validate(params, schema, {
    throwError: true,
    allowUnknownAttributes: false,
  }).valid == true
    ? true
    : false;
}

router.get("/", async (req, res) => {
  try {
    let data = await connection.findAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).end(JSON.stringify(err));
  }
});

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

// Update One event
router.put("/:id([0-9]+$)", async (req, res) => {
  try {
    checkValid(idSchema, parseInt(req.params.id));
    checkValid(updateEventSchema, req.body);
    if (req.body.tags) {
      const { tags, ...event } = req.body;
      let result = await connection.updateEvent(event, req.params.id);
      console.log(result);
      result = await connection.deleteTags(req.params.id);
      console.log(result);
      for (let index = 0; index < tags.length; index++) {
        await connection.addTag({
          event_id: req.params.id,
          tag_id: tags[index],
        });
      }
    } else {
      let event = req.body;
      console.log(event);
      let result = await connection.updateEvent(event, req.params.id);
      console.log(result);
    }
    res.status(200).send(JSON.stringify({ msg: "Record updated" }));
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

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
