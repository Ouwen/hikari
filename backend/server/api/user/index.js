'use strict';

var express = require('express'),
  controller = require('./user.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.read);
router.post('/', controller.create);
router.put('/me', auth.isAuthenticated(), controller.update);
router.delete('/me', auth.isAuthenticated(), controller.destroy);

module.exports = router;
