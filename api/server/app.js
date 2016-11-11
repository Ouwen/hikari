'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
  config = require('./config/environment'),
  pg = require('pg');

// Setup Database
pg.defaults.poolSize = config.pg.poolSize;

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);
require('./db');

// Start server
if (!module.parent) {
  server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
} else {
  console.log('Express server exists listening on %d, in %s mode', config.port, app.get('env'));
}

// Expose app
exports = module.exports = app;
