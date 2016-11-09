'use strict';

// Development specific configuration
// ==================================
module.exports = {
  seedDB: true,
  conString: process.env.POSTGRES_DEVELOPEMENT_URL,
};
