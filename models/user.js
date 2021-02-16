const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    createdAt: Number,
    organizationId: Number,
    organizationName: String,
  })
);

module.exports = User;