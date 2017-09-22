'use strict';
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('../config/');
// const logger = require('./../../systemAppLogger');
const passport = require('./../authentication/passport.js');
const connectflash = require('connect-flash');
const multer = require('multer');
const dookie = require('dookie');
const fs = require('fs');
const {users} = require('./users/userEntity');
let driver = require('./config/neo4j');
let session = driver.session();
let log4js = require('log4js');
function createApp() {
  const app = express();
  return app;
}

function setupStaticRoutes(app) {
  app.use(express.static(path.resolve(__dirname, '../', 'webclient')));
  return app;
}

function setupRestRoutes(app) {
  // console.log('Inside service setupRestRoutes');
  app.use('/users', require(path.join(__dirname, './users')));
  app.use('/admin', require(path.join(__dirname, './admin')));
  app.use('/profile', require(path.join(__dirname, './profile')));
  app.use('/dnd', require(path.join(__dirname, './dnd')));
  app.use('/component', require(path.join(__dirname, './component')));
  app.use('/scenario', require(path.join(__dirname, './scenario')));
  app.use('/Components', require(path.join(__dirname, './Components')));
  app.use('/trial', require(path.join(__dirname, './trial')));
  app.use('/userDashboard', require(path.join(__dirname, './userDashboard')));
  // For gamification
    app.use('/gameadmin', require(path.join(__dirname, './gameadmin')));
  app.use('/userGame', require(path.join(__dirname, './game/userGame')));
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './server/CsvFiles');
        cb(null, 'D:\\default.graphdb');
    },filename: function(req, file, cb) {
      const name = 'arun.csv';
      cb(null, name);
    }
  });
  const upload = multer({storage: storage});
  app.get('/download', function(req, res){
    path.join(__dirname, '../systemLog/app.log');
    var file = path.join(__dirname, '../systemLog/app.log');
    res.download(file);
    console.log(file);
  });
  app.get('/downloadAccountsLog', function(req, res){
    path.join(__dirname, '../accounts.log');
    var file = path.join(__dirname, '../accounts.log');
    res.download(file);
    console.log(file);
  });
  app.get('/downloadEnggServicesLog', function(req, res){
    path.join(__dirname, '../engineeringServices.log');
    var file = path.join(__dirname, '../engineeringServices.log');
    res.download(file);
    console.log(file);
  });
  app.post('/upload', upload.any('csv'),  function(req,res) {
    var idArray = [];
    var teamArray = [];
    users.find(function(err, alldetails) {
      if (err) {
        //console.log(err);
      } else {
        //console.log('databaseee'+alldetails);
        for (var ia = 0; ia < alldetails.length; ia++) {
          idArray.push(alldetails[ia].empId);
        }
            const data = fs.readFileSync(__dirname+'/CsvFiles/arun.csv', 'utf8');
            let data1 = data.split('\n');
            for (var i = 1; i < data1.length - 1; i++) {
            let arr = data1[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            console.log('value is : ',arr[4]);
            //console.log(idArray.includes(arr[1]));
              if(idArray.includes(arr[1])){
                  //console.log('already present');
              } else {
                if(teamArray.includes(arr[4])){}else{
                  teamArray.push(arr[4]);
                }
              let newUser = new users(
                {empId:arr[0],
                  loginId:arr[1],
                  userName:arr[2],
                  userType:arr[3],
                  teamName:arr[4],
                  emailId:arr[5].replace("\r","")
                });
                newUser.save(function(err) {
                  if (err) {
                    // res.send('Error');
                    //console.log("error",err);
                  } else {
                    // res.send('Success');
                    //console.log('added successfully');
                  }
                });
              }
              }
      }
      //console.log('Array is : ',teamArray);
      //neo4j upload HERE
      let session = driver.session();
      let aaaa = JSON.stringify(teamArray);
      let query1 =  'unwind '+aaaa+' as id merge (n:team{name:id,score:0}) return n';
      session.run(query1).then(function(result1) {
      console.log("success", result1);
      let query2 = 'LOAD CSV  FROM "'+'file:///arun.csv'+'" AS line\
                    match(n:team) where n.name= line[4]\
                    merge(a:loginid{name:line[1],username:line[2]})-[r:user_of]->(n)';
                    console.log("query for upload bulk user:",query2);
                    session.run(query2).then(function(result1) {
                      console.log("data after neo upload:", result1);
                    }).catch(function(error) {
                      console.log('promise error: ', error);
                    });
                  }).catch(function(error) {
                      //console.log('promise error: ', error);
                    });
    });



    });

    //bulk upload of component
  let storage1 = multer.diskStorage({
     destination: function(req, file, cb) {
         cb(null, 'D:\\default.graphdb');
     },filename: function(req, file, cb) {
         const name = 'componentUploadnew.csv';
         cb(null, name);
     }
  });
  const uploadComponent = multer({storage: storage1});
  //console.log("inside route");
   app.post('/uploadComponent', uploadComponent.any('csv'),  function(req,res){
         //console.log("checking now",res);
         var result1 = [];
          // const data = fs.readFileSync(__dirname+'/CsvFiles/componentUpload.csv', 'utf8');
        //  //console.log("data value "+data);
         let session = driver.session();
          let query1 = 'LOAD CSV  FROM "' +'file:///componentUploadnew.csv'+ '" AS line \
       merge (n:component { name: line[0], category: line[1], description: line[2], errormsg: line[3]}) return n'
       session.run(query1).then(function(result1) {
            res.redirect('/#/adminHome');
       }).catch(function(error) {
         //console.log('promise error: ', error);
       });
   });


    app.use(function(req, res) {
      let err = new Error('Resource not found');
      err.status = 404;
      return res.status(err.status).json({
        error: err.message
      });
    });

    app.use(function(err, req, res) {
      // logger.error('Internal error in watch processor: ', err);
      return res.status(err.status || 500).json({
        error: err.message
      });
    });

    return app;
  }

  function setupMiddlewares(app) {
    //  For logging each requests
    app.use(morgan('dev'));
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));

    app.use(require('express-session')({secret:'accesskey'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(connectflash());

    const compression = require('compression');
    app.use(compression());

    app.use(function(req,res,next)
    {
      res.header('Access-Control-Allow-Origin',"*");
      res.header('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
      res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
    });

    return app;
  }

  function setupWebpack(app) {
    if (config.NODE_ENV !== 'production') {
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');

      const webpackConfig = require('../webpack.config.js');
      const webpackCompiler = webpack(webpackConfig);

      app.use(webpackHotMiddleware(webpackCompiler));
      app.use(webpackDevMiddleware(webpackCompiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        },
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        }
      }));
      // app.use(webpackDevMiddleware(webpackCompiler, {
      //   noInfo: true,
      //   publicPath: webpackConfig.output.publicPath
      // }));
    }
    return app;
  }

  function setupMongooseConnections() {
    mongoose.connect(config.MONGO_URL);

    mongoose.connection.on('connected', function() {
      // logger.debug('Mongoose is now connected to ', config.MONGO_URL);
    });

    mongoose.connection.on('error', function(err) {
      // logger.error('Error in Mongoose connection: ', err);
    });

    mongoose.connection.on('disconnected', function() {
      // logger.debug('Mongoose is now disconnected..!');
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        // logger.info(
        //   'Mongoose disconnected on process termination'
        // );
        process.exit(0);
      });
    });
  }

  // App Constructor function is exported
  module.exports = {
    createApp: createApp,
    setupStaticRoutes: setupStaticRoutes,
    setupRestRoutes: setupRestRoutes,
    setupMiddlewares: setupMiddlewares,
    setupMongooseConnections: setupMongooseConnections,
    setupWebpack: setupWebpack
  };
