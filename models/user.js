const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      name: String,
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      organizationName: String,
      access: Array,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
