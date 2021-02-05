const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const gameController = require('../controllers/game');


router.get('/get', gameController.getResult);

module.exports = router;