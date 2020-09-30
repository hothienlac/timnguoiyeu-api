const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// Passport
const passport = require('passport');
const strategies = require('./passport-strategy');

// Pagination
const pagination = require('./pagination');

// Access Logging
// const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../../../logs/access.log'),
    {flags: 'a'},
);

const routes = require('app/routes');
const modules = require('app/modules');

const expressLoader = () => {
  // Create Express App
  const app = express();

  // Heath Check
  app.get('/', (req, res) => {
    return res.status(200).json({msg: 'App is working'});
  });

  // Allow Only Proxy with HTTPS, do not answer HTTP request
  app.enable('trust proxy');

  app.use(compression());

  app.use(cors());
  app.use(helmet());

  // Access logging
  // app.use(morgan('dev', {stream: accessLogStream}));

  // Body Parsing
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Using Passport
  app.use(passport.initialize());
  passport.use('jwt', strategies);

  // Use Pagination
  app.use(pagination);

  // Use routes
  app.use('/', routes(modules));

  // Return the express app
  return app;
};

module.exports = expressLoader;
