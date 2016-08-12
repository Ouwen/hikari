'use strict';

angular.module('hikariApp')
  .directive('baseDirective', function () {
    return {
      templateUrl: 'app/base/base.html',
      restrict: 'EA'
    };
  });
