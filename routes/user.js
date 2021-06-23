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
router.post("/get", userController.getUser);
router.post(
  "/create",
  [
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
      .withMessage("This field is required"),
    body('name').notEmpty()
      .withMessage('This field is required'),
    body('organizationId')
      .notEmpty()
      .withMessage('This field is required')
  ],
  validate,
  userController.addUser
);

router.post(
  "/edit",
  [
    body("email")
      .notEmpty()
      .withMessage("This field is required")
      .isEmail()
      .withMessage("This field must be an email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
          _id: { $ne: mongoose.Types.ObjectId(req.body.id) },
        }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already taken! Please choose another one"
            );
          }
        });
      }),
  ],
  validate,
  userController.editUser
);

router.delete("/delete", userController.deleteUser);
router.post("/access", userController.access);

module.exports = router;
