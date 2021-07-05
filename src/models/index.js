const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.organization = require("./organization");
db.poi = require("./poi");
db.map = require("./map");
db.poiCategory = require("./poiCategory");
db.category = require("./category");
db.media = require("./media");
db.feedback = require("./feedback");
db.respondent = require("./respondent");

module.exports = db;
