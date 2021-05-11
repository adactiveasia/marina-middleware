const mongoose = require('mongoose');

const Screenshot = mongoose.model(
  'Screenshot',
  new mongoose.Schema({
    name: String,
    siteId: String,
    image: String,
    modifiedAt: Number,
    createdAt: { type: Date, expires: 43200, default: Date.now },
  })
);
module.exports = Screenshot;
