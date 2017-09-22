let driver = require('../../config/neo4j');
let session = driver.session();
const logger = require('./../../../systemAppLogger');

let userLevel = {
    loadThemes: function(req, res) {
      let category = req.body.category;
      let results = [];
      // let query1 = 'match (n:domain {name: "' + domainName + '"}) return n';
      let query1 = 'match (n:category{name:"' + category + '"})<-[:theme_of]-(a:theme) return a'
      session.run(query1).then(function(result1) {
        for (let x of result1.records) {
          // console.log("theme................",JSON.stringify(x));
          results.push({
            'theme': (x._fields[0].properties.name)
          });
        }
        res.send(results);
      });
    },
    saveTheme: function(req, res) {
      let theme = req.body.theme;
      let loginId = req.body.loginId;
      let newDate = new Date().getTime();
      let query = 'match (n:loginid{name:"' + loginId + '"})-[rr:select_of]->(m:theme{name:"' + theme + '"}) return rr'
      let query1 = 'match (n:loginid) where n.name="' + loginId + '" match (m:theme{name:"' + theme + '"}) merge (n)-[r:select_of{startTime:"' + newDate + '",endTime:"",status:"wip",score:0}]->(m) return n,r,m'
      session.run(query).then(function(result1) {
        if(result1.records.length == 0) {
          session.run(query1).then(function() {
            res.send('success');
          })
        } else {
          res.send('success');
        }
       });
    },
    loadStage: function(req, res) {
      let theme = req.body.theme;
      let results = [];
      let query1 = 'match (n:theme{name:"' + theme + '"})<-[:stage_of]-(a:stage) return a,n'
      session.run(query1).then(function(result1) {
        for (let x of result1.records) {
          console.log(x._fields[0].properties);
            console.log(x._fields[0].properties.sequence);
              console.log(x._fields);
                console.log(x._fields.length);
          results.push({
            id:(x._fields[0].identity.low),
            sequence: (x._fields[1].properties.sequence),
            stage: (x._fields[0].properties.name),
            material: (x._fields[0].properties.material),
            description: (x._fields[0].properties.description)
          });
        }
        res.send(results);
      });
    },
    getQuestions: function(req, res) {
        let query = 'match(a:stage)<-[r:question_of]-(u:question) where id(a)=' + req.body.stageId + ' WITH u, rand() AS number RETURN u ORDER BY number';
        session.run(query).then(function(result) {
            if (result) {
              console.log(result.records);
              let queData = [];
              result.records.map(function(item){
                console.log("item inside map: ",item);
                queData.push(item._fields[0].properties);
                console.log("quedata after push: ", queData);
                if(result.records.length == queData.length) {
                    res.send(queData);
                }
              });
            }
        });
}
};
module.exports = userLevel;
