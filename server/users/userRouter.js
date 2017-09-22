'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const {user} = require('./userEntity');
const userCtrl = require('./userController');
router.post('/login',userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/findDomain', userCtrl.findDomain);
router.post('/findDomainDescription',userCtrl.findDomainDescription);
router.post('/findScenarios',userCtrl.findScenarios);
router.post('/findScenarioData',userCtrl.findScenarioData);
router.post('/updateScenario',userCtrl.updateScenario);
router.post('/currentDomain',userCtrl.currentDomain);
router.put('/currentScenario',userCtrl.currentScenario);
router.post('/findCompletedScenarios',userCtrl.findCompletedScenarios);
router.post('/updateScore',userCtrl.updateScore);
router.post('/updateTeamScore',userCtrl.updateTeamScore);
router.post('/log',userCtrl.log);
router.get('/allScenariosLength/:domainName', userCtrl.allScenariosLength);
router.post('/completedScenarioslength', userCtrl.completedScenarioslength);
router.post('/completedDomain', userCtrl.completedDomain);
router.get('/getAllSprints', userCtrl.getAllSprints);
router.get('/getSprintDetails',userCtrl.getSprintDetails);
router.post('/getTeamScore',userCtrl.getTeamScore);


module.exports = router;
