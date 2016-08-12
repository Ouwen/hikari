'use strict';

angular.module('hikariApp')
  .directive('accountSettings', function () {
    return {
      templateUrl: 'app/account/settings/settings.account.html',
      restrict: 'EA',
      scope: {},
      replace: true,
      controller: function ($scope, Auth, hikariToast) {
        $scope.currentUser = {};
        $scope.busy = false;

        Auth.global.currentUser.$promise.then(function (user) {
          $scope.currentUser = user;
        });

        $scope.updateAccountDetails = function (detailsForm) {
          if (detailsForm.$valid) {
            $scope.busy = true;
            Auth.updateUserDetails($scope.currentUser).then(function () {
              $scope.busy = false;
              hikariToast.success('Account Details Updated.');
            }, function (err) {
              $scope.busy = false;
              console.error(err);
              hikariToast.error();
            });
          }
        };

        $scope.changePassword = function (passwordForm) {
          if (passwordForm.$valid) {
            $scope.busy = true;
            Auth.changePassword($scope.currentUser.newPassword).then(function () {
              $scope.busy = false;
              hikariToast.success('Password Changed.');
            }, function (err) {
              $scope.busy = false;
              console.error(err);
              hikariToast.error();
            });
          }
        };
      }
    };
  });
