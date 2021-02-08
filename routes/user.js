const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user");

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

router.get("/", [userController.listAllUsers]);
router.post("/", [userController.addUser]);

module.exports = router;
