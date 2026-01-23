const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./src/routes");
const { connectToMongoDB } = require("./src/connect");

let PORT = process.env.PORT;

let app = express(); // create server

connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Connection Error:", err));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  }),
);

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
