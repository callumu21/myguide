const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getSites, postSite } = require("./Controllers/siteController");
const {
  getTours,
  postTour,
  getTourById,
  deleteTour,
  updateTour,
} = require("./Controllers/tourController");

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

app.get("/tours/:tour_id", getTourById);
app.patch("/tours/:tour_id", updateTour);
app.delete("/tours/:tour_id", deleteTour);

app.use((err, req, res, next) => {
  if (err.msg) res.status(err.status).send({ msg: err.msg });
  res.status(400).send({ msg: "Invalid Input" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
