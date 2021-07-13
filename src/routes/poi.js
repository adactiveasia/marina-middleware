const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const poiController = require('../controllers/poi');
const validate = require("../utils/validator");

router.get('/list', [
], poiController.getAll);

router.post('/create', [
    body('name').isLength({ min: 5 }).notEmpty().withMessage('This field is required'),
    body('desc'),
    body('categoryId').notEmpty().withMessage('This field is required'),
    body('floor').notEmpty().withMessage('This field is required'),
    body('location').notEmpty().withMessage('This field is required'),
    body('logo'),
    body('logoUrl'),
    body('opentime').notEmpty().withMessage('This field is required'),
    body('phone').notEmpty().withMessage('This field is required'),
    body('priority').notEmpty().withMessage('This field is required'),
    body('siteId').notEmpty().withMessage('This field is required'),
    body('tag'),
    body('url').notEmpty().withMessage('This field is required')
], validate, poiController.create);

router.put('/edit', [
    body('name').isLength({ min: 5 }).notEmpty().withMessage('This field is required'),
    body('desc'),
    body('categoryId').notEmpty().withMessage('This field is required'),
    body('floor').notEmpty().withMessage('This field is required'),
    body('location').notEmpty().withMessage('This field is required'),
    body('logo'),
    body('logoUrl'),
    body('opentime').notEmpty().withMessage('This field is required'),
    body('phone').notEmpty().withMessage('This field is required'),
    body('priority').notEmpty().withMessage('This field is required'),
    body('siteId').notEmpty().withMessage('This field is required'),
    body('tag'),
    body('url').notEmpty().withMessage('This field is required'),
], validate, poiController.edit);

router.delete('/delete', [
    body('id').trim().isLength({ min: 5 }),
], poiController.delete);

module.exports = router;