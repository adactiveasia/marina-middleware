const mongoose = require("mongoose");

const Poi = mongoose.model(
  "Poi",
  new mongoose.Schema({
    name: String,
    description: String,
    siteId: {
      type: mongoose.Types.ObjectId,
      ref: "Site",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "PoiCategory",
    },
    categoryName: String,
    floor: String,
    location: String,
    logo: String,
    logoUrl: String,
    opentime: String,
    phone: String,
    priority: String,
    tag: String,
    url: String,
    modifiedAt: Number,
    modifiedBy: String,
  })
);

module.exports = Poi;
