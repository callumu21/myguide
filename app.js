const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");
const { handleErrors } = require("./errors");

const app = express();
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `./.env.${ENV}` });
const uri = process.env.MONGO_URI;

mongoose.connect(uri, () => {
  console.log("connected"),
    (err) => {
      console.log(err);
    };
});

app.use(cors());
app.use(express.json());

app.use("/", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Endpoint does not exist" });
});

app.use(handleErrors);

module.exports = app;
