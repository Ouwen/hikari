'use strict';

var User = require('./user.model'),
  _ = require('lodash'),
  auth = require('../../auth/auth.service');

const user_params = ['name', 'email', 'password'];

var modelError = function (res) {
  return function (err) {
    return res.status(500).json(err.code);
  }
};

exports.create = function (req, res) {
  req.checkBody('name', 'required').notEmpty();
  req.checkBody('email', 'valid email required').notEmpty().isEmail();
  req.checkBody('password', 'required').notEmpty();

  var errors = req.validationErrors(true);
  if (errors) return res.status(400).json(errors);

  var user = _.pick(req.body, user_params);
  User.create_user(user).then(function (result) {
    return res.status(201).json({
      token: auth.signToken(result.rows[0].uuid)
    });
  }).catch(modelError(res));
};

exports.read = function (req, res) {
  return res.status(200).json(req.user);
};

exports.update = function (req, res) {
  req.checkBody('name', 'cannot be empty').optional().notEmpty();
  req.checkBody('email', 'valid email required').optional().notEmpty().isEmail();
  req.checkBody('password', 'cannot be empty').optional().notEmpty();

  var errors = req.validationErrors(true);
  if (errors) return res.status(400).json(errors);

  var user = _.pick(req.body, user_params);
  User.update_user(req.user.uuid, user).then(function (result) {
    var user = result.rows[0];
    delete user.salt;
    delete user.hashed_password;
    return res.status(200).json(user);
  }).catch(modelError(res));
};

exports.destroy = function (req, res) {
  User.destroy_user(req.user.uuid).then(function () {
    return res.status(204).end();
  }).catch(modelError(res));
};
