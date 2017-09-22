let driver = require('../config/neo4j');
let session = driver.session();

var component = {
    getComponents: function(req, res) {
      let session = driver.session();
      let query = 'MATCH (n:component) WHERE not( (n:component)-[:component_of]->() ) return n';
      session.run(query).then(function(result) {
        //console.log(result);
        session.close();
        res.send(result);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        session.close();
        res.send(error);
      });
    },
    getComponentsAll: function(req, res) {
      let session = driver.session();
      let query = 'MATCH (n:component) return n';
      session.run(query).then(function(result) {
        //console.log(result);
        session.close();
        res.send(result);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        session.close();
        res.send(error);
      });
    },
    addNewScenario: function(req, res) {
      let session = driver.session();
      // //console.log(req.body);
      // //console.log("pecondition ",typeof req.body.aaa);
      let query = 'create(n:scenario{name:"'+req.body.scenarioName+'",problemstatement:"'+req.body.probStmt+'",output:"'+req.body.outputValue+'",evalfun:"'+req.body.evalFunc+'",code:"'+req.body.code+'",video:"'+req.body.video+'",score:'+req.body.score+',negativescore:'+req.body.negScore+',precondition:'+req.body.aaa+',dependency:'+req.body.bbb+'}) set n.sequence=[] return n';
      //console.log(query);
      session.run(query).then(function(result) {
        //console.log(result);
        res.send(result);
      }).catch(function(error) {
        //console.log('promise error: ', error);
        // res.send(error);
      });
      ////console.log(req.body);
    },
    addSequence: function(req, res) {
      let session = driver.session();
      let query = 'match(n:scenario) where id(n)='+req.body.scenarioId+' set n.sequence= n.sequence +["'+req.body.sequence+'"] return n';
      //console.log("query for add Sequence: ",query);
      // let query = 'create(n:scenario{name:"'+req.body.scenarioName+'",problemstatement:"'+req.body.probStmt+'",sequence:"'+req.body.crctSeq+'",output:"'+req.body.outputValue+'",evalfun:"'+req.body.evalFunc+'",code:"'+req.body.code+'"}) return n';
      ////console.log(query);
      session.run(query).then(function(result) {
        //console.log("(((((((((((((((((())))))))))))))))))",result);
        var seqSplit = req.body.sequence.split('-').map(Number);
        //console.log('seq Split', seqSplit);
        let query1 = 'unwind ['+seqSplit+'] as cId match (n:scenario) where id(n)='+req.body.scenarioId+' match (a:component) where id(a)=cId merge(a)-[r:component_of]->(n)';
        //console.log('query for relationship creation: ',query1);
        session.run(query1).then(function(result1) {
          //console.log('relationships created successfully');
          // res.send(result1);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        // res.send(error);
      });

        res.send(result);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        // res.send(error);
      });
      ////console.log(req.body);
    },
    updateSequence: function(req, res) {
      let session = driver.session();
      let query = 'MATCH (n:scenario) where id(n)='+req.body.scenarioId+' SET n.sequence = FILTER(x IN n.sequence WHERE x <> "'+req.body.selectedSequence+'") set n.sequence=n.sequence+["'+req.body.sequence+'"]  return n';
      ////console.log(query);
      session.run(query).then(function(result) {
        ////console.log(result);
        var seqSplit = req.body.sequence.split('-').map(Number);
        //console.log('seq Split', seqSplit);
        let query1 = 'unwind ['+seqSplit+'] as cId match (n:scenario) where id(n)='+req.body.scenarioId+' match (a:component) where id(a)=cId merge(a)-[r:component_of]->(n)';
        //console.log('query for relationship creation: ',query1);
        session.run(query1).then(function(result1) {
          //console.log('relationships created successfully');
          // res.send(result1);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        // res.send(error);
      });
        res.send(result);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        // res.send(error);
      });
      ////console.log(req.body);
    },
    deleteSequence: function(req, res) {
      let session = driver.session();
      let query = 'MATCH (n:scenario) where id(n)='+req.body.scenarioId+' SET n.sequence = FILTER(x IN n.sequence WHERE x <> "'+req.body.sequence+'") return n';
      ////console.log(query);
      session.run(query).then(function(result) {
        ////console.log(result);
        res.send(result);
      }).catch(function(error) {
        ////console.log('promise error: ', error);
        // res.send(error);
      });
      ////console.log(req.body);
    },
    getAllScenarios: function(req, res) {
      var result1 = [];
      let session = driver.session();
      let query = 'MATCH (n:scenario) return n';
      ////console.log(query);
      session.run(query).then(function(result) {
        ////console.log(result);
        for (var x of result.records) {
          result1.push({
            "scenarioId":(x._fields[0].identity.low),
            "scenarioName": (x._fields[0].properties.name),
            "scenarioDescription":(x._fields[0].properties.problemstatement)
          });
        }
        //console.log('The Results: ',result1);
        res.send(result1);
      }).catch(function(error) {
      });
    }
};
module.exports = component;
