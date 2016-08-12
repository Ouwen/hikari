'use strict';

angular.module('hikariApp')
  .factory('Password', function ($state, $resource, ENV) {
    return $resource(ENV.hosts.core + '/users/password/:option', {
      option: '@_option'
    }, {
      getResetLink: {
        method: 'GET',
        params: {
          option: 'reset'
        }
      },
      postNewPassword: {
        method: 'POST',
        params: {
          option: 'reset'
        }
      },
      getVerifiedToken: {
        method: 'GET',
        params: {
          option: 'verify'
        }
      }
    });
  });
