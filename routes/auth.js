const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth');

router.post('/signup',  [
    body('email').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 8 }),
], authController.signup);

router.post('/signin',  [
    body('email').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 8 }),
], authController.signin);

module.exports = router;