const mongoose = require("mongoose");

const Media = mongoose.model(
  "Media",
  new mongoose.Schema({
    name: String,
    description: String,
    siteId: {
      type: mongoose.Types.ObjectId,
      ref: "Site",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    categoryName: String,
    days: Array,
    dates: Array,
    duration: Number,
    logo: String,
    type: String,
    modifiedAt: Number,
    modifiedBy: String,
  })
);
module.exports = Media;
