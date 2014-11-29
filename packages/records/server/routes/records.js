'use strict';

var records = require('../controllers/records');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.exercise.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Records, app, auth) {

  app.route('/records')
    .get(records.all)
    .post(auth.requiresLogin, records.create);
  app.route('/records/:recordId')
    .get(records.show)
    .put(auth.requiresLogin, hasAuthorization, records.update)
    .delete(auth.requiresLogin, hasAuthorization, records.destroy);

  // Finish with setting up the articleId param
  app.param('recordId', records.record);
};
