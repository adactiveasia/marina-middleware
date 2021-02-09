const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const User = require("../models/user");
const Mail = require("./mail");
const bcrypt = require("bcryptjs");
const utils = require("../utils/utils");

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
  console.log(parseInt(req.query.perpage) * (parseInt(req.query.page) - 1));

  if (req.user) {
    User.find(
      {
        $and: [
          {
            $or: [
              { username: { $regex: `.*${req.query.keyword}.*` } },
              { email: { $regex: `.*${req.query.keyword}.*` } },
              { name: { $regex: `.*${req.query.keyword}.*` } },
            ],
          },
        ],
      },
      {},
      {
        limit: parseInt(req.query.perpage),
        skip: parseInt(req.query.perpage) * (parseInt(req.query.page) - 1),
      }
    )
      .sort({
        [req.query.sort]: req.query.order,
      })
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
    user.username = request.username;
    user.email = request.email;
    user.password = bcrypt.hashSync(request.password);
    user.name = request.name;
    user.organizationId = request.organizationId;
    user.organizationName = request.organizationName;
    user.access = request.access;
    user.modifiedAt = new Date();
    user.modifiedBy = authUser ? authUser.email : null;

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

  if (req.user) {
    const authUser = await User.findById(req.user.id);

    const request = req.body;
    const user = await User.findByIdAndUpdate(req.params.id);
    user.username = request.username;
    user.email = request.email;
    if (request.password) {
      user.password = bcrypt.hashSync(request.password);
    }
    user.name = request.name;
    user.organizationId = request.organizationId;
    user.organizationName = request.organizationName;
    user.access = request.access;
    user.modifiedAt = new Date();
    user.modifiedBy = authUser ? authUser.email : null;

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
    User.findByIdAndDelete(req.params.id)
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
