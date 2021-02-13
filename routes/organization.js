const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const organizationController = require("../controllers/organization");

router.get("/", organizationController.getAllOrganizations);
router.post(
  "/create",
  [
    body("name").trim().isLength({ min: 5 }),
    body("desc").trim().isLength({ min: 5 }),
  ],
  organizationController.create
);

router.post(
  "/signin",
  [
    body("email").trim().isLength({ min: 5 }),
    body("password").trim().isLength({ min: 8 }),
  ],
  organizationController.signin
);

module.exports = router;
