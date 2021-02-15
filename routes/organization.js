const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const organizationController = require('../controllers/organization');

router.get('/list',  [
], organizationController.list);

router.post('/create',  [
    body('name').trim().isLength({ min: 5 }),
    body('desc').trim().isLength({ min: 5 }),
], organizationController.create);

router.post('/edit',  [
    body('name').trim().isLength({ min: 5 }),
    body('desc').trim().isLength({ min: 8 }),
], organizationController.edit);

router.post('/delete',  [
    body('id').trim().isLength({ min: 5 }),
], organizationController.delete);

module.exports = router;