const mongoose = require("mongoose");

const PoiCategory = mongoose.model(
  "PoiCategory",
  new mongoose.Schema({
    name: String,
    description: String,
    modifiedAt: Number,
    modifiedBy: String,
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
  })
);

module.exports = PoiCategory;
