'use strict';

angular.module('mean.workouts').controller('WorkoutsController', ['$scope', '$stateParams', '$location', '$timeout', 'Global', '$filter', 'Workouts', 'Exercises', 'Shared', 'Records',
  function($scope, $stateParams, $location, $timeout, Global, $filter, Workouts, Exercises, Shared, Records) {
    $scope.global = Global;

    var basics = Shared.getBasics();
    $scope.muscles = basics.muscles;
    $scope.equipments = basics.equipments;
    $scope.categories = basics.categories;

    var ExObj = function(ex) {
      this.id = ex._id;
      this.sets = [];
    };

    $scope.checkNotEmpty = function(data) {
      if (data === '') {
        return 'Can not be blank.';
      }
      else {
        $timeout(function() {
          $scope.update(true);
        }, 1000);
      }
    };

    $scope.hasAuthorization = function(workout) {
      if (!workout || !workout.user) return false;
      return $scope.global.isAdmin || workout.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var workout = new Workouts({
          title: this.title,
          finished: this.finished,
          workoutsExercises: this.workoutsExercises
        });
        workout.$save(function(response) {
          //$location.path('workout/' + response._id);
        });
        $scope.currentWorkout = workout;
        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(workout) {
      if (workout) {
        workout.$remove(function(response) {
          for (var i in $scope.workouts) {
            if ($scope.workouts[i] === workout) {
              $scope.workouts.splice(i, 1);
            }
          }
          $location.path('workouts');
        });
      } else {
        $scope.currentWorkout.$remove(function(response) {
          $location.path('workouts');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var workout = $scope.currentWorkout;
        if (!workout.updated) {
          workout.updated = [];
        }
        workout.updated.push(new Date().getTime());

        workout.$update(function() {
          //$location.path('workouts/' + exercise._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function(cb) {
      if ($scope.global.user.roles.indexOf('admin') !== -1) {
        Workouts.query(function(workouts) {
          $scope.workouts = workouts;
          if (typeof cb !== 'undefined') cb();
        });
      }
      else {
        Workouts.find({
          userId: $scope.global.user._id
        }, function(workouts) {
          $scope.workouts = workouts;
          if (typeof cb !== 'undefined') cb();
        });
      }
    };

    $scope.findOne = function() {
      Workouts.get({
        workoutId: $stateParams.workoutId
      }, function(workout) {
        $scope.currentWorkout = workout;
      });
    };

    $scope.beginCreation = function() {
      $scope.inExercise = false;
      $scope.title = $filter('date')(new Date(), 'EEE MMM d, yyyy');
      $scope.finished = false;
      Exercises.query(function(exercises) {
        $scope.exercises = exercises;
      });
    };

    // Starting an exercise
    $scope.startExercise = function(ex) {
      if (typeof $scope.currentWorkout === 'undefined') {
        $scope.create(true);
        $scope.currentWorkout.workoutsExercises = [];
      }
      $scope.inExercise = true;
      $scope.currentExercise = ex;
      $scope.currentWorkout.workoutsExercises.push(new ExObj(ex));
      $scope.currentExercise.index = $scope.currentWorkout.workoutsExercises.length - 1;
      $scope.currentWorkout.workoutsExercises[$scope.currentExercise.index].sets.push({'reps': '', 'lb': '', 'repMax': '', 'pr': false});
    };

    $scope.addSet = function(ex) {
      $scope.currentWorkout.workoutsExercises[$scope.currentExercise.index].sets.push({'reps': '', 'lb': '', 'repMax': '', 'pr': false});
      $scope.update(true);
      $scope.checkPr(ex, $scope.currentWorkout.workoutsExercises[$scope.currentExercise.index].sets[$scope.currentWorkout.workoutsExercises[$scope.currentExercise.index].sets.length - 2]);
    };

    $scope.checkPr = function(ex, addedSet) {

    };

    $scope.pushExercise = function(ex) {
      $scope.update(true);
      $scope.inExercise = false;
    };

    $scope.calulateMax = function(currentSet) {
      var max = Math.round(((currentSet.lb * currentSet.reps * 0.033) + currentSet.lb) * 100) / 100;
      currentSet.repMax = max;
      return max;
    };

    $scope.removeSet = function(index, sets) {
      sets.splice(index, 1);
    };

  }
]);
