const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Test = require("./testQuery.js");

const app = express();
const port = process.env.PORT || 8001;
require("dotenv").config({ path: "./__tests__/.env.test" });
const uri = process.env.MONGO_URI;

mongoose.connect(uri, () => {
  console.log("connected"),
    (err) => {
      console.log(err);
    };
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  Test.find((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/", (req, res) => {
  const testData = req.body;
  console.log(testData);
  Test.create(testData, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
