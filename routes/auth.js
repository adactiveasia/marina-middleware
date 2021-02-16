const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const validate = require("../utils/validator");

router.post(
  "/signup",
  [
    body("email").trim().isLength({ min: 5 }).notEmpty(),
    body("password").trim().isLength({ min: 8 }).notEmpty(),
  ],
  validate,
  authController.signup
);

router.post(
  "/signin",
  [
    body("email")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Minimal length is 5")
      .notEmpty()
      .withMessage("This field is required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimal length is 8")
      .notEmpty()
      .withMessage("This field is required"),
  ],
  validate,
  authController.signin
);

router.put('/change',  [
    body('password').trim().isLength({ min: 8 }),
], authController.changePassword);

module.exports = router;
