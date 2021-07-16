const mongoose = require("mongoose");

const Media = mongoose.model(
  "Media",
  new mongoose.Schema({
    name: String,
    description: String,
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    categoryName: String,
    days: Array,
    dates: Array,
    duration: Number,
    logo: String,
    fileType: String,
    color: String,
    type: String,
    start: Date,
    end: Date,
    modifiedAt: Number,
    modifiedBy: String,
  })
);
module.exports = Media;