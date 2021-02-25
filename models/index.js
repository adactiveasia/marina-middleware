const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.organization = require("./organization");
db.poi = require("./poi");
db.poiCategory = require("./poiCategory");
db.category = require("./category");

module.exports = db;
