'use strict';
const logger = require('./../../applogger');
let driver = require('../config/neo4j');
let session = driver.session();
let componentController = {

  category: function(req, res) {
    let session = driver.session();
    //console.log("inside controller" + res);
    let query = 'match (a:domain)<-[q:scenario_of]-(n:scenario)<-[r:component_of]-(ax:component) return distinct  ax.category';
    session.run(query).then(function(result, err) {

      if (result) {
        //console.log("query success" + JSON.stringify(result));
        res.send(result);
      }

    }, function(err) {
      //console.log('error while connecting', err);
    });
  },
  categoryAdmin: function(req, res) {
    let session = driver.session();
    //console.log("inside controller" + res);
    let query = 'match (ax:component) return distinct  ax.category';
    session.run(query).then(function(result, err) {

      if (result) {
        //console.log("query success" + JSON.stringify(result));
        res.send(result);
      }

    }, function(err) {
      //console.log('error while connecting', err);
    });
  },
  getComponents: function(req, res) {
    //console.log("controller getComponents");
    let session = driver.session();
    var result1 = [];
    var componentDescription = '';
    var component = [];
    let query = '';
    if(req.body.loginType == 'user'){
      query = "match (a:domain{name:'"+req.body.domain+"'})<-[q:scenario_of]-(n:scenario)<-[r:component_of]-(ax:component) where ax.category='" + req.body.category + "' return distinct ax order by ax.name asc";
    }
    else{
      query = "match (ax:component) where ax.category='" + req.body.category + "' return distinct ax order by ax.name asc";
    }
    //console.log(JSON.stringify(req.body));
    // let query = "match (a:domain{name:'"+req.body.domain+"'})<-[q:scenario_of]-(n:scenario)<-[r:component_of]-(ax:component) where ax.category='" + req.body.category + "' return distinct ax";
    // let query1= 'match (a:domain)<-[q:scenario_of]-(n:scenario)<-[r:component_of]-(ax:component) return distinct id(ax)';
    //console.log('component query: ',query);
    session.run(query).then(function(result) {
      // if(result) {
      //
      // }
      // else()
      //console.log("query success" + JSON.stringify(result));
      // result1.push({
      //   "componentDescription":componentDescription
      // })

      for (var x of result.records) {
        result1.push({
          "componentId": (x._fields[0].identity.low),
          "componentName": (x._fields[0].properties.name),
          "componentDescription": (x._fields[0].properties.description),
          "category": (x._fields[0].properties.category),
          "errorMsg": (x._fields[0].properties.errormsg)
        });
      }
      res.send(result1);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });
  },

  getComponentById: function(req, res) {
    //console.log("controller getComponentById");
    let session = driver.session();
    let query = "match (a:domain)<-[q:scenario_of]-(n:scenario)<-[r:component_of]-(ax:component) where id(ax)=" + req.params.id + " return ax";
    session.run(query).then(function(result) {
      //console.log("query success" + JSON.stringify(result));
      res.send(result.records[0]._fields[0].properties);
    }).catch(function(error) {
      //console.log('promise error: ', error);
    });
  }
};
module.exports = componentController;
