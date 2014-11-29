'use strict';

//Setting up route
angular.module('mean.workouts').config(['$stateProvider',
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

    //var checkAdmin = function($q, $timeout, $http, $location) {
    //  var deferred = $q.defer();
    //
    //  $http.get('/loggedin').success(function(user) {
    //    if (user !== '0' && user.roles.indexOf('admin') !== -1) $timeout(deferred.resolve);
    //
    //    else {
    //      $timeout(deferred.reject);
    //      $location.url('/login');
    //    }
    //  });
    //
    //  return deferred.promise;
    //};

    // states for my app
    $stateProvider
      .state('all workouts', {
        url: '/workouts',
        templateUrl: 'workouts/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create workout', {
        url: '/workouts/create',
        templateUrl: 'workouts/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit workout', {
        url: '/workouts/:workoutId/edit',
        templateUrl: 'workouts/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('workout by id', {
        url: '/workouts/:workoutId',
        templateUrl: 'workouts/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
