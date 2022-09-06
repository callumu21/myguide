const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

siteSchema.plugin(AutoIncrement, { inc_field: "siteId" });
module.exports = mongoose.model("site", siteSchema);
