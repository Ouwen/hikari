'use strict';

angular.module('hikariApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
      })
      .state('signup', {
        url: '/signup',
        template: '<signup></signup>'
      })
      .state('settings', {
        url: '/settings',
        abstract: true,
        template: '<ui-view />',
        authenticate: true
      })
      .state('settings.account', {
        url: '/account',
        template: '<account-settings></account-settings>',
        authenticate: true
      })
      .state('help', {
        url: '/help',
        template: '<help></help>'
      });
  });
