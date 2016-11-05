'use strict';

var config = require('../config/environment'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  compose = require('composable-middleware'),
  crypto = require('crypto'),
  db = require('../db'),
  fs = require('fs'),
  publicKey = fs.readFileSync(config.publicKeyPath),
  privateKey = fs.readFileSync(config.privateKeyPath),
  validateJwt = expressJwt({
    secret: publicKey
  });

/**
 * Middleware for attaching user and permissions to the request object.
 */
var isAuthenticated = function () {
  return compose()
    .use(function (req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    }).use(function (req, res, next) {
      db.pool.query(`SELECT * FROM users WHERE uuid = $1`, [req.user.uuid], function (err, result) {
        if (err) return next(err);
        if (!result.rows.length) return res.status(403).end();
        var user = result.rows[0];
        delete user.salt;
        delete user.hashed_password;
        req.user = user;
        return next();
      });
    });
}

/**
 * Returns a jwt token signed by the private key.
 */
var signToken = function (uuid) {
  return jwt.sign({
    uuid: uuid
  }, privateKey, {
    algorithm: 'RS256'
  });
}

var makeSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (password, salt) {
  if (!password || !salt) return '';
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('base64');
};

var authenticate = function (plainText, salt, hashedPassword) {
  return exports.encryptPassword(plainText, salt) === hashedPassword;
};

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.makeSalt = makeSalt;
exports.encryptPassword = encryptPassword;
exports.authenticate = authenticate;
