const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Media = db.media;
const fs = require("fs");
const mongoose = require("mongoose");

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Media.find({ siteId: req.query.siteId })
      .then((media) => {
        res.status(200).json({
          error: 0,
          message: "Fetch data media success",
          data: media,
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

  const media = await Media.findByIdAndUpdate(req.body.id);
  media.name = req.body.name;
  media.description = req.body.description;
  media.siteId = req.body.siteId;
  media.categoryId = req.body.categoryId;
  media.categoryName = req.body.categoryName;
  media.days = JSON.parse(req.body.days);
  media.dates = JSON.parse(req.body.dates);
  media.duration = req.body.duration;
  media.type = req.body.type;

  if (req.body.start) {
    media.start = req.body.start;
  }

  if (req.body.end) {
    media.end = req.body.end;
  }

  if (req.file) {
    if (media.logo) {
      if (fs.existsSync(`images/media/${media.logo}`)) {
        fs.unlinkSync(`images/media/${media.logo}`);
      }
    }
    media.logo = req.file.filename;
  }

  media.modifiedAt = new Date();
  media.modifiedBy = user.email;

  media.save().then(() => {
    res.send({
      error: 0,
      message: "Media was edited successfully!",
      data: media,
    });
  });
};

exports.delete = async (req, res, next) => {
  const media = await Media.findById(req.query.id);

  if (media) {
    if (media.logo) {
      if (fs.existsSync(`images/media/${media.logo}`)) {
        fs.unlinkSync(`images/media/${media.logo}`);
      }
    }
  }

  Media.findByIdAndRemove(req.query.id, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Media was deleted successfully!",
    });
  });
};

exports.create = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id),
  });

  const media = new Media({
    name: req.body.name,
    description: req.body.description,
    siteId: req.body.siteId,
    categoryId: req.body.categoryId,
    categoryName: req.body.categoryName,
    days: JSON.parse(req.body.days),
    dates: JSON.parse(req.body.dates),
    duration: req.body.duration,
    type: req.body.type,
    modifiedAt: new Date(),
    modifiedBy: user.email,
  });

  if (req.body.start) {
    media.start = req.body.start;
  }

  if (req.body.end) {
    media.end = req.body.end;
  }

  if (req.file) {
    media.logo = req.file.filename;
  }

  media.save((err, org) => {
    if (err) {
      res.status(500).send({ message: err, data: media });
      return;
    }
    res.send({
      error: 0,
      message: "Media was added successfully!",
      data: media,
    });
  });
};

exports.get = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  Media.findById(req.query.id)
    .then((media) => {
      res.json({
        data: media,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

exports.calendar = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  Media.find({ siteId: req.query.siteId })
    .then((media) => {
      res.json({
        data: media,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};
