'use strict';

angular.module('hikariApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main></main>',
      });
  });
