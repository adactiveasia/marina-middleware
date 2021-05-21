const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const categoryController = require("../controllers/category");
const validate = require("../utils/validator");

router.get("/", categoryController.listAllCategories);
router.post("/get", categoryController.getCategory);
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("This field is required"),
    body("siteId").notEmpty().withMessage("This field is required"),
  ],
  validate,
  categoryController.addCategory
);

router.post(
  "/edit",
  [
    body("id").notEmpty().withMessage("This field is required"),
    body("name").notEmpty().withMessage("This field is required"),
    body("siteId").notEmpty().withMessage("This field is required"),
  ],
  validate,
  categoryController.editCategory
);

router.delete("/delete", categoryController.deleteCategory);

module.exports = router;
