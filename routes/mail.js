const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const mailController = require('../controllers/mail');


router.post('/send',  [
    body('email').trim().isLength({ min: 5 }),
], mailController.send);

module.exports = router;