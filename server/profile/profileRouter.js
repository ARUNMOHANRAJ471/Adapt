let express = require('express');
let router = express.Router();
let multer = require('multer');
let profile = require('./profileController');
/*Router to view the user details from DB*/
//console.log("inside profile router");
router.post('/view', profile.viewProfile);
router.post('/changePassword', profile.changePassword);
router.post('/uploadImage', profile.changeProfilePicture);
router.post('/changeDescription', profile.changeDescription);
router.post('/getDetailsOfTeam',profile.getDetailsOfTeam);
router.post('/getDomain', profile.getDomain);
let imageArray = '';
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './webserver/pictures/')
  },
  filename: function (req, file, cb) {
    /*eslint-disable*/
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    /*eslint-enable*/
    imageArray = Date.now() + '-' + file.originalname;
    //let count=0;
    cb(null, imageArray);
  }
});
const upload = multer({ storage: storage });
router.post('/upload', upload.any('IMG'), function(req, res){
  let uploadedImages = imageArray;
  imageArray = '';
  res.send(uploadedImages);
});

module.exports = router;
