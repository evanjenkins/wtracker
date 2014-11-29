'use strict';

angular.module('mean.records').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('records example page', {
      url: '/records/example',
      templateUrl: 'records/views/index.html'
    });
  }
]);
