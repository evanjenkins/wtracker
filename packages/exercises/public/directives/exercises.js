'use strict';

angular.module('mean.exercises').directive('exercise', function() {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elem, attrs, ParentCtrl) {
    },
    templateUrl: '/exercises/views/exercise-directive.html',
    controller: 'ExercisesController'
  };
});