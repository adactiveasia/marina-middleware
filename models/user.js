const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      name: String,
      isAdmin: Boolean,
      organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
      },
      organizationName: String,
      logoUrl: String,
      access: Array,
      isPasswordChanged: Boolean,
      modifiedBy: String,
      createdBy: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = User;
