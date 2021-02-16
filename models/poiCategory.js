const mongoose = require("mongoose");

const PoiCategory = mongoose.model(
  "PoiCategory",
  new mongoose.Schema({
    name: String,
    desc: String,
    modifiedAt: Number,
    modifiedBy: String,
    siteId: String,
  })
);

module.exports = PoiCategory;