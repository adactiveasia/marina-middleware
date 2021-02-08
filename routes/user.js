const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user");
const User = require("../models/user");
const validate = require("../utils/validator");
const utils = require("../utils/utils");
const { mongoose } = require("../models");

router.post(
  "/win",
  [
    body("win").trim(),
    body("email").trim().isLength({ min: 5 }),
    body("mobile").trim().isLength({ min: 5 }),
    body("first").trim().isLength({ min: 2 }),
    body("last").trim().isLength({ min: 2 }),
    body("birthday").trim().isLength({ min: 5 }),
    body("optin").trim().isLength({ min: 3 }),
  ],
  userController.win
);

router.get("/", userController.listAllUsers);
router.post(
  "/",
  [
    body("username")
      .notEmpty()
      .withMessage("This field is required")
      .custom((value) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "Username already taken! Please choose another one"
            );
          }
        });
      }),
    body("email")
      .notEmpty()
      .withMessage("This field is required")
      .isEmail()
      .withMessage("This field must be an email")
      .trim()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already taken! Please choose another one"
            );
          }
        });
      }),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Must be contain at least 6 chars long")
      .trim(),
  ],
  validate,
  userController.addUser
);

router.post(
  "/:id",
  [
    body("username")
      .notEmpty()
      .withMessage("This field is required")
      .custom((value, { req }) => {
        return User.findOne({
          username: value,
          _id: { $ne: mongoose.Types.ObjectId(req.params.id) },
        }).then((user) => {
          if (user) {
            return Promise.reject(
              "Username already taken! Please choose another one"
            );
          }
        });
      }),
    body("email")
      .notEmpty()
      .withMessage("This field is required")
      .isEmail()
      .withMessage("This field must be an email")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
          _id: { $ne: mongoose.Types.ObjectId(req.params.id) },
        }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already taken! Please choose another one"
            );
          }
        });
      }),
    body("password")
      .if((value) => value)
      .isLength({ min: 6 })
      .withMessage("Must be contain at least 6 chars long")
      .bail()
      .trim(),
  ],
  validate,
  userController.editUser
);

router.delete("/:id", userController.deleteUser);

module.exports = router;
