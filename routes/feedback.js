const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const feedbackController = require("../controllers/feedback");
const validate = require("../utils/validator");

router.get("/list", [], feedbackController.getAll);

router.post(
  "/create",
  [
    body("question").notEmpty().withMessage("This field is required"),
    body("start").notEmpty().withMessage("This field is required"),
    body("end").notEmpty().withMessage("This field is required"),
  ],
  validate,
  feedbackController.create
);

router.post(
  "/edit",
  [
    body("question").notEmpty().withMessage("This field is required"),
    body("start").notEmpty().withMessage("This field is required"),
    body("end").notEmpty().withMessage("This field is required"),
  ],
  validate,
  feedbackController.edit
);

router.delete(
  "/delete",
  [body("id").trim().isLength({ min: 5 })],
  feedbackController.delete
);

router.get("/get", feedbackController.get);

module.exports = router;
