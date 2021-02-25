const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const User = require("../models/user");
const Site = require("../models/site");
const Organization = require("../models/organization");
const Mail = require("./mail");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");
const { mongoose } = require("../models");

exports.win = async (req, res, next) => {
  const { win, email, mobile, first, last, birthday, optin } = req.body;
  try {
    const mailTotal = await User.find({ email: email }).countDocuments();
    const mobileTotal = await User.find({ mobile: mobile }).countDocuments();
    if (mailTotal + mobileTotal < 5 && mailTotal < 4 && mobileTotal < 4) {
      const user = new User({
        email,
        mobile,
        first,
        last,
        birthday,
        optin,
      });
      await user.save();

      let info = "";
      let error = "";

      try {
        info = Mail.sendMail(email, win);
      } catch (e) {
        error = e;
      }

      return res.status(200).json({
        error: 0,
        message: "user saved successefully",
        info: info,
        mailError: error,
      });
    } else {
      return res.status(200).json({
        error: 1,
        message: "you have claim more than 3 times",
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.listAllUsers = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    User.find()
      .then((users) => {
        res.status(200).json({
          error: 0,
          message: "Fetch user successfully",
          data: users,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.addUser = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);

  if (req.user) {
    const authUser = await User.findById(req.user.id);

    const request = req.body;
    const user = new User();
    user.isAdmin = request.isAdmin;
    user.email = request.email;
    user.name = request.name;
    user.password = bcrypt.hashSync(request.password);
    user.organizationId = request.organizationId;
    user.organizationName = request.organizationName;
    user.access = request.access;
    user.modifiedBy = authUser ? authUser.email : null;
    user.createdBy = authUser ? authUser.email : null;
    if (req.file) {
      user.logoUrl = req.file.filename;
    }

    user
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "User was added successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.editUser = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  console.log(req.params);
  if (req.user) {
    const authUser = await User.findById(req.user.id);

    const request = req.body;
    const user = await User.findByIdAndUpdate(request.id);
    user.username = request.username;
    user.email = request.email;
    if (request.password) {
      user.password = bcrypt.hashSync(request.password);
    }
    user.name = request.name;
    user.isAdmin = request.isAdmin;
    user.organizationId = request.organizationId;
    user.organizationName = request.organizationName;
    user.access = request.access;
    user.modifiedBy = authUser ? authUser.email : null;
    if (req.file) {
      user.logoUrl = req.file.filename;
    }

    user
      .save()
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "User was updated successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.deleteUser = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    User.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(201).json({
          error: 0,
          message: "User was deleted successfully!",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.getUser = async = (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.id) } },
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
      {
        $lookup: {
          from: "sites",
          localField: "organizationId",
          foreignField: "organizationId",
          as: "sites",
        },
      },
      { $unwind: "$organization" },
    ])
      .then(async (user) => {
        res.status(200).json({
          data: user[0],
          error: 0,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};

exports.access = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    User.findByIdAndUpdate(req.body._id, { access: req.body.access })
      .then((user) => {
        res.status(200).json({
          data: user,
          error: 0,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  }
};
