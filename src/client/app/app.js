'use strict';

angular.module('hikariApp', [
    'config',
    'ngCookies',
    'ngMaterial',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(false);
    $httpProvider.interceptors.push('authInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'default': '500'
      })
      .accentPalette('orange', {
        'default': '800'
      });
  })
  .factory('authInterceptor', function ($q, $cookies, $injector) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $injector.get('$state').go('login');
          $cookies.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  })

.run(['$state', '$transitions', 'Auth', function ($state, $transitions, Auth) {
  // Redirect to login if route requires auth and you're not logged in

  $transitions.onStart({}, ['$transition$', function ($transition$) {
    Auth.isLoggedInAsync(function (loggedIn) {
      if ($transition$.to().authenticate && !loggedIn) {
        return $state.go('login');
      }
    });
  }]);
}]);
