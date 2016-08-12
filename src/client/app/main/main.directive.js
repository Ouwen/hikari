'use strict';

angular.module('hikariApp')
  .directive('main', function () {
    return {
      templateUrl: 'app/main/main.html',
      restrict: 'EA',
      scope: {},
      replace: true,
      link: function () {},
      controller: function () {}
    };
  });
