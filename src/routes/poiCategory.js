const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const poiCategoryController = require("../controllers/poiCategory");
const validate = require("../utils/validator");

router.get("/list", poiCategoryController.getAll);

router.post(
  "/create",
  [
    body("name").notEmpty().withMessage('This field is required').trim().isLength({ min: 5 }),
    body("desc").trim().isLength({ min: 5 }),
    body("siteId").trim().isLength({ min: 5 }),
  ],
  validate,
  poiCategoryController.create
);

router.post(
  "/edit",
  [
    body("name").notEmpty().withMessage('This field is required').trim().isLength({ min: 5 }),
    body("name").trim().isLength({ min: 5 }),
    body("desc").trim().isLength({ min: 8 }),
  ],
  validate,
  poiCategoryController.edit
);

router.delete(
  "/delete",
  [body("id").trim().isLength({ min: 5 })],
  poiCategoryController.delete
);

module.exports = router;
