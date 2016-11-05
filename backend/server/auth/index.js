'use strict';

var express = require('express'),
  passport = require('passport'),
  config = require('../config/environment'),
  fs = require('fs'),
  auth = require('./auth.service'),
  publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH);

// Passport Configuration
require('./local/passport').setup(config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/public', function (req, res) {
  res.status(200).send(publicKey);
});

module.exports = router;
