const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getSites, postSite } = require("./Controllers/siteController");
const { getTours, postTour } = require("./Controllers/tourController");

const app = express();
const port = process.env.PORT || 8001;
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

app.get("/sites", getSites);
app.post("/sites", postSite);

app.get("/tours", getTours);
app.post("/tours", postTour);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Endpoint does not exist" });
});

app.use((err, req, res, next) => {
  if (err.msg) res.status(err.status).send({ msg: err.msg });
  res.status(400).send({ msg: "Invalid Input" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
