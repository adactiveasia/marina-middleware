const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const organizationController = require("../controllers/organization");
const validate = require("../utils/validator");

router.get("/", organizationController.listAllOrganizations);
router.post("/get", organizationController.getOrganization);
router.post(
  "/create",
  [body("name").notEmpty().withMessage("This field is required")],
  validate,
  organizationController.addOrganization
);

router.post(
  "/:id",
  [body("name").notEmpty().withMessage("This field is required")],
  validate,
  organizationController.editOrganization
);

router.delete("/delete", organizationController.deleteOrganization);

module.exports = router;
