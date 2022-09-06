const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Site = require("./siteQuery.js");
const {
  getSites,
  getSiteUsers,
  postSite,
} = require("./Controllers/siteController");

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

app.get("/sites", getSites);

app.get("/sites/:user_id", getSiteUsers);
app.post("/sites", postSite);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
