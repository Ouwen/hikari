'use strict';

angular.module('hikariApp')
  .service('hikariToast', function ($mdToast) {

    this.error = function (msg) {
      if (!msg) msg = 'Error.';
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('bottom left')
        .action('Close')
        .highlightAction(true)
        .hideDelay(3000)
      );
    };

    this.success = function (msg) {
      if (!msg) msg = 'Success.';
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('bottom left')
        .action('Close')
        .highlightAction(true)
        .hideDelay(3000)
      );
    };
  });
