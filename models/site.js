const mongoose = require("mongoose");

const Site = mongoose.model(
  "Site",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      organizationName: String,
      modifiedBy: String,
      createdBy: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Site;
