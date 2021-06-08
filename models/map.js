const mongoose = require("mongoose");

const Map = mongoose.model(
  "Map",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      mapPos: Object,
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
      },
      fileUrl: String,
      paths: Array,
      userPos: Object,
      modifiedBy: String,
      createdBy: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Map;
