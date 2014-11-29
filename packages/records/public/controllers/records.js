'use strict';

angular.module('mean.records').controller('RecordsController', ['$scope', 'Global', 'Records',
  function($scope, Global, Records) {
    $scope.global = Global;
    $scope.package = {
      name: 'records'
    };
  }
]);
