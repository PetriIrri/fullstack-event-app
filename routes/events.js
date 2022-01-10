const express = require("express");
const { addTag } = require("../database/crudrepository");
const router = express.Router();
const connection = require("../database/crudrepository");

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
    // take tags to their own variable and create newEvent without them
    const { tags, ...newEvent } = req.body;
    let result = await connection.addEvent(newEvent);
    // get the created records id from result
    const eventId = result.insertId;
    //loop through the given tags and add them.
    for (let index = 0; index < tags.length; index++) {
      await addTag({ event_id: eventId, tag_id: tags[index] });
    }
    res.status(201).send(JSON.stringify({ msg: "New record added" }));
  } catch (err) {
    res.status(400).end(JSON.stringify(err));
  }
});

// Update One event
router.put("/:id([0-9]+$)", async (req, res) => {
  try {
    if (req.body.tags) {
      const { tags, ...event } = req.body;
      let result = await connection.updateEvent(event, req.params.id);
      console.log(result);
      result = await connection.deleteTags(req.params.id);
      console.log(result);
      for (let index = 0; index < tags.length; index++) {
        await addTag({ event_id: req.params.id, tag_id: tags[index] });
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
