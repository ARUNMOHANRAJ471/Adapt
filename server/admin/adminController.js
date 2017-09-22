'use strict';
const logger = require('./../../applogger');
const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
let session = driver.session();

var addUser=(req, res) => {
  let newUser = new users();
  //////console.log('in adduser'+JSON.stringify(req.body));
  if(req.body.usertype == 'Admin'){
    newUser.empId = req.body.employeeid;
    newUser.userName = req.body.name;
    newUser.emailId = req.body.email;
    newUser.userType = req.body.usertype;
    newUser.loginId = req.body.loginId;
    newUser.teamName = "Admin Team";
    newUser.save(function(err) {
      if (err) {
        //////console.log(err);
        return res.send('Error in registration');
      } else {
        return res.send('Successfully registered');
      }
    });

  } else{
    //////console.log('admin skipped');
    newUser.empId = req.body.employeeid;
    newUser.userName = req.body.name;
    newUser.emailId = req.body.email;
    newUser.userType = req.body.usertype;
    newUser.teamName = req.body.teamname;
    newUser.loginId = req.body.loginId;
    newUser.save(function(err) {
      if (err) {
        //////console.log(err);
        return res.send('Error in registration');
      } else {
        let session = driver.session();
        let query =  'merge (n:team{name:"'+newUser.teamName+'"})<-[:user_of]-(a:loginid{name:"'+newUser.loginId+'",username:"'+newUser.userName+'"}) return n';
        session.run(query).then(function(result) {
          ////console.log("success", result);
          return res.send('Successfully registered');
        }).catch(function(error) {
          ////console.log('promise error: ', error);
        });

      }
    });
  }
}
var getUsers=(req, res) => {
  users.find(
    function(err, alldetails) {
      if (err) {
        //////console.log(err);
      } else {
        //////console.log('databaseee'+alldetails);
      }
      res.send(alldetails);  });
    }
    //  @Mayanka : Adding a new customer journey
    var addNewDomain = (req, res) => {
      let session = driver.session();
      let name = req.body.domainName;
      let description = req.body.domainDescription;
      let video = req.body.video;
      let query = 'CREATE (n:domain{name: "'+name+'",description: "'+description+'",video: "'+video+'",flag:1})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
      });
    };

    var getusertype=(req, res) => {
      let loginid = req.body.loginid;
      //console.log("login in getusertype",loginid);
      users.findOne({loginId: loginid}).then((docs) => {
        if (docs != null) {
          //console.log(docs.userType + "    " +docs);
          res.send(docs);
        } else {
          res.send("invalid_data");
        }
      }, (err) => {
        ////console.log(err);
        res.send("invalid_data");
      });
    }

    var deleteUser=(req, res) => {
      let empid = req.body.empid;
      users.remove({
        'empId': empid
      },
      function(err) {
        if (err) {
          //////console.log(err);
        } else {
          //////console.log('done');
        }
        res.send('done');
      });
    }

    var masterReset=(req, res) => {
      users.remove({
        'userType': "Pair"
      },
      function(err) {
        if (err) {
          //console.log(err);
        } else {
          users.remove({
            'userType': "User"
          },
          function(err) {
            if (err) {
              //console.log(err);
            } else {
              let session = driver.session();
              let query = 'Match (n:dashboardscenario) detach delete n';
              session.run(query).then(() =>{
                session.close();
                let sessionx = driver.session();
                let query = 'Match (n:loginid) detach delete n';
                sessionx.run(query).then(() =>{
                  sessionx.close();
                  let sessiony = driver.session();
                  let query = 'Match (n:team) detach delete n';
                  sessiony.run(query).then(() =>{
                    res.send("Done");
                    sessiony.close();
                  }).catch(function(error) {
                    //////console.log(' error: ', error);
                  });

                }).catch(function(error) {
                  //////console.log(' error: ', error);
                });

              }).catch(function(error) {
                //////console.log(' error: ', error);
              });
              //console.log('done');
            }
          });
        }
      });
    };

    var resetPassword=(req, res) => {
      let loginId = req.body.loginid;
      users.update({
        'loginId': loginId
      }, {
        '$set': {
          'password': 'wipro@123'
        }
      },
      function(err) {
        if (err) {
          //console.log(err);
        } else {
          //console.log('done in reset password');
        }
        res.send('done');
      });
    }

    var deleteDomain  =(req, res) => {
      let name = req.body.domainName;
      //////console.log(name," name");
      let query = 'Match (n:domain{name: "'+name+'"}) detach delete n';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var addDomain  =(req, res) => {
      let session = driver.session();
      let name = req.body.domainName;
      let description = req.body.domainDescription;
      //////console.log('name and desc'+name+description);
      let query = 'Match (n:domain{name: "'+name+'",description: "'+description+'"})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var findAllScenarios =(req, res) => {
      var Allscenarios =[];
      let session = driver.session();
      let query = 'match (n:scenario) return n';
      session.run(query).then(function(result) {
        for (var x of result.records) {
          Allscenarios.push({"Scenario":x._fields[0].properties.description});
        }
        res.send(result1);
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var addNewComponent =(req, res) => {
      let session = driver.session();
      let name = req.body.componentName;
      let category = req.body.componentCategory;
      let description = req.body.componentDescription;
      let errormsg = req.body.componentErrorMsg;
      let query = 'create (n:component{name: "'+name+'",category: "'+category+'",description: "'+description+'",errormsg: "'+errormsg+'"})';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };
    var deleteComponent  =(req, res) => {
      let name = req.body.componentName;
      //////console.log("name "+name);
      let query = 'match (n:component{name: "'+name+'"}) detach delete n';
      session.run(query).then(() =>{
        res.send('done');
        session.close();
      }).catch(function(error) {
        //////console.log(' error: ', error);
      });
    };


    var getAllDomain =(req, res)=> {
      //////console.log("in controller");
      let query = 'match(n:domain) return n';
      session.run(query).then(function(result) {
        //////console.log(result);
        session.close();
        res.send(result);
      }).catch(function(error) {
        //////console.log('promise error: ', error);
        session.close();
        res.send(error);
      });
    };

    var viewDomainDetails =(req, res)=> {
      let domainName = req.body.searchQuery;
      var result = [] ;
      let query = 'match (n:domain{name: "'+domainName+'"})  return n';
      session.run(query).then(function(result) {
        res.send(result);

      });
    };
    var updateDomain =(req, res)=> {
      var updatedData = req.body;
      let session = driver.session();
      //////console.log("id ", updatedData.domainId);
      let query = 'match (n:domain) where id(n)='+updatedData.domainId+' set n.name="'+updatedData.name+'",n.description="'+updatedData.description+'",n.video="'+updatedData.video+'" return n ';
      //////console.log("query ",query);
      session.run(query).then(function(result) {
        //////console.log("in update neo");
        res.send(result);
      }).catch(function(error) {
        //////console.log('promise error: ', error);
      });
    };
    var viewComponentDetails =(req, res)=> {
      let componentName = req.body.searchQuery;
      var result = [] ;
      let query = 'match (n:component{name: "'+componentName+'"}) return n';
      session.run(query).then(function(result) {
        res.send(result);
      });
    };
    //  @Mayanka : Fetching the sequence information of a user story
    var getCorrectSequence = (req, res)=> {
      if(req.body.length == 1){
        let oneArr = [];
        let components = [];
        let query = '';
        oneArr = req.body.components;
        query = 'unwind ['+oneArr+'] as id match (n:component) where ID(n) = id return n';
        session.run(query).then(function(result) {
          for (var x of result.records) {
            components.push({"header": x._fields[0].properties.name});
          }
          res.send(components)
        }).catch(function(error) {
        });
      }
      else{
        let componentArray = [[]];
        let count = 0;
        componentArray = req.body.components;
        let tem2 = [];
        let temp = new Array();
        let tem2Length = 0;
        if(componentArray != undefined) {
          if(componentArray.length == 1) {
            temp.push(componentArray);
          }
          else{
            for(let i = 0; i <componentArray.length; i = i + 1) {
              temp = componentArray[i].split(',');
              temp =  JSON.parse("[" + temp + "]");
              if(temp != undefined){
                tem2.push(temp);
                count++;
                tem2Length += temp.length;
              }
            }
          }
        }
        let components =[];
        let resultArray = [];
        let flag = 0;
        components = [];
        let query = '';
        query = 'unwind ['+tem2+'] as id match (n:component) where ID(n) = id return n';
        session.run(query).then(function(result) {
          for (var x of result.records) {
            components.push({"header":x._fields[0].properties.name});
            flag += 1;
          }
          resultArray.push(components);
          res.send(resultArray)
        }).catch(function(error) {
        });
      }
    };
    var updateUser=(req, res)=> {
      users.update({'empId': req.body.empId},
      {'$set': {
        'userName': req.body.name,
        'emailId': req.body.email,
        'userType': req.body.userType,
        'teamName': req.body.team
      }},function(err){
        if (err) {
          res.send(err);
        } else {
          res.send('success');
        }
      }
    );
  };
  var findUserData=(req, res)=> {
    users.find({
      'empId': req.body.empId
    },
    function(err, alldetails) {
      if (err) {
        //////console.log(err);
      } else {
        //////console.log('databaseee'+alldetails);
      }
      res.send(alldetails);
    });
  };
  var updateComponent =(req, res)=> {
    var updatedData = req.body;
    let session = driver.session();
    let query = 'match (n:component) where id(n)='+updatedData.componentId+' set n.name="'+updatedData.name+'",n.description="'+updatedData.description+'",n.category="'+updatedData.category+'",n.errormsg="'+updatedData.errormsg+'" return n ';
    session.run(query).then(function(result) {
      //////console.log("in update neo");
      res.send(result);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };
  var findDomainScenario =(req, res) => {
    var result1 = [];
    var domainDescription ='';
    var scenario =[];
    let session = driver.session();
    //////console.log();
    let query = 'MATCH (n:scenario) WHERE not( (n:scenario)-[:scenario_of]-() ) return  n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };
  var linkScenario =(req, res) => {
    let name = req.body.scenarioName;
    let domainname = req.body.domainName;
    let description = req.body.domainDescription;
    let session = driver.session();
    let result1 = [];
    // //console.log("ajax ",name);

    // //console.log("b is: ",b);
    let aa = JSON.stringify(name);
    let query ;
    // //console.log(typeof(req.body.scenarioName)+" value "+aa);
    if(typeof(req.body.scenarioName)!='string'){
      var b = req.body.scenarioName.map(Number);
      query = 'unwind ['+b+'] as name1 match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)=name1 merge (m)<-[r:scenario_of]-(n) return m,n,r';
      // //console.log("scenario in link"+query);
    }
    else{
      query = 'match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)='+name+' merge (m)<-[r:scenario_of]-(n) return m,n,r'
      // //console.log("query in link ",query);
    }
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };

  var findDelinkScenario =(req, res) => {
    var result1 = [];
    var domainDescription ='';
    var scenario =[];
    let session = driver.session();
    let domain = req.body.domain;
    //////console.log("domain");
    let query = 'match (n:domain{name:"'+domain+'"})<-[]-(m:scenario) return m';
    //////console.log(query);
    session.run(query).then(function(result) {
      //////console.log("result");
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
      //////console.log('promise error: ', error);
    });
  };


  var delinkScenario =(req, res) => {
    let name = req.body.scenarioName;
    let domainname = req.body.domainName;
    let description = req.body.domainDescription;
    let session = driver.session();
    let result1 = [];
    //console.log("ajax ",name);

    let aa = JSON.stringify(name);
    let query ;
    // //console.log(typeof(req.body.scenarioName)+" value "+aa);
    if(typeof(req.body.scenarioName)!='string'){
      var b = req.body.scenarioName.map(Number);
      query = 'unwind ['+b+'] as name1 match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)=name1 match (m)<-[r:scenario_of]-(n) detach delete r return m,n,r';
      // //console.log("scenario "+query);
    }
    else{
      query = 'match (m:domain {name:"'+domainname+'"}) match (n:scenario) where id(n)='+name+' match (m)<-[r:scenario_of]-(n) detach delete r return m,n,r'

      // //console.log("delink ",query);
    }
    session.run(query).then(function(result) {
      for (var x of result.records) {
        result1.push({
          "scenarioId":(x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name),
          "scenarioDescription":(x._fields[0].properties.problemstatement)
        });
      }
      //////console.log("in control ",result1);
      res.send(result1);
    }).catch(function(error) {
    });
  };
  //  @Mayanka : Fetching the  distinct customer journeys with status, 'Inprogress'
  var adminDashboardTotalDomain =(req, res) => {
    let status = "'In progress'";
    let result1 = [];
    let query = 'match (n:dashboardscenario) where n.status='+status+' return distinct n.domain';
    session.run(query).then(function(result) {
      for (var x of result.records) {////console.log('in controller'+JSON.stringify(x._fields[0]));
      result1.push({
        "count":(x._fields[0]),
      });
    }
    res.send(result1);
  }).catch(function(error) {
  });
};
//  @Mayanka : Fetching the  distinct dashboard user stories with status, 'Completed'
var adminDashboardCompletedScenario =(req, res) => {
  let status = "'Completed'";
  let result1 = [];
  let query = 'match (n:team)<-[]-()<-[]-(m:dashboardscenario) where m.status ='+status+' return n.name, m.name,m.status,m.domain,m.loginid,m.username';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "team_name": (x._fields[0]),
        "scenario_name":(x._fields[1]),
        "domain_name": (x._fields[3]),
        "userId":(x._fields[5]),
      });
      if(result.records.length == result1.length) {
        res.send(result1);
      }
    }
    session.close();
  }).catch(function(error) {
  });
}
//  @Mayanka : Fetching the all user stories started by the user
var adminDashboardTotalScenario = (req, res) => {
  let result1 = [];
  let query = 'match (n:dashboardscenario)  return n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "name":(x._fields[0].properties.name),
        "completedno": (x._fields[0].properties.completedno),
        "loginid":(x._fields[0].properties.loginid),
        "domain": (x._fields[0].properties.domain),
      });
    }
    res.send(result1);
  }).catch(function(error) {
  });
}
//  @Mayanka : Archiving the selected customer journeys
var toggleDomain =(req, res) => {
  let domainName = req.body.name;
  let flagStatus = req.body.flag;
  let query = "match (n:domain) where n.name='"+domainName+"' set n.flag = "+flagStatus+" return n.flag";
  session.run(query).then(function(result) {
    res.send("done");
  }).catch(function(error) {
  });
}
//  @Mayanka : Fetching the customer journeys completed by a user
var domainsCompletedByUser =(req, res) => {
  let domainName = req.body.domainName;
  let userID = req.body.userId;
  let teamName = req.body.teamName;
  let query = 'match(m:loginid{name:'+userId+'}) merge (m)<-[:completedDomain]-(n:completedDomain{name:'+domainName+'}) return n'
  session.run(query).then(function(result) {
    res.send(result);
  }).catch(function(error) {
  });
};
//  @Mayanka : Fetching the count of customer journeys completed
var fetchCompletedDomain =(req, res) => {
  let query = 'match (n:loginid)<-[]-(m:completedDomain) return count(distinct m.name)'
  session.run(query).then(function(result) {
    res.send(result);
  }).catch(function(error) {
  });
};
//  @Mayanka : Fetching individual scores of a user
var fetchScores =(req, res) => {
  let Result = [];
  let query = 'match (n:loginid) return n'
  session.run(query).then(function(result) {
    for (var x of result.records){
      Result.push({
        "userID":(x._fields[0].properties.username),
        "score": (x._fields[0].properties.score),
      });
    }
    res.send(Result);
  }).catch(function(error) {
  });
};
//  @Mayanka : Fetching the team wise details of user stories
var teamStats =(req, res) => {
  let session = driver.session();
  let result1 = [];
  let query = 'match (n:team)<-[]-()<-[]-(m:dashboardscenario)  return n.name, m.name,m.domain,m.loginid,m.status,m.username'
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "team_name": (x._fields[0]),
        "scenario_name":(x._fields[1]),
        "domain_name": (x._fields[2]),
        "userId":(x._fields[5]),
        "status":x._fields[4]
      });
      if(result.records.length == result1.length) {
        res.send(result1);
      }
    }
    session.close();
  }).catch(function(error) {
  });
};
var getAllTeams = (req, res) => {
  let query='match (n:team) return n';
  let session = driver.session();
  session.run(query).then(function(result) {
    res.send(result.records);
  });
}
//  @Mayanka : Identifying who did what(userstories)
var UserPickedScenarios = (req, res) => {
let SessionName = req.body.session;
  let query = 'match (k:session{name:"'+SessionName+'"})<-[]-(a:team)<-[]-(n:loginid)<-[]-(m:dashboardscenario) return m.username,m.name,m.loginid,a.name';
  let session = driver.session();
  session.run(query).then(function(result) {
    res.send(result.records);
  });
};
//  @Mayanka : get the names of the session
var sessionNames = (req, res) => {
  let session = driver.session();
  let SessionNames = [];
  let query1 = 'match(n:session) return n.name';
  session.run(query1).then(function(result1) {
    result1.records.map(function(item){
      SessionNames.push(item._fields[0]);
    })
    res.send(SessionNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};
//  @Mayanka : get the team participating in the respective session
var sessionWiseTeams = (req, res) => {
  let session = driver.session();
  let SessionName = req.body.session;
  let teamNames = [];
  let query = 'match (m:team)-[]->(n:session{name:"'+SessionName+'"}) return m.name';
  session.run(query).then(function(result1) {
    result1.records.map(function(item){
      teamNames.push(item._fields[0]);
    })
    res.send(teamNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};
//  @Mayanka : get the  scores of the team participating in a respective session
var sessionWiseTeamScores = (req, res) => {
  let session = driver.session();
  let teams = req.body.teams;
  let teamNames = [];
  let query = 'unwind  '+teams+' as teamname match(n:team{name:teamname})<-[:user_of]-(m:loginid) return sum(m.score), n.name';
  session.run(query).then(function(result1) {
    result1.records.map(function(item){
      teamNames.push({'team': item._fields[1], 'score': item._fields[0]});
    })
    res.send(teamNames);
  }).catch(function(error) {
    session.close();
    res.send(error);
  });
};

module.exports = {
  findAllScenarios,
  addNewDomain,
  deleteDomain,
  addNewComponent,
  deleteComponent,
  viewComponentDetails,
  addUser,
  deleteUser,
  getUsers,
  getAllDomain,
  viewDomainDetails,
  addDomain,
  updateComponent,
  updateDomain,
  findUserData,
  updateUser,
  getCorrectSequence,
  findDomainScenario,
  linkScenario,
  findDelinkScenario,
  delinkScenario,
  toggleDomain,
  adminDashboardTotalScenario,
  adminDashboardCompletedScenario,
  adminDashboardTotalDomain,
  domainsCompletedByUser,
  fetchCompletedDomain,
  fetchScores,
  teamStats,
  masterReset,
  resetPassword,
  getusertype,
  getAllTeams,
  UserPickedScenarios,
  sessionNames,
  sessionWiseTeams,
  sessionWiseTeamScores
};
