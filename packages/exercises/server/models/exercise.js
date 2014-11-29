'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Exercise Schema
 */
var ExerciseSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  works: {
    type: Array,
    required: true,
    trim: false
  },
  photo: {
    type: String,
    required: false,
    trim: false
  },
  description: {
    type: String,
    required: false,
    trim: false
  },
  equipment: {
    type: String
  },
  category: {
    type: String
  },
  othernames: {
    type: String,
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
ExerciseSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');


/**
 * Statics
 */
ExerciseSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};


mongoose.model('Exercise', ExerciseSchema);