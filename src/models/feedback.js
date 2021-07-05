const mongoose = require("mongoose");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema(
    {
      question: String,
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
      },
      start: Date,
      end: Date,
      modifiedAt: Number,
      modifiedBy: String,
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Feedback;
