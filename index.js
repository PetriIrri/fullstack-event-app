const express = require("express");
const locations = require("./routes/events.js");
const cors = require("cors");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static("frontend/build"));

app.use("/events", locations);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

const server = app.listen(PORT, async () => {
  console.log(`Listening on port ${server.address().port}`);
});
