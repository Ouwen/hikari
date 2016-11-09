'use strict';

var express = require('express'),
  controller = require('./user.controller'),
  config = require('../../config/environment'),
  auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:redis_uuid', auth.isAuthenticated(), controller.read);
router.post('/', controller.create);
router.put('/:redis_uuid', auth.isAuthenticated(), controller.update);
router.delete('/:redis_uuid', auth.isAuthenticated(), controller.destroy);

module.exports = router;
