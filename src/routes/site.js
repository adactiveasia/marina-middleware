const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const sitesController = require('../controllers/site');

router.post('/create',  [
    body('name').trim().isLength({ min: 5 }),
], sitesController.create);

router.post('/signin',  [
    body('email').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 8 }),
], sitesController.signin);

module.exports = router;