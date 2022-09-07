const seed = require("./seed");
const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";

const seedData = require(`../data/${ENV}-data`);

const runSeed = async () => {
  await seed(seedData);
  await mongoose.connection.close();
  console.log("Seeding complete");
};

runSeed();

module.exports = runSeed;
