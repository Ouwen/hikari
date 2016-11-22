'use strict';

angular.module('hikariApp')
  .directive('login', function () {
    return {
      templateUrl: 'app/account/login/login.html',
      restrict: 'EA',
      scope: {},
      replace: true,
      link: function () {},
      controller: function ($scope, $state, Auth, hikariToast) {
        $scope.user = {};
        $scope.errors = {};
        $scope.busy = false;

        $scope.login = function (form) {
          $scope.submitted = true;
          if (form.$valid) {
            $scope.busy = true;
            Auth.login({
              email: $scope.user.email,
              password: $scope.user.password
            }).then(function () {
              $scope.busy = false;
              $state.go('main');
            }).catch(function (err) {
              $scope.busy = false;
              if (err) $scope.errors.message = err.error;
              form.password.$setValidity('server', false);
              hikariToast.error('Wrong email or password.');
            });
          }
        };
      }
    };
  });
