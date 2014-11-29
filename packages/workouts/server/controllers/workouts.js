'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Workout = mongoose.model('Workout'),
  _ = require('lodash');


/**
 * Find article by id
 */
exports.workout = function(req, res, next, id) {
  Workout.load(id, function(err, workout) {
    if (err) return next(err);
    if (!workout) return next(new Error('Failed to load Workout ' + id));
    req.workout = workout;
    next();
  });
};

/**
 * Create a workout
 */
exports.create = function(req, res) {
  var workout = new Workout(req.body);
  workout.user = req.user;

  workout.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the workout'
      });
    }
    res.json(workout);

  });
};

/**
 * Update a workout
 */
exports.update = function(req, res) {
  var workout = req.workout;

  workout = _.extend(workout, req.body);

  workout.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the workout'
      });
    }
    res.json(workout);

  });
};

/**
 * Delete a workout
 */
exports.destroy = function(req, res) {
  var workout = req.workout;

  workout.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the workout'
      });
    }
    res.json(workout);

  });
};

/**
 * Show a workout
 */
exports.show = function(req, res) {
  res.json(req.workout);
};

/**
 * List of workouts
 */
exports.all = function(req, res) {
  if (req.query.userId) {
    Workout.findUsersWorkouts(req.query.userId, function(err, workouts) {
      if (err) return res.json({'error': true});
      if (!workouts) return res.json({'status': false});
      req.status = true;
      req.workouts = workouts;
      res.json(workouts);
    });
  }
  else {
    Workout.find().sort('-created').populate('user', 'name username').exec(function(err, workouts) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the workouts'
        });
      }
      res.json(workouts);

    });
  }
};
