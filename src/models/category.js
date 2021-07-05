const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
      },
      modifiedAt: Number,
      modifiedBy: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Category;
