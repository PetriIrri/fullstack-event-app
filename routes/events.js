const express = require("express");
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
    console.log(req.body);
    let newEvent = req.body;
    console.log(newEvent);
    let result = await connection.addEvent(newEvent);
    console.log(result);
    res.status(201).send(JSON.stringify({ msg: "New record added" }));
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
