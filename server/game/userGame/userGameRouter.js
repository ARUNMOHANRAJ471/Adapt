let express = require('express');
let router = express.Router();
let userGame = require('./userGameController');

router.post('/loadThemes', userGame.loadThemes);
router.post('/saveTheme', userGame.saveTheme);
router.post('/loadStage', userGame.loadStage);
router.post('/getQuestions', userGame.getQuestions);
module.exports = router;
