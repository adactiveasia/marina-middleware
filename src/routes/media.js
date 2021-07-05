const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const mediaController = require("../controllers/media");
const validate = require("../utils/validator");

router.get("/list", [], mediaController.getAll);

router.post(
  "/create",
  [body("name").notEmpty().withMessage("This field is required")],
  validate,
  mediaController.create
);

router.post(
  "/edit",
  [body("name").notEmpty().withMessage("This field is required")],
  validate,
  mediaController.edit
);

router.delete(
  "/delete",
  [body("id").trim().isLength({ min: 5 })],
  mediaController.delete
);

router.get("/get", mediaController.get);
router.get("/calendar", mediaController.calendar);

module.exports = router;
