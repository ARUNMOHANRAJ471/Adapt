'use strict';
const logger = require('./../../systemAppLogger');
const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
let session = driver.session();
var currentDomain = "";

var updateStatus = (req, res) => {
  let userId = req.body.userId;
  let scenarioId = req.body.scenarioId;
  let status = req.body.status;
  //console.log(userId);
  //console.log(scenarioId);
  //console.log(status);
  //console.log("-----------",req.body.clearStatus);
  //console.log("-----------",typeof req.body.clearStatus);
  if(req.body.clearStatus == "true"){
    logger.info("User - "+req.body.userName+" - click - clear sequence - "+req.body.scenarioName);
}
  users.findOneAndUpdate({
    'empId': userId,
    'statusInformation.scenarioId': req.body.scenarioId
  }, {
    $set: {
      'statusInformation.$.state': req.body.status
    }
  }, function(err) {
    res.send("success");
    //////console.log(err);
  });
};

var updateComponentStatus = (req, res) => {
  //console.log('updateComponentStatus',req.body.userId,req.body.scenarioId,req.body.componentState);
  logger.info(req.body.userType+" - "+ req.body.userName+" - update - components to left pane");
  let userId = req.body.userId;
  users.findOneAndUpdate({
    'empId': userId,
    'statusInformation.scenarioId': req.body.scenarioId
  }, {
    $set: {
      'statusInformation.$.componentState': req.body.componentState
    }
  }, function(err) {
    res.send("success");
    ////console.log(err);
  });
};

var scoreState = (req, res) => {

  let userId = req.body.userId;
  let scenarioId = req.body.scenarioId;
  let score = req.body.score;
  users.findOneAndUpdate({
    'empId': userId,
    'statusInformation.scenarioId': req.body.scenarioId
  }, {
    $set: {
      'statusInformation.$.score': req.body.score
    }
  }, function(err) {
    res.send("success");
    //console.log(err);
  });
};

var checkForPreConditions = (req, res) =>{
  //console.log("check for precondition ", req.body.preconditionData);
  //console.log("check for teamname ", req.body.teamName);
  let session = driver.session();
  let query;
  let a=JSON.stringify(req.body.preconditionData);
  //console.log("req.body.preconditionData ",typeof a);
  if(typeof req.body.preconditionData != 'string') {
     query = 'unwind  '+ a +' as id match (a:dashboardscenario) where a.name=id AND a.status="Completed" return a.name';
}
else{
 query = 'match (a:dashboardscenario) where a.name="'+req.body.preconditionData+'" AND a.status="Completed" return a.name';
}

  //console.log('query for checking preconditions ', query);
    session.run(query).then(function(result) {
      //console.log("success for precondition ",result);
          res.send(result);
          session.close();
     }).catch(function(error) {
       //console.log('promise error: ', error);
     });

};

var getScenarioDetails = (req, res) => {
  let query = "match (n:scenario) where id(n)=" + req.params.seqId + " return n;";
  session.run(query).then(function(result) {
    ////console.log(result.records);
    if (result) {
      res.send(result.records[0]._fields[0].properties);
      ////console.log('before result');
      // res.send(result.records[0]._fields[0]);
      ////console.log('after result');
    }
  }, function() {
    ////console.log('error while connecting',err);
  });
};

var getStatusInfo = (req, res) => {

  let userId = req.body.userId;
  let scenarioId = req.body.scenarioId;
  ////console.log(userId);
  ////console.log(scenarioId);
  users.find({
    'empId': userId,
    'statusInformation.scenarioId': req.body.scenarioId
  }, function(err, result) {
    if (err)
      throw err;

    ////console.log('**********',result);
    if (result[0].statusInformation.length != 0) {
      result[0].statusInformation.map((item) => {
        if (item.scenarioId == scenarioId) {
          res.send(item);
        }
      })
    }
  })
};

var deleteStatus = (req, res) => {
  let session = driver.session();
  logger.info(req.body.userType+"- User - "+req.body.userName+" - click - Exit Userstory - "+req.body.scenarioName);
  //console.log("IN exit scenario "+req.body.scenarioId+"userid  "+req.body.userId);
  let query = 'match (n:scenario) where id(n) = '+req.body.scenarioId+' return n.name';
  session.run(query).then(function(result) {
    //console.log("query ", result.records[0]._fields[0]);
    session.close();
    let query1 = 'match (n:loginid {name:"' + req.body.userId + '"})<-[:scenario]-(m:dashboardscenario) where m.scenarioId="' + req.body.scenarioId + '" detach delete m return n';
//console.log("query ",query1);
let sessionx = driver.session();
    sessionx.run(query1).then(function(result1) {
    //console.log('success in changing the status to completed!!!');
    sessionx.close();
  });
  });

  users.update({
    'loginId': req.body.userId
  }, {
    $pull: {
      "statusInformation": {
        scenarioId: req.body.scenarioId
      }
    }
  }, function(err) {
    ////console.log(err);
  });
  users.find({
    'loginId': req.body.userId
  }, function(err, docs) {
    if (err)
      throw err;
    docs[0].currentScenario = "";
    docs[0].currentScenarioName = "";
    docs[0].currentDomain = ""

    docs[0].save(function(err) {
      if (err)
        throw err;

      //console.log('User successfully updated!!!!');
    });
  });
};

