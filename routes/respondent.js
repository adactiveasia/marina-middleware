const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const respondentController = require("../controllers/respondent");

router.post(
  "/create",
  [
    body("feedbackId").notEmpty().withMessage("This field is required"),
    body("star").notEmpty().withMessage("This field is required"),
  ],
  respondentController.create
);
router.get("/get", respondentController.get);

module.exports = router;
