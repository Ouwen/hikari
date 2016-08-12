'use strict';

angular.module('hikariApp')
  .directive('password', function () {
    return {
      templateUrl: 'app/account/password/password.html',
      restrict: 'EA',
      scope: {
        'ready': '=?'
      },
      replace: true,
      controller: function ($scope, $state, $stateParams, Password, hikariToast) {
        $scope.state = null;

        $scope.control = {
          init: function (next) {
            $scope.state = {
              email: null,
              submitted: false,
              currentUser: {
                newPassword: null,
                confirmPassword: null
              }
            };

            $scope.control.isValid().then(function () {
              if (next) next({
                state: $scope.state,
                control: $scope.control
              });
            });
          },
          isValid: function (token) {
            return Password.getVerifiedToken({
              token: token
            }).$promise.then(function (data) {
              if (data.is_valid) $state.go('password.reset');
              else $state.go('password.expired');
            });
          },
          user: {
            getResetLink: function (form, email) {
              $scope.state.submitted = true;
              if (form.$valid) {
                Password.getResetLink({
                  email: email
                }).$promise.then(function () {
                  $state.go('password.confirm');
                }).catch(function () {
                  hikariToast.error('An account does not exist for this email address.');
                });
              }
            },
            postNewPassword: function (form, newPassword) {
              if (form.$valid && $scope.control.isValid()) {
                Password.postNewPassword({
                  token: $stateParams.token,
                  new_password: newPassword
                }).$promise.then(function () {
                  $state.go('login');
                  hikariToast.success('Password changed.');
                }, function () {
                  hikariToast.error();
                });
              }
            }
          }
        };

        $scope.control.init($scope.ready);
      }
    };
  });
