const mongoose = require("mongoose");

const Organization = mongoose.model(
  "Organization",
  new mongoose.Schema({
    name: String,
    description: String,
    modifiedAt: Number,
    modifiedBy: String,
  })
);

module.exports = Organization;
