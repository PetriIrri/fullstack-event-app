const express = require("express");
const router = express.Router();
const connection = require("../database/crudrepository");

router.get("/", async (req, res) => {
  res.send("hello world!");
});

module.exports = router;
