let driver = require('../config/neo4j');

var scenario = {
    deleteScenario: function(req, res) {
      let session = driver.session();
      let query = 'match(n:scenario) where n.name="'+req.body.scenario+'" detach delete n';
      //console.log(query);
      session.run(query).then(function(result) {
        //console.log(result);
        res.send(result);
      }).catch(function(error) {
        //console.log('promise error: ', error);
        // res.send(error);
      });
      //console.log(req.body);
    }
};
module.exports = scenario;
