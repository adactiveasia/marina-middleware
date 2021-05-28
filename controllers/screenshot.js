const utils = require('../utils/utils');
const Screenshot = require('../models/screenshot');
const User = require('../models/user');

exports.getAll = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    Screenshot.aggregate([
      {
        $match: {
          siteId: req.query.siteId,
          createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$mapId',
          latest: { $first: '$$ROOT' },
        },
      },
    ])
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
  console.log(req, '<<<<< request body ');

  if (req.user) {
    const screenshot = new Screenshot({
      name: req.body.name,
      siteId: req.body.siteId,
      mapId: req.body.mapId,
      mapName: req.body.mapName,
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

exports.getEveryHour = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  Screenshot.aggregate([
    {
      $match: {
        siteId: req.query.siteId,
        mapId: req.query.mapId,
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: { $hour: '$createdAt' },
        latest: { $first: '$$ROOT' },
      },
    },
  ])
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
