'use strict';

angular.module('hikariApp')
  .factory('User', function ($resource, ENV) {
    return $resource(ENV.hosts.core + '/api/users/:id', {
      id: '@_id'
    }, {
      save: {
        method: 'POST'
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
