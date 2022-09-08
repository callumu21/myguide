const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  getSites,
  postSite,
  getSiteById,
  patchSiteById,
  deleteSiteById,
} = require("./Controllers/siteController");
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
app.get("/sites/:site_id", getSiteById);
app.patch("/sites/:site_id", patchSiteById);
app.delete("/sites/:site_id", deleteSiteById);
app.post("/sites", postSite);

app.get("/tours", getTours);
app.post("/tours", postTour);

app.use((err, req, res, next) => {
  if (err.msg) res.status(err.status).send({ msg: err.msg });
  res.status(400).send({ msg: "Invalid Input" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
