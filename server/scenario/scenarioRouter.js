var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var scenario = require('./scenarioController');

router.post('/deleteScenario',scenario.deleteScenario);

module.exports = router;
