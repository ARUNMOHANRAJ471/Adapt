const {users} = require('../users/userEntity');
let driver = require('../config/neo4j');
const logger = require('./../../systemAppLogger');
let session = driver.session();

let profile = {
    viewProfile: function(req, res) {
      if(req.body.userType == "User"){
    logger.info(req.body.userType+" - "+req.body.userName+" - select - profile");
  }
      //////console.log(req.body);
        users.find({empId:req.body.empId},(function(err, profile) {
            if (err) {
                res.send(err);
                //console.log(err);
            } else {
                // send the datas of user
                //console.log("data from db",profile);
                res.send(profile);
            }
        })
    )

    },
    changeProfilePicture: function(req, res) {
    ////console.log("changeProfilePicture success");
        users.update({
            empId: req.body.empId
        }, {
            $set: {
                'picture': req.body.picture
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }else {
            res.send('Updated userinfo successfully');
          }
        });
    },
    changePassword:function(req,res){
      let data = req.body;
      users.update({'empId':data.empId},
        {'$set': {
          'password': req.body.newPwd
        }},function(err){
          if (err) {
               res.send(err);
             } else {
               res.send('success');
             }
           }
         );

    },
    getDomain: function(req, res) {
      let query = "match (n:scenario) where id(n)="+req.body.scenarioId+" match (n)-[]->(m:domain) return m.name";
      //console.log("getDomainQuery",query);
      session.run(query).then(function(result) {
                //console.log(result.records);
                if (result) {
                    res.send(result.records[0]._fields[0]);
                    // //console.log('before result');
                    // res.send(result.records[0]._fields[0]);
                    // //console.log('after result');
                }
            }, function() {
                //console.log('error while connecting',err);
            });
    },
    changeDescription: function(req, res) {
      // req.body.userId;req.body.description;
      users.find({
          'empId':req.body.userId
        },function(err, docs) {
          if (err) throw err;

          docs[0].userDescription = req.body.description;
          docs[0].save(function(err) {
            if (err) throw err;
            res.send(req.body.description);
          });
        }
      );
    },
    getDetailsOfTeam: function(req, res) {
      let u = 'User'
      users.find({
          'teamName':req.body.teamName,
          'userType':u
        },function(err, docs) {
          if (err) throw err;
            res.send(JSON.stringify(docs));
        }
      );
    }
};
module.exports = profile;
