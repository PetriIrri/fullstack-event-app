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

module.exports = router;
