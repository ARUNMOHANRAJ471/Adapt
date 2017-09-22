var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var component = require('./componentController');
router.get('/getComponentsAll',component.getComponentsAll);
router.get('/getAllComponents',component.getComponents);
router.post('/addNewScenario',component.addNewScenario);
router.post('/addSequence',component.addSequence);
router.post('/updateSequence',component.updateSequence);
router.post('/deleteSequence',component.deleteSequence);
router.get('/getAllScenarios',component.getAllScenarios);

module.exports = router;
