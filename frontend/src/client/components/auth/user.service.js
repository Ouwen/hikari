'use strict';

angular.module('hikariApp')
  .factory('User', function ($resource, ENV) {
    return $resource(ENV.hosts.core + '/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          id: 'me',
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      update: {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          id: 'me'
        },
      }
    });
  });
