const mongoose = require('mongoose');

const Screenshot = mongoose.model(
  'Screenshot',
  new mongoose.Schema({
    name: String,
    image: Buffer,
    modifiedAt: Number,
  })
);
module.exports = Screenshot;
