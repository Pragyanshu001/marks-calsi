const express = require("express");
const userRoutes = require("./userRoutes/userRoutes");
const app = express();

app.use("/user", userRoutes);
app.get("/health", (req, res) => {
  res.status(200).send({
    uptime: Math.floor(process.uptime()) + " seconds",
    status: "OK",
    date: new Date().toLocaleString(),
  });
});

module.exports = app;
