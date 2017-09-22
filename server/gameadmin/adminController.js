'use strict';
const logger = require('./../../applogger');
const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
let session = driver.session();

var addNewCategory = (req, res) => {
  let session = driver.session();
  let name = req.body.categoryName;

  let query = 'CREATE (n:category{name: "'+name+'"})';
  session.run(query).then(() =>{
    res.send('done');
    console.log("route",query);
    session.close();
  }).catch(function(error) {
  });
};
var updateCategory =(req, res)=> {
  var updatedData = req.body;
  let session = driver.session();
  //////console.log("id ", updatedData.domainId);
  let query = 'match (n:category) where id(n)='+updatedData.domainId+' set n.name="'+updatedData.name+'" return n ';
  console.log("query ",query);
  session.run(query).then(function(result) {
    //////console.log("in update neo");
    res.send(result);
  }).catch(function(error) {
    console.log('promise error: ', error);
  });
};
var getAllCategory =(req, res)=> {
  //////console.log("in controller");
  let query = 'match (n:category) return n';
  session.run(query).then(function(result) {
    console.log(result);
    session.close();
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
    session.close();
    res.send(error);
  });
};
var viewCategoryDetails =(req, res)=> {
  let domainName = req.body.searchQuery;
  var result = [] ;
  let query = 'match (n:category{name: "'+domainName+'"})  return n';
  session.run(query).then(function(result) {
    res.send(result);

  });
};
var findCategory = (req, res) => {
  var result1 = [];
  let session = driver.session();
  let query = 'match(n:category) return n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      //console.log(x._fields[0]);
      result1.push({
        "name": (x._fields[0].properties.name),

        "flag": (x._fields[0].properties.flag)
      });
    }
    res.send(result1);
  }).catch(function(error) {
    //console.log('promise error: ', error);
  });
};
var deleteCategory  =(req, res) => {
  let name = req.body.domainName;
  //////console.log(name," name");
  let query = 'Match (n:category{name: "'+name+'"}) detach delete n';
  session.run(query).then(() =>{
    res.send('done');
    session.close();
  }).catch(function(error) {
    //////console.log(' error: ', error);
  });
};
var viewCategoryDetails =(req, res)=> {
  let domainName = req.body.searchQuery;
  var result = [] ;
  let query = 'match (n:category{name: "'+domainName+'"})  return n';
  session.run(query).then(function(result) {
    res.send(result);

  });
};
var getAllThemes =(req, res)=> {
  var result1 = [];
  let session = driver.session();
  let query = 'MATCH (n:theme) return n';
  ////console.log(query);
  session.run(query).then(function(result) {
    ////console.log(result);
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name),

      });
    }
    //console.log('The Results: ',result1);
    res.send(result1);
  }).catch(function(error) {
  });

};
var addNewTheme =(req, res)=> {
  let session = driver.session();
  // console.log("addnewtheme", req.body.Sequence);
  // //console.log("pecondition ",typeof req.body.aaa);
  let query = 'create(n:theme{name:"'+req.body.scenarioName+'",Sequence:"'+req.body.Sequence+'"}) return n';
  //console.log(query);
  session.run(query).then(function(result) {
    //console.log(result);
    res.send(result);
  }).catch(function(error) {
    //console.log('promise error: ', error);
    // res.send(error);
  });
  ////console.log(req.body);
};

