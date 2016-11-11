/**
 * Main application routes
 */

'use strict';

module.exports = function (app) {

  // Insert routes below
  app.use('/core/v1.0.0/api/users', require('./api/user'));
  app.use('/core/v1.0.0/auth', require('./auth'));

  app.route('/core/v1.0.0').get(function (req, res) {
    return res.json({
      version: '1.0.0',
      environment: process.env.NODE_ENV
    });
  });

  app.route('/').get(function (req, res) {
    return res.json({
      version: '1.0.0',
      environment: process.env.NODE_ENV
    });
  });

  // All other routes get a 404
  app.route('/*').get(function (req, res) {
    return res.status(404).json("404 not found.");
  });
};
