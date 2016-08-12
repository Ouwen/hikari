'use strict';

angular.module('hikariApp')
  .directive('sideBar', function () {
    return {
      templateUrl: 'app/base/sidebar/sidebar.html',
      restrict: 'EA',
      scope: {},
      controller: function ($scope, $mdSidenav, $state, Auth, ENV) {
        $scope.Auth = Auth;
        $scope.ENV = ENV;
        $scope.$state = $state;
        $scope.toggle = function () {
          $mdSidenav('sidebar').toggle();
        };
      }
    };
  });
