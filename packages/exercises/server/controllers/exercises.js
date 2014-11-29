'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Exercise = mongoose.model('Exercise'),
  _ = require('lodash');


/**
 * Find article by id
 */
exports.exercise = function(req, res, next, id) {
  Exercise.load(id, function(err, exercise) {
    if (err) return next(err);
    if (!exercise) return next(new Error('Failed to load exercise ' + id));
    req.exercise = exercise;
    next();
  });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
  var exercise = new Exercise(req.body);
  exercise.user = req.user;

  exercise.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
  var exercise = req.exercise;

  exercise = _.extend(exercise, req.body);

  exercise.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
  var exercise = req.exercise;

  exercise.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
  res.json(req.exercise);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
  Exercise.find().sort('-created').populate('user', 'name username').exec(function(err, exercises) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the exercises'
      });
    }
    res.json(exercises);

  });
};
