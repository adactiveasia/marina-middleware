const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Feedback = db.feedback;
const fs = require("fs");
const mongoose = require("mongoose");

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Feedback.find({ siteId: req.query.siteId })
      .then((feedback) => {
        res.status(200).json({
          error: 0,
          message: "Fetch data feedback success",
          data: feedback,
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

  const feedback = await Feedback.findByIdAndUpdate(req.body.id);
  feedback.question = req.body.question;
  feedback.siteId = req.body.siteId;
  feedback.start = req.body.start;
  feedback.end = req.body.end;
  feedback.modifiedAt = new Date();
  feedback.modifiedBy = user.email;

  feedback.save().then(() => {
    res.send({
      error: 0,
      message: "Feedback was edited successfully!",
      data: req.body,
    });
  });
};

exports.delete = async (req, res, next) => {
  Feedback.findByIdAndRemove(req.query.id, (err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Feedback was deleted successfully!",
    });
  });
};

exports.create = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  let user = await User.findOne({
    _id: ObjectId(req.user.id),
  });
  if (req.user) {
    const feedback = new Feedback({
      question: req.body.question,
      siteId: req.body.siteId,
      start: req.body.start,
      end: req.body.end,
      modifiedAt: new Date(),
      modifiedBy: user.email,
    });

    feedback.save((err, org) => {
      if (err) {
        res.status(500).send({ message: err, data: feedback });
        return;
      }
      res.send({
        error: 0,
        message: "Feedback was added successfully!",
        data: feedback,
      });
    });
  }
};

exports.get = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  Feedback.findById(req.query.id)
    .then((feedback) => {
      res.json({
        data: feedback,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};
