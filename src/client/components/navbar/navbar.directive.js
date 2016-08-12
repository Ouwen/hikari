'use strict';

angular.module('hikariApp')
  .directive('navBar', function () {
    return {
      templateUrl: 'components/navbar/navbar.html',
      restrict: 'EA',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function () {},
      controller: function ($scope, $mdSidenav, Auth, ENV) {
        if (!$scope.title) $scope.title = ENV.label.name;
        $scope.Auth = Auth;
        $scope.ENV = ENV;
        $scope.$mdSidenav = $mdSidenav;
      }
    };
  });
