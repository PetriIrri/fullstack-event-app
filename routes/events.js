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

module.exports = router;
