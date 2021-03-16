const fs = require("fs");
const Map = require("../models/map");
const utils = require("../utils/utils");
const { mongoose } = require("../models");

exports.listAllMaps = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.map) {
    Map.find()
      .then((maps) => {
        res.status(200).json({
          error: 0,
          message: "Fetch map successfully",
          data: maps,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.addMap = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.map) {
    const authMap = await Map.findById(req.map.id);

    const request = req.body;
    const map = new Map();
    map.name = request.name;
    map.description = request.description;
    map.userPos = request.userPos;
    map.siteId = request.siteId;
    map.createdBy = authMap ? authMap.email : null;
    if (req.file) {
      map.fileUrl = req.file.filename;
    }

    map
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Map was added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.editMap = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  console.log(req.params);
  if (req.map) {
    const authMap = await Map.findById(req.map.id);

    const request = req.body;
    const map = await Map.findByIdAndUpdate(request.id);
    map.name = request.name;
    map.description = request.description;
    map.userPos = request.userPos;
    map.siteId = request.siteId;
    map.modifiedBy = authMap ? authMap.email : null;
    if (req.file) {
      if (map.fileUrl) {
        if (fs.existsSync(`images/map/${map.fileUrl}`)) {
          fs.unlinkSync(`images/map/${map.fileUrl}`);
        }
      }

      map.fileUrl = req.file.filename;
    }

    map
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Map was updated successfully!",
          data: map,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.deleteMap = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.map) {
    const map = await Map.findById(req.query.id);

    if (map) {
      if (map.fileUrl) {
        if (fs.existsSync(`images/map/${map.fileUrl}`)) {
          fs.unlinkSync(`images/map/${map.fileUrl}`);
        }
      }
    }

    Map.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "Map was deleted successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.getMap = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.map) {
    Map.findById(req.query.id)
      .then((map) => {
        res.json({
          data: map,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.access = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.map) {
    Map.findByIdAndUpdate(req.body._id, { access: req.body.access })
      .then((map) => {
        res.status(200).json({
          data: map,
          error: 0,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};
