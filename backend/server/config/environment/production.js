'use strict';

// Production specific configuration
// =================================
module.exports = {
  ip: process.env.IP || undefined,
  seedDB: false,
  conString: process.env.POSTGRES_PRODUCTION_URL,
};
