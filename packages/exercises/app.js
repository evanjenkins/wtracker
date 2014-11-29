'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Exercises = new Module('exercises');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Exercises.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Exercises.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  //Exercises.menus.add({
  //  title: 'exercise example page',
  //  link: 'exercise example page',
  //  roles: ['authenticated'],
  //  menu: 'main'
  //});

  Exercises.menus.add({
    'roles': ['admin'],
    'title': 'Create New Exercise',
    'link': 'create exercise'
  });

  Exercises.menus.add({
    'roles': ['admin'],
    'title': 'All Exercises',
    'link': 'all exercises'
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

  return Exercises;
});
