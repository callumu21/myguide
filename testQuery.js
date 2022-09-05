const mongoose = require("mongoose");
const testSchema = mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("testcollection", testSchema);
