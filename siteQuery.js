const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const SiteSchema = mongoose.Schema(
  {
    authorID: Number,
    siteName: String,
    siteDescription: String,
    siteImage: String,
    siteAddress: String,
    latitude: Number,
    longitude: Number,
    contactInfo: String,
    websiteLink: String,
  },
  { timestamps: true }
);

SiteSchema.plugin(AutoIncrement, { inc_field: "siteId" });
module.exports = mongoose.model("site", SiteSchema);