var findConceptTheme =(req, res) => {
  var result1 = [];
  var domainDescription ='';
  var scenario =[];
  let session = driver.session();
  //////console.log();
  let query = 'MATCH (n:theme) WHERE not( (n:theme)-[:theme_of]-() ) return  n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var linkTheme =(req, res) => {
  let name = req.body.scenarioName;
  let domainname = req.body.domainName;
  //let description = req.body.domainDescription;
  let session = driver.session();
  let result1 = [];
  // //console.log("ajax ",name);

  // //console.log("b is: ",b);
  let aa = JSON.stringify(name);
  let query ;
  // //console.log(typeof(req.body.scenarioName)+" value "+aa);
  if(typeof(req.body.scenarioName)!='string'){
    var b = req.body.scenarioName.map(Number);
    query = 'unwind ['+b+'] as name1 match (m:category {name:"'+domainname+'"}) match (n:theme) where id(n)=name1 merge (m)<-[r:theme_of]-(n) return m,n,r';
    // //console.log("scenario in link"+query);
  }
  else{
    query = 'match (m:category {name:"'+domainname+'"}) match (n:theme) where id(n)='+name+' merge (m)<-[r:theme_of]-(n) return m,n,r'
    // //console.log("query in link ",query);
  }
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)

      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var findDelinkTheme =(req, res) => {
  var result1 = [];
  var domainDescription ='';
  var scenario =[];
  let session = driver.session();
  let domain = req.body.domain;
  //////console.log("domain");
  let query = 'match (n:category{name:"'+domain+'"})<-[]-(m:theme) return m';
  //////console.log(query);
  session.run(query).then(function(result) {
    //////console.log("result");
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var delinkTheme =(req, res) => {
  let name = req.body.scenarioName;
  let domainname = req.body.domainName;
  // let description = req.body.domainDescription;
  let session = driver.session();
  let result1 = [];
  //console.log("ajax ",name);

  let aa = JSON.stringify(name);
  let query ;
  // //console.log(typeof(req.body.scenarioName)+" value "+aa);
  if(typeof(req.body.scenarioName)!='string'){
    var b = req.body.scenarioName.map(Number);
    query = 'unwind ['+b+'] as name1 match (m:category {name:"'+domainname+'"}) match (n:theme) where id(n)=name1 match (m)<-[r:theme_of]-(n) detach delete r return m,n,r';
    // console.log("scenario "+query);
  }
  else{
    query = 'match (m:category {name:"'+domainname+'"}) match (n:theme) where id(n)='+name+' match (m)<-[r:theme_of]-(n) detach delete r return m,n,r'

    // //console.log("delink ",query);
  }
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    // console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
  });
};

var findThemes = (req, res) => {
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

  if (domainName == 'unlinked_themes') {
    let query = 'MATCH (n:theme) WHERE not( (n:theme)-[]-() ) return  n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        //console.log("---------------"+JSON.stringify(x));
        result1.push({
          "scenarioId": (x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });
  }
  else {
    let query1 = 'match (n:category {name: "' + domainName + '"})<-[:theme_of]-(m:theme) return m ORDER BY m';
    session.run(query1).then(function(result) {
      for (var x of result.records) {
        //console.log("---------------"+JSON.stringify(x));
        result1.push({
          "scenarioId": (x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });


  }

};
var findThemeData = (req, res) => {
  var scenario = req.body.scenario;
  let session = driver.session();
  let query = 'MATCH (n:theme) where n.name="' + scenario + '" return  n';
  session.run(query).then(function(result) {
    var scenarioData = result.records[0]._fields[0].properties;
    //console.log(JSON.stringify(scenarioData));
    res.send(result);
  }).catch(function(error) {
    //console.log('promise error: ', error);
  });
};
var deleteTheme = (req, res)=> {
      let session = driver.session();
      let query = 'match(n:theme) where n.name="'+req.body.scenario+'" detach delete n';
      //console.log(query);
      session.run(query).then(function(result) {
        //console.log(result);
        res.send(result);
      }).catch(function(error) {

      });
      //console.log(req.body);
};
var getAllStages =(req, res)=> {
  var result1 = [];
  let session = driver.session();
  let query = 'MATCH (n:stage) return n';
  //console.log(query);
  session.run(query).then(function(result) {
    //console.log(result);
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name),

      });
    }
    //console.log('The Results: ',result1);
    res.send(result1);
  }).catch(function(error) {
  });

};
var addNewStage =(req, res)=> {
  let session = driver.session();
  // console.log("addnewtheme", req.body.Sequence);
  // console.log("pecondition ",typeof req.body.aaa);
  let query = 'create(n:stage{name:"'+req.body.scenarioName+'",Video:"'+req.body.Video+'"}) return n';
  //  console.log(query);
  session.run(query).then(function(result) {
    //console.log(result);
    res.send(result);
  }).catch(function(error) {
    //console.log('promise error: ', error);
    // res.send(error);
  });
  //  console.log(req.body);
};
var findTheme = (req, res) => {
  var result1 = [];
  let session = driver.session();
  let query = 'match(n:theme) return n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      //console.log(x._fields[0]);
      result1.push({
        "name": (x._fields[0].properties.name),

        "flag": (x._fields[0].properties.flag)
      });
    }
    res.send(result1);
  }).catch(function(error) {
    //console.log('promise error: ', error);
  });
};
var findThemeStage =(req, res) => {
  var result1 = [];
  var domainDescription ='';
  var scenario =[];
  let session = driver.session();
  //////console.log();
  let query = 'MATCH (n:stage) WHERE not( (n:stage)-[:stage_of]-() ) return  n';
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var linkStage =(req, res) => {
  let name = req.body.scenarioName;
  let domainname = req.body.domainName;
  //let description = req.body.domainDescription;
  let session = driver.session();
  let result1 = [];
  // //console.log("ajax ",name);

  // //console.log("b is: ",b);
  let aa = JSON.stringify(name);
  let query ;
  // //console.log(typeof(req.body.scenarioName)+" value "+aa);
  if(typeof(req.body.scenarioName)!='string'){
    var b = req.body.scenarioName.map(Number);
    query = 'unwind ['+b+'] as name1 match (m:theme {name:"'+domainname+'"}) match (n:stage) where id(n)=name1 merge (m)<-[r:stage_of]-(n) return m,n,r';
    // //console.log("scenario in link"+query);
  }
  else{
    query = 'match (m:theme {name:"'+domainname+'"}) match (n:stage) where id(n)='+name+' merge (m)<-[r:stage_of]-(n) return m,n,r'
    // //console.log("query in link ",query);
  }
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)

      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var findDelinkStage =(req, res) => {
  var result1 = [];
  var domainDescription ='';
  var scenario =[];
  let session = driver.session();
  let domain = req.body.domain;
  //////console.log("domain");
  let query = 'match (n:theme{name:"'+domain+'"})<-[]-(m:stage) return m';
  //////console.log(query);
  session.run(query).then(function(result) {
    //////console.log("result");
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    //////console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var delinkStage =(req, res) => {
  let name = req.body.scenarioName;
  let domainname = req.body.domainName;
  // let description = req.body.domainDescription;
  let session = driver.session();
  let result1 = [];
  //console.log("ajax ",name);

  let aa = JSON.stringify(name);
  let query ;
  // //console.log(typeof(req.body.scenarioName)+" value "+aa);
  if(typeof(req.body.scenarioName)!='string'){
    var b = req.body.scenarioName.map(Number);
    query = 'unwind ['+b+'] as name1 match (m:theme {name:"'+domainname+'"}) match (n:stage) where id(n)=name1 match (m)<-[r:stage_of]-(n) detach delete r return m,n,r';
    console.log("scenario "+query);
  }
  else{
    query = 'match (m:theme {name:"'+domainname+'"}) match (n:stage) where id(n)='+name+' match (m)<-[r:stage_of]-(n) detach delete r return m,n,r'

    // //console.log("delink ",query);
  }
  session.run(query).then(function(result) {
    for (var x of result.records) {
      result1.push({
        "scenarioId":(x._fields[0].identity.low),
        "scenarioName": (x._fields[0].properties.name)
      });
    }
    console.log("in control ",result1);
    res.send(result1);
  }).catch(function(error) {
  });
};
var findStages = (req, res) => {
  var result1 = [];
  var scenario = [];
  var video = '';
  var domainName = req.body.domain;
  let session = driver.session();

  // let query1 = 'match (n:team {name:"Kamet"})<-[]-()<-[]-(m:dashboardscenario) return m.name,m.status,m.domain';

  if (domainName == 'unlinked_stages') {
    let query = 'MATCH (n:stage) WHERE not( (n:stage)-[]-() ) return  n';
    session.run(query).then(function(result) {
      for (var x of result.records) {
        //console.log("---------------"+JSON.stringify(x));
        result1.push({
          "scenarioId": (x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });
  }
  else {
    let query1 = 'match (n:theme {name: "' + domainName + '"})<-[:stage_of]-(m:stage) return m ORDER BY m';
    session.run(query1).then(function(result) {
      for (var x of result.records) {
        //console.log("---------------"+JSON.stringify(x));
        result1.push({
          "scenarioId": (x._fields[0].identity.low),
          "scenarioName": (x._fields[0].properties.name)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });


  }

};
var findStageData = (req, res) => {
  var scenario = req.body.scenario;
  let session = driver.session();
  let query = 'MATCH (n:stage) where n.name="' + scenario + '" return  n';
  session.run(query).then(function(result) {
    var scenarioData = result.records[0]._fields[0].properties;
    //console.log(JSON.stringify(scenarioData));
    res.send(result);
    console.log(result);
  }).catch(function(error) {
    //console.log('promise error: ', error);
  });
};
var deleteStage = (req, res)=> {
      let session = driver.session();
      let query = 'match(n:stage) where n.name="'+req.body.scenario+'" detach delete n';
      //console.log(query);
      session.run(query).then(function(result) {
        //console.log(result);
        res.send(result);
      }).catch(function(error) {

      });
      //console.log(req.body);
};

var updateTheme =(req, res)=> {
  var updatedData = req.body;
  console.log('updated data',updatedData);
  console.log('1', updatedData.ThemeId);
  console.log('2', updatedData.Theme);
  console.log('3', updatedData.Sequence );
  let session = driver.session();
  let query = 'match (n:theme) where id(n)='+updatedData.ThemeId+' set n.name="'+updatedData.Theme+'",n.Sequence="'+updatedData.Sequence+'" return n ';
  session.run(query).then(function(result) {
    //////console.log("in update neo");
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var getThemesAll = (req, res) =>  {
  let session = driver.session();
  let query = 'MATCH (n:theme) return n';
  session.run(query).then(function(result) {
    //console.log(result);
    session.close();
    res.send(result);
  }).catch(function(error) {
    ////console.log('promise error: ', error);
    session.close();
    res.send(error);
  });
};
var viewThemeDetails =(req, res)=> {
  let ThemeName = req.body.searchQuery;
  console.log('viewthemedetails', ThemeName);
  var result = [] ;
  let query = 'match (n:theme{name: "'+ThemeName+'"}) return n';
  session.run(query).then(function(result) {
    res.send(result);
  });
};
var updateStage =(req, res)=> {
  var updatedData = req.body;
  console.log('updated data',updatedData);
  console.log('1', updatedData.StageId);
  console.log('2', updatedData.Stage);
  console.log('3', updatedData.Video );
  let session = driver.session();
  let query = 'match (n:stage) where id(n)='+updatedData.StageId+' set n.name="'+updatedData.Stage+'",n.Video="'+updatedData.Video+'" return n ';
  session.run(query).then(function(result) {
    //////console.log("in update neo");
    res.send(result);
  }).catch(function(error) {
    //////console.log('promise error: ', error);
  });
};
var getStagesAll = (req, res) =>  {
  let session = driver.session();
  let query = 'MATCH (n:stage) return n';
  session.run(query).then(function(result) {
    //console.log(result);
    session.close();
    res.send(result);
  }).catch(function(error) {
    ////console.log('promise error: ', error);
    session.close();
    res.send(error);
  });
};
var viewStageDetails =(req, res)=> {
  let StageName = req.body.searchQuery;
  console.log('viewthemedetails', StageName);
  var result = [] ;
  let query = 'match (n:stage{name: "'+StageName+'"}) return n';
  session.run(query).then(function(result) {
    res.send(result);
  });
};





module.exports = {
addNewCategory,
updateCategory,
getAllCategory,
viewCategoryDetails,
findCategory,
deleteCategory,
viewCategoryDetails,
getAllThemes,
addNewTheme,
findConceptTheme,
linkTheme,
findDelinkTheme,
delinkTheme,
findThemes,
findThemeData,
deleteTheme,
getAllStages,
addNewStage,
findTheme,
findThemeStage,
linkStage,
findDelinkStage,
delinkStage,
findStages,
findStageData,
deleteStage,
updateTheme,
getThemesAll,
viewThemeDetails,
updateStage,
getStagesAll,
viewStageDetails



};
