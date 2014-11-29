'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Record Schema
 */
var RecordSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  workout: {
    type: String,
    required: true
  },
  best: {

  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Statics
 */
RecordSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

RecordSchema.statics.findUserRecords = function(userId, cb) {
  this.find({
    user: userId
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Record', RecordSchema);