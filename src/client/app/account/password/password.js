'use strict';

angular.module('hikariApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('password', {
        url: '/password',
        abstract: true,
        template: '<password></password>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'app/account/password/password.forgot.html'
      })
      .state('password.confirm', {
        url: '/confirm',
        templateUrl: 'app/account/password/password.confirm.html'
      })
      .state('password.reset', {
        url: '/reset?token',
        templateUrl: 'app/account/password/password.reset.html'
      })
      .state('password.expired', {
        url: '/expired',
        templateUrl: 'app/account/password/password.expired.html'
      });
  });
