'use strict';
const logger = require('./../../systemAppLogger');
const {users} = require('./userEntity');
let driver = require('../config/neo4j');
let session = driver.session();
var loggerq = require('logger').createLogger('accounts.log');
var loggerw = require('logger').createLogger('engineeringServices.log');
var login = (req, res) => {
//console.log('inside login controller');
  //console.log(req.body);
  let username = req.body.username;
  let passwd = req.body.password;
  users.findOne({loginId: username}).then((docs) => {
    //console.log(JSON.stringify(docs));
    if (docs != null) {
      if (docs.password == passwd) {
        //console.log(docs.password + "    " +passwd);
        res.send(docs);
      } else {
        res.send("password_mismatch");
      }
    } else {
      res.send("invalid_data");
    }
  }, (err) => {
    //console.log(err);
    res.send("invalid_data");
  });
};

var logout = (req, res) => {
//console.log('Session deleted');
  req.session.destroy();
  res.send({redirect: '/'});
}

var findDomain = (req, res) => {
  var result1 = [];
  let session = driver.session();
  let query = 'match(n:domain) return n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      //console.log(x._fields[0]);
      result1.push({
        "name": (x._fields[0].properties.name),
        "description": (x._fields[0].properties.description),
        "flag": (x._fields[0].properties.flag)
      });
    }
    res.send(result1);
  }).catch(function(error) {
    //console.log('promise error: ', error);
  });
};
var findDomainDescription = (req, res) => {
  var result1 = [];
  var results = [];
  var domainName = req.body.domain;
  // logger.info(" - " + req.body.userType + " - " + req.body.userName + " select - domain - " + domainName);
  let query1 = 'match (n:domain {name: "' + domainName + '"}) return n';
  session.run(query1).then(function(result1) {
    for (var x of result1.records) {
      results.push({
        "domainDescription": (x._fields[0].properties.description),
        "video": (x._fields[0].properties.video)
      });
    }
    res.send(results);
  });
}
var findScenarios = (req, res) => {
  var result1 = [];
  var incompletearr = [];
  var completedarr = [];
  var domainDescription = '';
  var scenario = [];
  var video = '';
  var domainName = req.body.domain;
  let session = driver.session();
  var empId = req.body.empId;
  var teamName = '';
  var incompletename = [];
  var completename = [];
  var incompletelogid = [];
  var completelogid = [];
var incomplete = [];
var complete =[];
  // let query1 = 'match (n:team {name:"Kamet"})<-[]-()<-[]-(m:dashboardscenario) return m.name,m.status,m.domain';

  if (domainName == 'unlinked_scenarios') {
    let query = 'MATCH (n:scenario) WHERE not( (n:scenario)-[]-() ) return  n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        //console.log("---------------"+JSON.stringify(x));
        result1.push({
          "scenarioId": (x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription": (x._fields[0].properties.problemstatement)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });
  } else {
    users.find({
      'empId': empId
    }, function(err, docs1) {
      //console.log("aa",docs1[0].teamName);
      teamName = docs1[0].teamName;
      let query = 'match (n:domain {name: "' + domainName + '"})<-[:scenario_of]-(m:scenario) return m ORDER BY m';
      let query1 = 'match (n:dashboardscenario{status:"In progress",domain:"' + domainName + '"}) RETURN distinct n';
      let query2 = 'match (n:dashboardscenario{status:"Completed",domain:"' + domainName + '"}) RETURN distinct n';
      let session = driver.session();
      session.run(query1).then(function(result) {
        var i1 = 0,
          i2 = 0;
          for (var i = 0; i < result.records.length; i++) {
            incomplete[i] = result.records[i]._fields[0].properties.scenarioId;
          incompletearr.push({
            "name":result.records[i]._fields[0].properties.scenarioId,
            "loginId": result.records[i]._fields[0].properties.loginid,
            "username": result.records[i]._fields[0].properties.username
          });
          }
        session.close();
        let sessionx = driver.session();
        sessionx.run(query2).then(function(result) {
          var j = 0,
            j1 = 0,
            j2 = 0;

            for (var i = 0; i < result.records.length; i++) {
              complete[i] = result.records[i]._fields[0].properties.scenarioId;
              completedarr.push({
                "name1":result.records[i]._fields[0].properties.scenarioId,
                "loginId1": result.records[i]._fields[0].properties.loginid,
                "username1": result.records[i]._fields[0].properties.username
              });

          }
          // for (var x of result.records) {
          //   //console.log("completed ", x._fields[0]);
          //   completedarr[j++] = x._fields[0];
          //   completename[j1++] = x._fields[1];
          //   completelogid[j2++] = x._fields[2];
          // }
          sessionx.close();

          let sessiony = driver.session();
          sessiony.run(query).then(function(result) {
      //console.log("in ajax ");
            var k1 = 0,
              k2 = 0,
              k3 = 0;
            for (var x of result.records) {
              if (incomplete.includes(x._fields[0].identity.low.toString())) {
                for (var i = 0; i < incompletearr.length; i++) {
                  if (incompletearr[i].name == x._fields[0].identity.low.toString()) {
                    if (!result1.includes(x._fields[0].identity.low.toString())) {
                result1.push({
                  "scenarioId": (x._fields[0].identity.low),
                  "scenarioName": (x._fields[0].properties.name),
                  "scenarioDescription": (x._fields[0].properties.problemstatement),
                  "sequence": (x._fields[0].properties.sequence),
                  "video": (x._fields[0].properties.video),
                  "status": "wip",
                  "name": (incompletearr[i].username),
                  "loginid": (incompletearr[i].loginId)
                });
              }
                k1++;
                }
              }  }

               else if (complete.includes(x._fields[0].identity.low.toString())) {

                for (var i = 0; i < completedarr.length; i++) {
                  if (completedarr[i].name1 == x._fields[0].identity.low.toString()) {
                    if (!result1.includes(x._fields[0].identity.low.toString())) {
                result1.push({
                  "scenarioId": (x._fields[0].identity.low),
                  "scenarioName": (x._fields[0].properties.name),
                  "scenarioDescription": (x._fields[0].properties.problemstatement),
                  "sequence": (x._fields[0].properties.sequence),
                  "video": (x._fields[0].properties.video),
                  "status": "Completed",
                  "name": (completedarr[i].username1),
                  "loginid": (completedarr[i].loginId1)
                });
              }
                k2++;
              } }  } else {
                result1.push({
                  "scenarioId": (x._fields[0].identity.low),
                  "scenarioName": (x._fields[0].properties.name),
                  "scenarioDescription": (x._fields[0].properties.problemstatement),
                  "sequence": (x._fields[0].properties.sequence),
                  "video": (x._fields[0].properties.video),
                  "status": "notstarted",
                  "name": "none",
                  "loginid": "none"
                });
              }

            }
            res.send(result1);
            sessiony.close();
          }).catch(function(error) {
            //console.log('promise error: ', error);
          });

        }).catch(function(error) {});
      }).catch(function(error) {
        //////console.log('promise error: ', error);
      });

    });
  }
};
var currentDomain = (req, res) => {
  var empId = req.body.empId;
  users.update({
    'empId': empId
  }, {
    '$set': {
      'currentDomain': req.body.domainName
    }
  }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: 'User updated successfully'});
    }
  });
}
var currentScenario = (req, res) => {
  //console.log('inside dashboard scenario creation: ', req.body);
  logger.info(req.body.userType + " - " + req.body.userName + " - select - userstory - " + req.body.scenarioName);
  var empId = req.body.empId;
  var scenarioId = req.body.scenarioId;
  var scenarioName = req.body.scenarioName;
  var loginId = req.body.loginId;
  var currentDomain = req.body.domainName;
  var userName = req.body.userName;
  users.update({
    'empId': empId
  }, {
    '$set': {
      'currentScenario': scenarioId,
      'currentScenarioName': scenarioName
    }
  }, function(err) {});
  users.find({
    'empId': empId,
    'statusInformation.scenarioId': scenarioId
  }, function(err, docs) {
    if (docs.length == 0) {

      users.find({
        'empId': empId
      }, function(err, docs1) {
        ////console.log("....."+docs1[0].teamName);

        ////console.log("----------------"+JSON.stringify(docs1));
        let query = 'match (n:team{name:"' + docs1[0].teamName + '"})<-[az:user_of]-(m:loginid{name:"' + loginId + '"}) create (m)<-[w:scenario]-(r:dashboardscenario{scenarioId:"' + scenarioId + '",name:"' + scenarioName + '",loginid:"' + docs1[0].loginId + '",username:"' + docs1[0].userName + '",completedAt:"",domain:"' + currentDomain + '",status:"In progress"}) return r';
        ////console.log('query check for creating a new scenario node :',query);
        session.run(query).then(function(result) {
          ////console.log('inside scenario new add',JSON.stringify(result));
        });
      });
      //////console.log("not found");
      users.findOneAndUpdate({
        'empId': empId
      }, {
        $push: {
          statusInformation: {
            scenarioId: scenarioId,
            state: "",
            status: "In progress",
            scenarioName: scenarioName
          }
        }
      }, {new: true}).then(() => {
        res.send("success");
      }, (error2) => {
        res.send(error2);
      });
    } else {
      ////console.log('inside else');
      docs[0].statusInformation.map(function(item) {
        if (item.scenarioId == scenarioId) {
          res.send(item.state);
        }
      })
    }
  });
}

