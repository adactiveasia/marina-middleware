const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map');
const { body } = require('express-validator');
const validate = require('../utils/validator');

router.get('/', mapController.listAllMaps);
router.get('/get', mapController.getMap);
router.post(
  '/create',
  [
    body('name').notEmpty().withMessage('This field is required'),
    body('file').notEmpty().withMessage('This field is required'),
  ],
  validate,
  mapController.addMap
);

router.post(
  '/edit',
  [
    body('name').notEmpty().withMessage('This field is required'),
    body('file').notEmpty().withMessage('This field is required'),
  ],
  validate,
  mapController.editMap
);

router.delete('/delete', mapController.deleteMap);

module.exports = router;
