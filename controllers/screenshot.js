const utils = require('../utils/utils');
const Screenshot = require('../models/screenshot');
const User = require('../models/user');

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Screenshot.find()
      .then((screenshot) => {
        res.status(200).json({
          error: 0,
          message: 'Fetch data screenshot success',
          data: screenshot,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }
};

exports.delete = async (req, res, next) => {
  console.log(req, '<<<< req');
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Screenshot.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(201).json({
          error: 0,
          message: 'Screenshot was deleted successfully!',
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.create = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    const screenshot = new Screenshot({
      name: req.body.name,
      image: req.body.image,
      modifiedAt: new Date(),
    });

    screenshot.save((err, org) => {
      if (err) {
        res.status(500).send({ message: err, data: screenshot });
        return;
      }
      res.status(201).send({
        error: 0,
        message: 'Screenshot was added successfully!',
        data: screenshot,
      });
    });
  }
};

exports.get = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  Screenshot.findById(req.query.id)
    .then((screenshot) => {
      res.json({
        data: screenshot,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};
