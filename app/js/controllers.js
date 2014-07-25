'use strict';

/* Controllers */

angular.module('spexieApp.controllers', [])
  .controller('homeCtrl', ['$scope', function($scope) {

  }])
  .controller('jeCtrl', ['$scope', function($scope) {
    this.entries = [
      {effectiveAt: 'a day ago', description: 'je one', posted: 'posted'},
      {effectiveAt: 'a day ago', description: 'je two', posted: 'posted'}
    ];
  }])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);
