const express = require("express");
const webhookRoute = require("./routes/webhook");

const app = express();

app.use(express.json());

app.use("/webhook", webhookRoute);

app.get("/", (req, res) => {
  res.send("ImpactSense API Running");
});

module.exports = app;
