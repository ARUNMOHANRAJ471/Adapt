module.exports = (function() {
  let neo4j = require('neo4j-driver').v1;
  let driver = neo4j.driver('bolt://127.0.0.1', neo4j.auth.basic('neo4j', 'neo4js'));
  return driver;
}());