var completedScenarios = (req, res) => {
  ////console.log("IN completedScenarios controller"+req.body.userId+"---------"+req.body.scenarioId);
  var aq = new Date().getTime();
  let query = 'match(n:loginid{name:"' + req.body.loginId + '"})<-[:scenario]-(a:dashboardscenario) where id(a)=' + req.body.preconditionData + ' SET a.status="Completed", a.completedAt="' + aq + '" return a';
  //console.log('query for setting completed ', query);
  session.run(query).then(function(result) {
    // res.send(result);
    //console.log('success in changing the status to completed!!!');
  });
  users.update({
    'empId': req.body.userId
  }, {
    $pull: {
      "statusInformation": {
        scenarioId: req.body.scenarioId
      }
    }
  }, function(err) {
    ////console.log(err);
  });

  // make current scenario to empty
  users.findOneAndUpdate({
    'empId': req.body.userId
  }, {
    $set: {
      'currentScenario': ""
    }
  }, function(err) {
    //  res.send("success");
    ////console.log(err);
  });

  // update completed scenario based on avalability in mongo
  users.find({
    'empId': req.body.userId
  }, function(err, docs) {
    // res.sends(docs[0].currentDomain)
    if (err)
      throw err;
    currentDomain = docs[0].currentDomain;
    //console.log('cd', currentDomain);
    if (docs[0].completedScenario.length != 0) {
      var ind = 0;
      var b = false;
      docs[0].completedScenario.map((item, index) => {
        if (item.domainName == currentDomain) {
          ind = index;
          res.send(item.scenarioIds);
          b = true;
          // item.scenarioIds.push(req.body.scenarioId);
        }
      });
      if (b) {
        docs[0].completedScenario[ind].scenarioIds.push({id: req.body.scenarioId, name: req.body.scenarioName, maxScore: req.body.maxScore, actualScore: req.body.actualScore});
        docs[0].save(function(err) {
          if (err)
            throw err;

          //console.log('User successfully updated!!!!');
        });
      } else {
        // pushing new scenario id object with domain name in completed scenario
        users.findOneAndUpdate({
          'empId': req.body.userId
        }, {
          $push: {
            completedScenario: {
              domainName: currentDomain,
              scenarioIds: {
                id: req.body.scenarioId,
                name: req.body.scenarioName,
                maxScore: req.body.maxScore,
                actualScore: req.body.actualScore
              }
            }
          }
        }, {new: true}).then(() => {
          res.send("success");
        }, (error2) => {
          res.send(error2);
        });
      }
    } else {
      users.findOneAndUpdate({
        'empId': req.body.userId
      }, {
        $push: {
          completedScenario: {
            domainName: currentDomain,
            scenarioIds: {
              id: req.body.scenarioId,
              name: req.body.scenarioName,
              maxScore: req.body.maxScore,
              actualScore: req.body.actualScore
            }
          }
        }
      }, {new: true}).then(() => {
        res.send("success");
      }, (error2) => {
        res.send(error2);
      });
    }
  });

}

var getDashboardScenarioId = (req, res) => {
  //console.log(req.body);
  let query = 'match (n:dashboardscenario)-[r:scenario]->(a:loginid{name:"' + req.body.loginId + '"}) where n.scenarioId="' + req.body.actualId + '" return n';
  //console.log('query for getting dashboard scenario id: ', query);
  session.run(query).then(function(result) {
    //console.log(result.records);
    if (result) {
      res.send(result.records[0]._fields[0].identity);
    }
  }, function() {
    ////console.log('error while connecting',err);
  });
};
var getPreconditionNames = (req, res) => {
  //console.log("req.body.preconditionData ",req.body.preconditionData);
  let query;
  let result1=[];
  let a=JSON.stringify(req.body.preconditionData);
  //console.log("req.body.preconditionData ",typeof a);
  if(typeof req.body.preconditionData != 'string') {
     query = 'unwind  '+ a +' as id match (n:scenario) where n.name=id return n';
}
else{
 query = 'match (n:scenario) where n.name="'+req.body.preconditionData+'" return n';
}
  //console.log('query for getting precondition names: ',query);
  session.run(query).then(function(result) {
            //console.log("precondition name result ",JSON.stringify(result));
            if (result) {
              result.records.map(function(item){
                result1.push(item._fields[0]);
              })
              //console.log(result1 ," result array");
                res.send(result1);
            }
        }, function() {
            ////console.log('error while connecting',err);
        });
};

var getNewDependencies = (req, res) => {
  let query = 'match (n:scenario) where id(n)='+req.body.scenarioId+' return n.dependency;';
  // console.log(query);
  session.run(query).then(function(result) {
    res.send(result.records[0]._fields[0]);
  });
};

module.exports = {
  updateStatus,
  updateComponentStatus,
  deleteStatus,
  completedScenarios,
  getScenarioDetails,
  getStatusInfo,
  scoreState,
  checkForPreConditions,
  getDashboardScenarioId,
  getPreconditionNames,
  getNewDependencies
};
