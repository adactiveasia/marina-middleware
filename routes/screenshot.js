const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const screenshotController = require('../controllers/screenshot');
const validate = require('../utils/validator');

router.get('/list', [], screenshotController.getAll);

router.post(
  '/create',
  [body('image').notEmpty().withMessage('This field is required')],
  validate,
  screenshotController.create
);

router.delete(
  '/delete',
  [body('id').trim().isLength({ min: 5 })],
  screenshotController.delete
);

router.get('/get', screenshotController.get);

module.exports = router;
