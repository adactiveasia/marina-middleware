
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const utils = require('../utils/utils');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const PoiCategory = db.poiCategory;

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
    Organization
        .findByIdAndUpdate(
            req.body.id,
            { $set: { name: req.body.name, desc: req.body.desc } },
            { new: true },
            (err, doc) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({
                    error: 0,
                    message: "Organization was edited successfully!"
                });
            });
}

exports.delete = async (req, res, next) => {
    Organization.findByIdAndRemove(
        req.body.id,
        (err, doc) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({
                error: 0,
                message: "Organization was deleted successfully!"
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

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    error: 1,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            // for (let i = 0; i < user.roles.length; i++) {
            //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            // }
            res.status(200).send({
                error: 0,
                id: user._id,
                email: user.email,
                name: user.name,
                accessToken: token
            });
        });
}