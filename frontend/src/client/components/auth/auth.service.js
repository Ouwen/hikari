'use strict';

angular.module('hikariApp')
  .factory('Auth', function Auth($state, $http, User, $cookies, $q, ENV) {
    var global = {
      currentUser: {}
    };

    if ($cookies.get('token')) {
      global.currentUser = User.get();
    }

    return {
      login: function (user) {
        var deferred = $q.defer();

        var req = {
          method: 'POST',
          url: ENV.hosts.core + '/auth/local',
          data: {
            email: user.email,
            password: user.password
          }
        };
        $http(req).success(function (data) {
          $cookies.put('token', data.token);
          global.currentUser = User.get();
          deferred.resolve(data);
        }).error(function (err) {
          this.logout();
          deferred.reject(err);
        }.bind(this));
        return deferred.promise;
      },

      logout: function () {
        $cookies.remove('token');
        global.currentUser = {};
        $state.go('login');
      },

      createUser: function (user) {
        var self = this;
        var deferred = $q.defer();
        User.save(user).$promise.then(function () {
          return self.login(user);
        }, function (err) {
          deferred.reject(err);
        }).then(function (info) {
          deferred.resolve(info);
        }, function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      changePassword: function (newPassword) {
        return User.update({
          password: newPassword
        }).$promise;
      },

      updateUserDetails: function (userInfo) {
        var deferred = $q.defer();

        User.update({
          name: userInfo.name,
          email: userInfo.email
        }).$promise.then(function (data) {
          global.currentUser = User.get();
          deferred.resolve(data);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },

      getCurrentUser: function () {
        return global.currentUser;
      },

      global: global,

      isLoggedIn: function () {
        return global.currentUser.hasOwnProperty('email');
      },

      isLoggedInAsync: function (cb) {
        if (global.currentUser.hasOwnProperty('$promise')) {
          global.currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (global.currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      getToken: function () {
        return $cookies.get('token');
      }
    };
  });
