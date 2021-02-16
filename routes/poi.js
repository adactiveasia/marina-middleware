const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const poiController = require('../controllers/poi');

router.get('/list',  [
], poiController.getAll);

router.post('/create',  [
    body('name').trim().isLength({ min: 5 }),
    body('desc').trim(),
    body('category').trim(),
    body('floor').trim(),
    body('location').trim(),
    body('logo').trim(),
    body('logoUrl').trim(),
    body('opentime').trim(),
    body('phone').trim(),
    body('priority').trim(),
    body('siteId').trim(),
    body('tag').trim(),
    body('url').trim(),
], poiController.create);

router.put('/edit',  [
    body('id').trim().isLength({ min: 5 }),
    body('name').trim().isLength({ min: 5 }),
    body('desc').trim().isLength({ min: 8 }),
], poiController.edit);

router.delete('/delete',  [
    body('id').trim().isLength({ min: 5 }),
], poiController.delete);

module.exports = router;