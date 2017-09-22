'use strict';
const path = require('path');

const service = require('./service');

function setupWebAppRESTRoutes(app) {
  app.use('/users', require(path.join(__dirname, './users')));
  return app;
}

// App Constructor function is exported
module.exports = function() {
  let app = service.createApp();

  app = service.setupWebpack(app);

  app = service.setupStaticRoutes(app);

  app = service.setupMiddlewares(app);

  app = service.setupRestRoutes(app);

  service.setupMongooseConnections();



  return app;
};
