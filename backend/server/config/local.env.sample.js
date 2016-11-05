'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.
// You will need to setup postgres databases found in farmshots-sql

module.exports = {
  DOMAIN: 'http://localhost:3000',
  PUBLIC_KEY_PATH: '',
  PRIVATE_KEY_PATH: '',
  POSTGRES_DEVELOPEMENT_URL: '',
  POSTGRES_PRODUCTION_URL: '',
  POSTGRES_TEST_URL: '',
  DATABASE_POOL_SIZE: 25,
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
