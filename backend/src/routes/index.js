const express = require("express");
const userRoutes = require("./userRoutes/userRoutes");
const app = express();

app.use("/user", userRoutes);

module.exports = app;
