'use strict';

(function(){

  /* Controllers */

  var spexieAppControllers = angular.module('spexieApp.controllers', []);

  spexieAppControllers.controller(
    'appCtrl',
    [
      '$scope',
      function($scope) {
        this.journalEntries = [
          {effectiveAt: 'a day ago', description: 'je one', posted: 'posted'},
          {effectiveAt: 'a day ago', description: 'je two', posted: 'posted'}
        ];
      }
    ]
  );

    // .controller('jeCtrl', ['$scope', function($scope) {
    //   this.entries = [
    //     {effectiveAt: 'a day ago', description: 'je one', posted: 'posted'},
    //     {effectiveAt: 'a day ago', description: 'je two', posted: 'posted'}
    //   ];
    // }])
    // .controller('MyCtrl1', ['$scope', function($scope) {

    // }])
    // .controller('MyCtrl2', ['$scope', function($scope) {

    // }]);

})();
