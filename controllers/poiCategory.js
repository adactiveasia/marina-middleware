
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');
const config = require('../config/auth.config');
const db = require('../models');
const User = require("../models/user");
const PoiCategory = require("../models/poiCategory");

exports.getAll = async (req, res, next) => {
    utils.authenticateJWT(req, res, next);

    PoiCategory.find()
        .then((poiCategory) => {
            res.status(200).json({
                error: 0,
                message: "Fetch data poi category success",
                data: poiCategory,
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

    PoiCategory
        .findByIdAndUpdate(
            req.body.id,
            {
                $set: {
                    name: req.body.name,
                    desc: req.body.desc,
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
                    message: "Poi Category was edited successfully!"
                });
            });
}

exports.delete = async (req, res, next) => {
    utils.authenticateJWT(req, res, next);

    PoiCategory.findByIdAndRemove(
        req.body.id,
        (err, doc) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({
                error: 0,
                message: "Poi Category was deleted successfully!"
            });
        });
}

exports.create = async (req, res, next) => {
    utils.authenticateJWT(req, res, next);

    let user = await User.findOne({
        _id: ObjectId(req.user.id)
    })

    const poiCategory = new PoiCategory({
        name: req.body.name,
        desc: req.body.desc,
        siteId: req.body.siteId,
        modifiedAt: new Date(),
        modifiedBy: user.email,
    });

    poiCategory.save((err, org) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({
            error: 0,
            message: "Poi Category was added successfully!"
        });
    });
};
