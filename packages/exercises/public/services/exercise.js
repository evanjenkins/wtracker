'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.exercises').factory('Exercises', ['$resource',
  function($resource) {
    return $resource('exercises/:exerciseId', {
      exerciseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


angular.module('mean.exercises').factory('Shared', ['$resource',
  function($resource) {
    var shared = {};

    shared.getBasics = function() {
      var basics = {};
      basics.muscles = [
        'Full Body',
        'Abdominals',
        'Abductors',
        'Adductors',
        'Biceps',
        'Calves',
        'Chest',
        'Forearms',
        'Glutes',
        'Hamstrings',
        'Lats',
        'Lower Back',
        'Middle Back',
        'Neck',
        'Quads' ,
        'Shoulders',
        'Traps',
        'Triceps'
      ];

      basics.equipments = [
        'Bands',
        'Barbell',
        'Body Only',
        'Cable',
        'Dumbell',
        'E-Z Curl Bar',
        'Exercise Ball',
        'Foam Roll',
        'Kettlebells',
        'Machine',
        'Medicine Ball',
        'None',
        'Other'
      ];

      basics.categories = [
        'Strength',
        'Cardio',
        'Stretching',
        'Plyo',
        'Custom',
      ];
      console.log(basics);
      return basics;
    };

    return shared;
  }
]);