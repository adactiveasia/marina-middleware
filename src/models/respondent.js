const mongoose = require("mongoose");

const Respondent = mongoose.model(
  "Respondent",
  new mongoose.Schema(
    {
      feedbackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedback",
      },
      star: Number,
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Respondent;
