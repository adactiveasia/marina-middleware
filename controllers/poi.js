
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');
const config = require('../config/auth.config');
const db = require("../models");
const User = db.user;
const Poi = db.poi;

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

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
};

exports.edit = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id)
  })

  Poi
    .findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          name: req.body.name,
          desc: req.body.desc,
          siteId: req.body.siteId,
          category: req.body.category,
          floor: req.body.floor,
          location: req.body.location,
          logo: req.body.logo,
          logoUrl: req.body.logoUrl,
          opentime: req.body.opentime,
          phone: req.body.phone,
          priority: req.body.priority,
          tag: req.body.tag,
          url: req.body.url,
          modifiedAt: new Date(),
          modifiedBy: user.email,
        }
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({
          error: 0,
          message: "Poi was edited successfully!"
        });
      });
}

exports.delete = async (req, res, next) => {
  Poi.findByIdAndRemove(
    req.body.id,
    (err, doc) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({
        error: 0,
        message: "Poi was deleted successfully!"
      });
    });
}

exports.create = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id)
  })

  const poi = new Poi({
    name: req.body.name,
    desc: req.body.desc,
    siteId: req.body.siteId,
    category: req.body.category,
    floor: req.body.floor,
    location: req.body.location,
    logo: req.body.logo,
    logoUrl: req.body.logoUrl,
    opentime: req.body.opentime,
    phone: req.body.phone,
    priority: req.body.priority,
    tag: req.body.tag,
    url: req.body.url,
    modifiedAt: new Date(),
    modifiedBy: user.email,
  });

  Poi.save((err, org) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Poi was added successfully!"
    });
  });
};