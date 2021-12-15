const express = require("express");
const locations = require("./routes/events.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

app.use("/events", locations);

const server = app.listen(8080, async () => {
  console.log(`Listening on port ${server.address().port}`);
});