var findScenarioData = (req, res) => {
  var scenario = req.body.scenario;
  let session = driver.session();
  let query = 'MATCH (n:scenario) where n.name="' + scenario + '" return  n';
  session.run(query).then(function(result) {
    var scenarioData = result.records[0]._fields[0].properties;
    //////console.log(JSON.stringify(scenarioData));
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};

var updateScenario = (req, res) => {
  var updatedData = req.body;
  let session = driver.session();
  // console.log("update ",updatedData.precondition);
  let query = 'match (n:scenario) where id(n)=' + updatedData.scenarioId + ' set n.output="' + updatedData.output + '",n.problemstatement="' + updatedData.probStmt + '",n.code="' + updatedData.code + '",n.name="' + updatedData.name + '",n.evalfun="' + updatedData.evalfun + '",n.score=' + updatedData.score + ',n.negativescore=' + updatedData.negativescore + ',n.video="' + updatedData.video + '",n.dependency=' + updatedData.givenpreconditions + ',n.precondition=' + updatedData.precondition + ' return n ';
// console.log(query, " in update scenario");
  session.run(query).then(function(result) {
    ////console.log("success after update");
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var findCompletedScenarios = (req, res) => {
  var empId = req.body.empId;
  users.findOne({empId: empId}).then((docs) => {
    res.send(docs);
  });
}

var updateScore = (req, res) => {
  logger.info(req.body.userType + " - " + req.body.userName + " - compile - " + req.body.currentScenarioName + " - " + req.body.status);
  if (req.body.status == 'success') {
    logger.info("- " + req.body.userType + " - " + req.body.userName + " - CheckIn - " + req.body.currentScenarioName + " - " + req.body.status);
  }
  var empId = req.body.empId;
  users.update({
    'empId': empId
  }, {
    '$set': {
      'score': req.body.score
    }
  }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: 'score updated successfully'});
    }
  });
  let query = "MATCH (n:loginid{name:'" + req.body.loginId + "'}) set n.score=" + req.body.score;
  ////console.log('query for updating score in login Id: ',query);
  session.run(query).then(function(result) {
    ////console.log('after result', result);
  }).catch(function(err) {
    //////console.log('error while connecting',err);
  });

};

var allScenariosLength = (req, res) => {
  //////console.log("Inside all scenarios length function", req.params.domainName);
  let query = "MATCH (n:domain)<-[r:scenario_of]-(m:scenario) where n.name='" + req.params.domainName + "' RETURN count(m);";
  session.run(query).then(function(result) {
    //////console.log(result.records[0]._fields[0].low);
    var xx = result.records[0]._fields[0].low;
    //////console.log(typeof xx);
    res.send(xx.toString());
    //////console.log('before result');
    // res.send(result.records[0]._fields[0]);
    //////console.log('after result');
  }).catch(function(err) {
    //////console.log('error while connecting',err);
  });
};

var completedScenarioslength = (req, res) => {
  users.find({'empId': req.body.empId, 'completedScenario.domainName': req.body.domainName}).then((docs) => {
    res.send(docs[0].completedScenario[0].scenarioIds.length.toString());
  });
}

var completedDomain = (req, res) => {
  users.find({
    'empId': req.body.userId
  }, function(err, docs) {
    if (err)
      throw err;

    // res.send(docs);
    docs[0].completedDomain.push(req.body.domainName);
    docs[0].currentDomain = "";
    docs[0].currentScenarioName = "";
    docs[0].save(function(err) {
      if (err)
        throw err;

      //////console.log('User successfully updated!!!!');
      res.send(docs);
    });
  });
}

var getAllSprints = (req, res) => {
  //console.log("getall sprint");
  // let session = driver.session();
  var sprint1=["1135","1368","1287","1136","1369","1123","1138","1370","1126","1137","1371","1391"];
  // var sprint1=["1135"];
  var sprint2=["1134","1132","1133","1124","1302","1375","1129","1130","1218","1127","1219","1283","1282"];
  // var sprint2=["1134"];
  var sprint3=["1284","1295","1345","1213","1214","1342","1249","1128","1217","1281","1333","1334"];
  var sprint4=["1263","1343","1372","1353","1296","1341","1291","1312","1131","1387","1399"];
  let a=JSON.stringify(req.body.preconditionData);

  let query1 = 'unwind  '+JSON.stringify(sprint1)+' as id match (a:dashboardscenario) where a.scenarioId=id AND a.status="Completed" return a.name';
//console.log('query1 ',query1);
  let query2 = 'unwind  '+JSON.stringify(sprint2)+' as id match (a:dashboardscenario) where a.scenarioId=id AND a.status="Completed" return a.name';
// console.log('query2 ',query2);
let query3 = 'unwind  '+JSON.stringify(sprint3)+' as id match (a:dashboardscenario) where a.scenarioId=id AND a.status="Completed" return a.name';
  let query4 = 'unwind  '+JSON.stringify(sprint4)+' as id match (a:dashboardscenario) where a.scenarioId=id AND a.status="Completed" return a.name';
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
  let arr4 = [];
  let arr = [];
//console.log("bbbbb ");
let sessionk = driver.session();
  sessionk.run(query1).then(function(result) {
    //console.log('result',result);
    result.records.map((item)=>{
      //console.log("item",item);
    arr1.push(item._fields[0]);
  });
arr.push(arr1);
//console.log("111",arr1);
  let sessionx = driver.session();
    sessionx.run(query2).then(function(result1) {
      result1.records.map((item)=>{

      arr2.push(item._fields[0]);
    });
    //console.log("array2 ",arr2);
arr.push(arr2);
// console.log("111",arr1," ",arr);
    let sessiony = driver.session();
      sessiony.run(query3).then(function(result2) {
        result2.records.map((item)=>{
        arr3.push(item._fields[0]);
      });
  arr.push(arr3);
      let sessionz = driver.session();
        sessionz.run(query4).then(function(result3) {
          result3.records.map((item)=>{
          arr4.push(item._fields[0]);
        });
  arr.push(arr4);
  //console.log("arr",arr);

res.send(arr);
        }).catch(function () {
           //console.log("Promise Rejectedz");
      });
      // sessionz.close();
      }).catch(function () {
         //console.log("Promise Rejectedy");
    });
    // sessiony.close();
    }).catch(function () {
       //console.log("Promise Rejectedx");
  });
  // sessionx.close();
  }).catch(function (err) {
     //console.log("Promise Rejectedk",err);
});
// sessionk.close();


}

var getSprintDetails = (req, res) => {
  //console.log("in getsprint");
  let query='match (n:session) where n.name="session1" return n';
    let session = driver.session();
    session.run(query).then(function(result) {
      //console.log("aaa",result.records[0]);
      res.send(result);
    });
}

var getTeamScore = (req, res) => {
  //console.log("in getTeamScore");
  let query='match (n:team) where n.name="'+req.body.teamName+'" return n.score';
    let session = driver.session();
    session.run(query).then(function(result) {
      //console.log("aaa",result);
      res.send(result);
    });
}

var updateTeamScore = (req, res) => {
  loggerq.info(req.body.teamName+' - '+req.body.user+' - '+req.body.penalityScore);
  //console.log("in updateTeamScore");
  let query = "MATCH (n:team{name:'" + req.body.teamName + "'}) set n.score=" + req.body.teamScore;
    let session = driver.session();
    session.run(query).then(function(result) {
      //console.log("aaa",result);
      res.send(result);
    });
}

var log = (req, res) => {
  loggerw.info(req.body.teamName+' - '+req.body.service+' - '+req.body.points);
  //console.log("in log",req.body);
  res.send('success');
}


module.exports = {
  login,
  logout,
  findDomain,
  findDomainDescription,
  findScenarios,
  findScenarioData,
  updateScenario,
  currentDomain,
  currentScenario,
  findCompletedScenarios,
  updateScore,
  allScenariosLength,
  completedScenarioslength,
  completedDomain,
  getAllSprints,
  getSprintDetails,
  getTeamScore,
  updateTeamScore,
  log
};
