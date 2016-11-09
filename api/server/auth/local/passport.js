var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Auth = require('../auth.service'),
  db = require('../../db'),
  config = require('../../config/environment');

exports.setup = function (config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      db.pool.query(`SELECT * FROM users WHERE email = $1`, [email], function (err, result) {
        if (err) return done(err);
        if (!result.rows.length) return done(null, false, {
          message: 'This email is not registered.'
        });
        var user = result.rows[0];
        if (!Auth.authenticate(password, user.salt, user.hashed_password)) return done(null, false, {
          message: 'This password is not correct.'
        });
        return done(null, user);
      });
    }
  ));
};
