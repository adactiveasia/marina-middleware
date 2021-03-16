const mongoose = require("mongoose");

const Map = mongoose.model(
  "Map",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
      },
      fileUrl: String,
      paths: Array,
      userPos: String,
      modifiedBy: String,
      createdBy: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Map;
