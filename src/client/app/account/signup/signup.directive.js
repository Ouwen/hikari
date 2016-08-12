'use strict';

angular.module('hikariApp')
  .directive('signup', function () {
    return {
      templateUrl: 'app/account/signup/signup.html',
      restrict: 'EA',
      scope: {},
      replace: true,
      link: function () {},
      controller: function ($scope, Auth, hikariToast, $state) {
        $scope.user = {};
        $scope.errors = {};
        $scope.busy = false;

        $scope.register = function (form) {
          $scope.submitted = true;
          if (form.$valid) {
            $scope.busy = true;
            Auth.createUser({
              name: $scope.user.name,
              email: $scope.user.email,
              password: $scope.user.password
            }).then(function () {
              $scope.busy = false;
              hikariToast.success('Created user account.');
              $state.go('main');
            }).catch(function (err) {
              /*
                err.data comes in the following form. Keys should be email, name, and password.
                {
                  [{
                    key: '...',
                    message: '...'
                  }]
                }
              */
              $scope.busy = false;
              err.data.errors.forEach(function (err) {
                form[err.key].$setValidity('server', false);
                $scope.errors[err.key] = err.message;
              });
            });
          }
        };
      }
    };
  });
