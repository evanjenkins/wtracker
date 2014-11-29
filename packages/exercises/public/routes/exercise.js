'use strict';

//Setting up route
angular.module('mean.exercises').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location) {
      var deferred = $q.defer();

      $http.get('/loggedin').success(function(user) {
        if (user !== '0' && user.roles.indexOf('admin') !== -1) $timeout(deferred.resolve);

        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all exercises', {
        url: '/exercises',
        templateUrl: 'exercises/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create exercise', {
        url: '/exercises/create',
        templateUrl: 'exercises/views/create.html',
        resolve: {
          loggedin: checkAdmin
        }
      })
      .state('edit exercise', {
        url: '/exercises/:exerciseId/edit',
        templateUrl: 'exercises/views/edit.html',
        resolve: {
          loggedin: checkAdmin
        }
      })
      .state('exercise by id', {
        url: '/exercises/:exerciseId',
        templateUrl: 'exercises/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
