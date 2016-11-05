/**
 * Main application routes
 */

'use strict';

module.exports = function (app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // All other routes get a 404
  app.route('/*').get(function (req, res) {
    return res.status(404).json("404 not found.");
  });
};
