const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");
const User = require("../models/user");
const Mail = require("./mail");
const bcrypt = require("bcryptjs");

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
  const users = await User.find();

  return res.status(200).json({
    error: 0,
    message: "Fetch user successfully",
    data: users,
  });
};

exports.addUser = async (req, res, next) => {
  const request = req.body;
  const user = new User();
  user.username = request.username;
  user.email = request.email;
  user.password = bcrypt.hashSync(request.password);
  user.name = request.name;
  user.organizationId = request.organizationId;
  user.organizationName = request.organizationName;
  user.access = request.access;
  try {
    await user.save();
    return res.status(201).json({
      error: 0,
      message: "Saved user successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
