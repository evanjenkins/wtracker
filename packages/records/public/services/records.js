'use strict';

//Workouts service used for workouts REST endpoint
angular.module('mean.records').factory('Records', ['$resource',
  function($resource) {
    return $resource('records/:recordId', {
      recordId: '@_id'
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
