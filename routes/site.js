const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const sitesController = require("../controllers/site");
const validate = require("../utils/validator");

router.get("/", sitesController.listAllSites);
router.post("/get", sitesController.getSite);
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("This field is required"),
    body("organizationId").notEmpty().withMessage("This field is required"),
  ],
  validate,
  sitesController.addSite
);

router.post(
  "/:id",
  [
    body("name").notEmpty().withMessage("This field is required"),
    body("organizationId").notEmpty().withMessage("This field is required"),
  ],
  validate,
  sitesController.editSite
);

router.delete("/delete", sitesController.deleteSite);

module.exports = router;
