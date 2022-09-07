const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getSites, postSite } = require("./Controllers/siteController");
const { getTours, postTour } = require("./Controllers/tourController");

const app = express();
const port = process.env.PORT || 8001;
require("dotenv").config({ path: "./.env.test" });
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

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
