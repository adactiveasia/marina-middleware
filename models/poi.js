
const mongoose = require("mongoose");

const Poi = mongoose.model(
    "Poi",
    new mongoose.Schema({
        name: String,
        desc: String,
        siteId: String,
        category: String,
        floor: String,
        location: String,
        logo: String,
        logoUrl: String,
        opentime: String,
        phone: String,
        priority: String,
        tag: String,
        url: String,
        modifiedAt: Number,
        modifiedBy: String,
    })
);

module.exports = Poi;