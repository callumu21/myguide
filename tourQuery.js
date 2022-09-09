const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TourSchema = mongoose.Schema(
  {
    authorId: Number,
    tourCode: Number,
    tourName: String,
    tourDescription: String,
    tourImage: String,
    tourSites: [Number],
  },
  { timestamps: true }
);

TourSchema.plugin(AutoIncrement, { inc_field: "tourId" });
module.exports = mongoose.model("tour", TourSchema);
