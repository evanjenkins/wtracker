'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Record = mongoose.model('Record'),
  _ = require('lodash');


/**
 * Find article by id
 */
exports.record = function(req, res, next, id) {
  Record.load(id, function(err, record) {
    if (err) return next(err);
    if (!record) return next(new Error('Failed to load record ' + id));
    req.record = record;
    next();
  });
};

/**
 * Create a workout
 */
exports.create = function(req, res) {
  var record = new Record(req.body);
  record.user = req.user;

  record.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the record'
      });
    }
    res.json(record);

  });
};

/**
 * Update a workout
 */
exports.update = function(req, res) {
  var record = req.record;

  record = _.extend(record, req.body);

  record.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the record'
      });
    }
    res.json(record);

  });
};

/**
 * Delete a workout
 */
exports.destroy = function(req, res) {
  var record = req.record;

  record.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the record'
      });
    }
    res.json(record);

  });
};

/**
 * Show a workout
 */
exports.show = function(req, res) {
  res.json(req.record);
};

/**
 * List of workouts
 */
exports.all = function(req, res) {
  if (req.query.userId) {
    Record.findUserRecords(req.query.userId, function(err, records) {
      if (err) return res.json({'error': true});
      if (!records) return res.json({'status': false});
      req.status = true;
      req.records = records;
      res.json(records);
    });
  }
  else {
    Record.find().sort('-created').populate('user', 'name username').exec(function(err, records) {
      if (err) {
        return res.json(500, {
          error: 'Cannot list the records'
        });
      }
      res.json(records);

    });
  }
};
