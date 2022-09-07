const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Site = require("../../siteQuery");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `./.env.${ENV}` });

const uri = process.env.MONGO_URI;

mongoose.connect(uri, () => {
  console.log("connected"),
    (err) => {
      console.log(err);
    };
});

const client = new MongoClient(uri);

const seed = async ({ siteData, tourData }) => {
  await client
    .db("test")
    .collection("counters")
    .updateOne({ id: "siteId" }, { $set: { seq: siteData.length } });
  await Site.deleteMany({});
  await Site.insertMany(siteData);
  console.log("Sites seeded");
};

module.exports = seed;
