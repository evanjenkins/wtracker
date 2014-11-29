'use strict';

var workouts = require('../controllers/workouts');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.exercise.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Workouts, app, auth) {

  app.route('/workouts')
    .get(workouts.all)
    .post(auth.requiresLogin, workouts.create);
  app.route('/workouts/:workoutId')
    .get(workouts.show)
    .put(auth.requiresLogin, hasAuthorization, workouts.update)
    .delete(auth.requiresLogin, hasAuthorization, workouts.destroy);

  // Finish with setting up the articleId param
  app.param('workoutId', workouts.workout);
};
