const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");

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

app.use((err, req, res, next) => {
  if (err.msg) res.status(err.status).send({ msg: err.msg });
  res.status(400).send({ msg: "Invalid Input" });
});

module.exports = app;
