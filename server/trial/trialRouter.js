'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
let driver = require('../config/neo4j');
var execProcess = require("./sample.js");
    let session = driver.session();

router.get('/submit/:currentScenarioName', function(req, res, next) {
  var scenarioName = req.params.currentScenarioName;
let result1;
    var scenarioName = req.params.currentScenarioName;
    let query1 = 'match(n:scenario {name:"'+scenarioName+'"}) return n';
    session.run(query1).then(function(result1) {
      // console.log(JSON.stringify(result1));
      let a = result1.records[0]._fields[0].properties.code;
      let aa = "sh "+a;
      console.log("aa ",aa);
               execProcess.result(aa , function(err, response){
                  console.log("inside execProcess ",aa);
                   if(!err){
                     console.log(response);
                    res.send("success");
                  }else {
                    console.log(err);
                   }
                });
          }, function(err) {
              console.log('error while connecting',err);
          });

});

router.get('/sprintOneDeploy', function(req, res, next) {
  let session1 = driver.session();
  execProcess.result("sh D:/Arun/DigiCare/DigiCare-BashFile/Sprint1.sh", function(err, response){
    if(!err){
      console.log(response);
      console.log('pusssssssshhhhhhhheeddd');
      session1.run('match (n:session) where n.name="session1" set n.pushed=[true,false,false,false] return n').then(function(result) {
        if(result){
          console.log('changed to true');
          res.send("changed to true");
        }
      });
    }else {
      console.log(err);
    }
  });

});

router.get('/sprintTwoDeploy', function(req, res, next) {
  let session1 = driver.session();
  execProcess.result("sh D:/Arun/DigiCare/DigiCare-BashFile/Sprint2.sh", function(err, response){
    if(!err){
      console.log(response);
      console.log('pusssssssshhhhhhhheeddd');
      session1.run('match (n:session) where n.name="session1" set n.pushed=[true,true,false,false] return n').then(function(result) {
        if(result){
          console.log('changed to true');
          res.send("changed to true");
        }
      });
    }else {
      console.log(err);
    }
  });

});

router.get('/sprintThreeDeploy', function(req, res, next) {
  let session1 = driver.session();
  execProcess.result("sh D:/Arun/DigiCare/DigiCare-BashFile/Sprint3.sh", function(err, response){
    if(!err){
      console.log(response);
      console.log('pusssssssshhhhhhhheeddd');
      session1.run('match (n:session) where n.name="session1" set n.pushed=[true,true,true,false] return n').then(function(result) {
        if(result){
          console.log('changed to true');
          res.send("changed to true");
        }
      });
    }else {
      console.log(err);
    }
  });

});

router.get('/sprintFourDeploy', function(req, res, next) {
  let session1 = driver.session();
  execProcess.result("sh D:/Arun/DigiCare/DigiCare-BashFile/Sprint4.sh", function(err, response){
    if(!err){
      console.log(response);
      console.log('pusssssssshhhhhhhheeddd');
      session1.run('match (n:session) where n.name="session1" set n.pushed=[true,true,true,true] return n').then(function(result) {
        if(result){
          console.log('changed to true');
          res.send("changed to true");
        }
      });
    }else {
      console.log(err);
    }
  });

});
module.exports = router;
