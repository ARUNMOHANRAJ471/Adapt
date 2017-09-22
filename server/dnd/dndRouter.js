'use strict';
const router = require('express').Router();
const users = require('../users/userEntity');
const dndCtrl = require('./dndController');
router.put('/updateStatus', dndCtrl.updateStatus);
router.put('/updateComponentStatus', dndCtrl.updateComponentStatus);
router.put('/scoreState', dndCtrl.scoreState);
router.get('/getScenarioDetails/:seqId', dndCtrl.getScenarioDetails);
router.post('/getStatusInfo', dndCtrl.getStatusInfo);
router.put('/deleteStatus', dndCtrl.deleteStatus);
router.put('/completedScenarios', dndCtrl.completedScenarios);
router.post('/checkForPreConditions', dndCtrl.checkForPreConditions);
router.post('/getDashboardScenarioId', dndCtrl.getDashboardScenarioId);
router.post('/getPreconditionNames', dndCtrl.getPreconditionNames);
router.post('/getNewDependencies', dndCtrl.getNewDependencies);

module.exports = router;
