'use strict';

angular.module('mean.exercises').controller('ExercisesController', ['$scope', '$stateParams', '$location', 'Global', 'Exercises', 'Shared',
  function($scope, $stateParams, $location, Global, Exercises, Shared) {
    $scope.global = Global;
    // Make this an admin setting somewhere.
    var basics = Shared.getBasics();
    $scope.muscles = basics.muscles;
    $scope.equipments = basics.equipments;
    $scope.categories = basics.categories;

    $scope.works = [];

    $scope.removeItem = function(item, list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
          list.splice(i, 1);
        }
      }
    };

    /**
     * Adds an item to a list.
     * @param {string} item
     *  The item to add
     *
     */
    $scope.addItem = function(item, list) {
      var added = false;
      for (var i = 0; i < list.length; i++) {
        if (list[i] === item) {
          added = true;
        }
      }
      if (!added) {
        list.push(item);
      }
    };

    $scope.uploadFinished = function(files) {
      $scope.images = files;
      $scope.photo = files[0].src;
      if (typeof $scope.exercise.photo !== 'undefined')
        $scope.exercise.photo = $scope.photo;
    };

    $scope.hasAuthorization = function(exercise) {
      if (!exercise || !exercise.user) return false;
      return $scope.global.isAdmin || exercise.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var exercise = new Exercises({
          title: this.title,
          description: this.description,
          photo: $scope.photo,
          works: this.works,
          equipment: this.equipment,
          category: this.category,
          othernames: this.othernames
        });
        exercise.$save(function(response) {
          console.log(response);
          //$location.path('exercise/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(exercise) {
      if (exercise) {
        exercise.$remove(function(response) {
          for (var i in $scope.exercises) {
            if ($scope.exercises[i] === exercise) {
              $scope.exercises.splice(i, 1);
            }
          }
          $location.path('exercises');
        });
      } else {
        $scope.exercise.$remove(function(response) {
          $location.path('exercises');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var exercise = $scope.exercise;
        if (!exercise.updated) {
          exercise.updated = [];
        }
        exercise.updated.push(new Date().getTime());

        exercise.$update(function() {
          $location.path('exercises/' + exercise._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Exercises.query(function(exercises) {
        $scope.exercises = exercises;
      });
    };

    $scope.findOne = function() {
      Exercises.get({
        exerciseId: $stateParams.exerciseId
      }, function(exercise) {
        $scope.exercise = exercise;
      });
    };

    // For directive
    $scope.findThis = function(exId) {
      Exercises.get({
        exerciseId: exId
      }, function(exercise) {
        $scope.returnEx = exercise;
      });
    };
  }
]);
