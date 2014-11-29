'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Workouts = new Module('workouts');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Workouts.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Workouts.routes(app, auth, database);

  Workouts.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Workout',
    'link': 'create workout'
  });

  Workouts.menus.add({
    'roles': ['authenticated'],
    'title': 'All Workouts',
    'link': 'all workouts'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Exercise.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Exercise.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Exercise.settings(function(err, settings) {
        //you now have the settings object
    });
    */
  Workouts.angularDependencies(['xeditable']);
  return Workouts;
});
