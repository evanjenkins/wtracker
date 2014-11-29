'use strict';

//Workouts service used for workouts REST endpoint
angular.module('mean.workouts').factory('Workouts', ['$resource',
  function($resource) {
    return $resource('workouts/:workoutId', {
      workoutId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      find: {
        method: 'GET',
        isArray: true
      },
      get: {
        method: 'GET'
      }
    });
  }
]);
