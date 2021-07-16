const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Poi = db.poi;
const Map = db.map;
const fs = require("fs");

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Poi.find()
      .then((poi) => {
        res.status(200).json({
          error: 0,
          message: "Fetch data poi success",
          data: poi,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }
};

exports.edit = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id),
  });

  const poi = await Poi.findByIdAndUpdate(req.body.id);
  poi.name = req.body.name;
  poi.description = req.body.description;
  poi.siteId = req.body.siteId;
  poi.categoryId = req.body.categoryId;
  poi.categoryName = req.body.categoryName;
  poi.floor = req.body.floor;
  poi.location = req.body.location;

  if (req.file) {
    if (poi.logo) {
      if (fs.existsSync(`images/poi/${poi.logo}`)) {
        fs.unlinkSync(`images/poi/${poi.logo}`);
      }
    }
    poi.logo = req.file.filename;
  }

  poi.opentime = req.body.opentime;
  poi.phone = req.body.phone;
  poi.priority = req.body.priority;
  poi.tag = req.body.tag;
  poi.url = req.body.url;
  poi.modifiedAt = new Date();
  poi.modifiedBy = user.email;

  const query = { siteId: req.body.siteId };
  const maps = await Map.find(query);
  const editedMaps = maps.map(map => {

    const paths = map.paths.map(path => {
      if (`${path.id}` === req.body.id) {
        path.name = req.body.name;
      }
      return path
    })
    map.paths = paths;

    map
      .save()
      .catch((err) => {
        res.status(500).send({ message: err });
      });
    return map;
  })

  poi.save().then(() => {
    res.send({
      error: 0,
      message: "Poi was edited successfully!",
    });
  });
};

exports.delete = async (req, res, next) => {
  const poi = await Poi.findById(req.body.poiId);
  const maps = await Map.find({ siteId: req.body.siteId });
  maps.map(map => {
    const paths = map.paths.filter(path => {
      return `${path.id}` !== req.body.poiId
    })
    map.paths = paths;
    map
      .save()
      .catch((err) => {
        res.status(500).send({ message: err });
      });
    return map;
  })

  if (poi) {
    if (poi.logo) {
      if (fs.existsSync(`images/poi/${poi.logo}`)) {
        fs.unlinkSync(`images/poi/${poi.logo}`);
      }
    }
  }

  Poi.findByIdAndRemove(req.body.poiId, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Poi was deleted successfully!",
    });
  });
};

exports.create = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id),
  });

  const poi = new Poi({
    name: req.body.name,
    description: req.body.description,
    siteId: req.body.siteId,
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    floor: req.body.floor,
    location: req.body.location,
    opentime: req.body.opentime,
    phone: req.body.phone,
    priority: req.body.priority,
    tag: req.body.tag,
    url: req.body.url,
    modifiedAt: new Date(),
    modifiedBy: user.email,
  });

  if (req.file) {
    poi.logo = req.file.filename;
  }

  poi.save((err, org) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Poi was added successfully!",
    });
  });
};