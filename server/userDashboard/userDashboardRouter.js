let express = require('express');
let router = express.Router();
let dashboard = require('./userDashboardController');
console.log("inside user dashboard router");
router.post('/userDashboardTotalScenario', dashboard.userDashboardTotalScenario);
router.post('/userDashboardCompletedScenario', dashboard.userDashboardCompletedScenario);
router.get('/teamScores', dashboard.teamScores);
router.post('/userDashboardScenarioStatus', dashboard.userDashboardScenarioStatus);
router.post('/teamProgress', dashboard.teamProgress);
router.post('/totalDomain', dashboard.totalDomain);
router.post('/getTeamScores', dashboard.getTeamScores);
router.post('/getTeamSc', dashboard.getTeamSc);

module.exports = router;
