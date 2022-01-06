const express = require("express");
const locations = require("./routes/events.js");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

app.use("/events", locations);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const port = process.env.PORT || 8080;
const server = app.listen(port, async () => {
  console.log(`Listening on port ${server.address().port}`);
});
