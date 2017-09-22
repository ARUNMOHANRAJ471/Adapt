'use strict';
const router = require('express').Router();
const logger = require('./../../applogger');

const ComponentCtrl = require('./componentController');
router.get('/category', ComponentCtrl.category);
router.get('/categoryAdmin', ComponentCtrl.categoryAdmin);
router.post('/getComponents', ComponentCtrl.getComponents);
router.get('/getComponentById/:id', ComponentCtrl.getComponentById);
module.exports = router;
