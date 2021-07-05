const mongoose = require('mongoose');

const Screenshot = mongoose.model(
  'Screenshot',
  new mongoose.Schema({
    name: String,
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    image: String,
    mapId: String,
    mapName: String,
    modifiedAt: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }).index({ createdAt: 1 }, { expireAfterSeconds: 7776000 })
);
module.exports = Screenshot;
