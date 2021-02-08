const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Organization = db.organization;

exports.create = async (req, res, next) => {
  let user = await User.findOne({
    _id: ObjectId(req.user.id),
  });

  const organization = new Organization({
    name: req.body.name,
    desc: req.body.desc,
    modifiedAt: new Date(),
    modifiedBy: user.email,
  });

  organization.save((err, org) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({
      error: 0,
      message: "Organization was added successfully!",
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
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
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
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
      accessToken: token,
    });
  });
};
