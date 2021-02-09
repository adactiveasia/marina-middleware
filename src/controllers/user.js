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
    const users = await User.find(
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
    ).sort({
      [req.query.sort]: req.query.order,
    });

    return res.status(200).json({
      error: 0,
      message: "Fetch user successfully",
      data: users,
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

    const saveUser = await user.save().catch((err) => {
      return {
        error: true,
        message: err,
      };
    });

    if (!saveUser.error) {
      res.status(201).json({
        error: 0,
        message: "User was added successfully!",
      });
    } else {
      res.status(500).send({ message: saveUser.message });
      return;
    }
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

    const saveUser = await user.save().catch((err) => {
      return {
        error: true,
        message: err,
      };
    });

    if (!saveUser.error) {
      res.status(201).json({
        error: 0,
        message: "User was added successfully!",
      });
    } else {
      res.status(500).send({ message: saveUser.message });
      return;
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  utils.authenticateJWT(req, res, next);
  if (req.user) {
    const deleteUser = await User.findByIdAndDelete(req.params.id).catch(
      (err) => {
        return {
          error: true,
          message: err,
        };
      }
    );
    if (!deleteUser.error) {
      res.status(201).json({
        error: 0,
        message: "User was deleted successfully!",
      });
    } else {
      res.status(500).send({ message: deleteUser.message });
      return;
    }
  }
};
