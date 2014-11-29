'use strict';

var exercises = require('../controllers/exercises');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.exercise.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Exercises, app, auth) {

  app.route('/exercises')
    .get(exercises.all)
    .post(auth.requiresLogin, exercises.create);
  app.route('/exercises/:exerciseId')
    .get(exercises.show)
    .put(auth.requiresLogin, hasAuthorization, exercises.update)
    .delete(auth.requiresLogin, hasAuthorization, exercises.destroy);

  // Finish with setting up the articleId param
  app.param('exerciseId', exercises.exercise);
};
