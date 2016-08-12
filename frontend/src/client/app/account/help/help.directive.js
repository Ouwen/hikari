'use strict';

angular.module('hikariApp')
  .directive('help', function () {
    return {
      templateUrl: 'app/account/help/help.html',
      restrict: 'E',
      scope: {},
      replace: true,
      link: function () {},
      controller: function ($scope) {
        $scope.contents = [{
          'type': 'General Questions',
          'qas': [{
            'question': 'What is Hikari?',
            'answer': 'Hikari is a lightweight template for making Angular Material 1.x applications. Included is an authentication system (login, logout), splash page, sidebar, navbar, dashboard, and account settings.'
          }, {
            'question': 'What else will be added?',
            'answer': 'Depends what people want/new features from Angular Material'
          }, {
            'question': 'This code looks familiar',
            'answer': 'A lot of the code is based on tylerhenkel\'s angular fullstack code.'
          }]
        }, {
          'type': 'Ipsum Issues',
          'qas': [{
            'question': 'How do I use the application?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }, {
            'question': 'What is Lorem ipsum?',
            'answer': 'Lorem ipsum is filler text. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }],
        }, {
          'type': 'Lorem Issues',
          'qas': [{
            'question': 'Lorem ipsum dolor?',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }, {
            'question': 'Dolor sit amet?',
            'answer': 'Lorem ipsum dolor. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '
          }]
        }];
      }
    };
  });
