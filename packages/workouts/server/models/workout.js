'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Exercise Schema
 */
var WorkoutSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  finished: {
    type: Boolean,
    required: true,
    trim:false
  },
  workoutsExercises: {
    type: Array,
    required: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
WorkoutSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');


/**
 * Statics
 */
WorkoutSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

WorkoutSchema.statics.findUsersWorkouts = function(userId, cb) {
  this.find({
    user: userId
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Workout', WorkoutSchema);