const mongoose = require("mongoose");
const siteSchema = mongoose.Schema({
  authorID: Number,
  siteName: String,
  siteDescription: String,
  siteImage: String,
  siteAddress: String,
  latitude: Number,
  longitude: Number,
  contactInfo: String,
  websiteLink: String,
});

module.exports = mongoose.model("site", siteSchema);
