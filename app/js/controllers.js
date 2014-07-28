'use strict';

(function(){

  /* Controllers */

  var spexieAppControllers = angular.module('spexieApp.controllers', []);

  spexieAppControllers.controller(
    'AccountsCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        sledgerSvc.getAccounts({state: 'active'}).then(
          function(apiRes){ $scope.accounts = apiRes.active_accounts; },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );

  spexieAppControllers.controller(
    'AccountCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        var actId;
        if($scope.line){ actId = $scope.line.account; }
        else { actId = $routeParams.accountId; }

        sledgerSvc.getAccount(actId).then(
          function(apiRes){ $scope.account = apiRes.active_account; },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );

  spexieAppControllers.controller(
    'JournalEntriesCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        sledgerSvc.getJournalEntries({state: 'posted'}).then(
          function(apiRes){ $scope.journalEntries = apiRes.posted_journal_entries; },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );

  spexieAppControllers.controller(
    'JournalEntryCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        sledgerSvc.getJournalEntry($routeParams.journalEntryId).then(
          function(apiRes){ $scope.journalEntry = apiRes.posted_journal_entry; },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );

  spexieAppControllers.controller(
    'LinesCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        sledgerSvc.getLines($routeParams.journalEntryId, {state: 'posted'}).then(
          function(apiRes){ $scope.lines = apiRes.posted_lines; },
          function(error){ $scope.error = error; }
        );
        this.credit = function(value){
          if(value.type === 'credit'){ return value.amount; }
        };
        this.debit = function(value){
          if(value.type === 'debit'){ return value.amount; }
        };
      }
    ]
  );

  spexieAppControllers.controller(
    'LineCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        sledgerSvc.getLine($routeParams.journalEntryId, $routeParams.lineId).then(
          function(apiRes){ $scope.line = apiRes.posted_line; },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );


  spexieAppControllers.controller(
    'appCtrl',
    [
      '$scope',
      function($scope) {
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
