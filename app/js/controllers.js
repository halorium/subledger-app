'use strict';

(function(){

  /* Controllers */

  var spexieAppControllers = angular.module('spexieApp.controllers', []);

  spexieAppControllers.controller(
    'appCtrl',
    [
      '$scope',
      function($scope) {
        $scope.loggedIn = true;
        $scope.logIn = function(){
          $scope.loggedIn = true;
        };
        $scope.logOut = function(){
          $scope.loggedIn = false;
        };
        $scope.alert = false;
      }
    ]
  );

  spexieAppControllers.controller(
    'selectCtrl',
    [
      '$scope',
      function($scope) {
        $scope.states = ['posted', 'posting', 'active', 'archived'];
        $scope.state = 'posted';
        $scope.setState = function(){
          console.log($scope.state);
          $scope.changeState($scope.state);
        };
      }
    ]
  );

  spexieAppControllers.controller(
    'BooksCtrl',
    [
      '$rootScope',
      '$scope',
      'sledgerSvc',
      function($rootScope, $scope, sledgerSvc){
        $scope.state = 'active';
        $scope.type = $scope.state + '_books';
        $scope.query = function(options){
          $scope.type = $scope.state + '_books';
          options = options || {state: $scope.state, action: 'before', description: 'a'};
          sledgerSvc.getBooks(options).then(
            function(apiRes){
              $scope.books = apiRes[$scope.type];
              $scope.book = $scope.book || $scope.books[0];
              $rootScope.$broadcast('getJEs', $scope.book.id);
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(){
          $scope.query();
        };
        $scope.setBook = function(bookId){
          console.log($scope.book);
          $rootScope.$broadcast('getJEs', $scope.book.id);
        };
      }
    ]
  );

  spexieAppControllers.controller(
    'BookCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.state = 'active';
        $scope.type = $scope.state + '_book';
        $scope.query = function(bookId){
          bookId = bookId || $routeParams.bookId;
          $scope.type = $scope.state + '_book';
          sledgerSvc.getBook(bookId).then(
            function(apiRes){ $scope.book = apiRes[$scope.type]; },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(bookId){
          $scope.query(bookId);
        };
      }
    ]
  );


  spexieAppControllers.controller(
    'AccountsCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        $scope.state = $scope.state || 'active';
        $scope.type = $scope.type || $scope.state + '_accounts';
        $scope.query = function(options){
          $scope.type = $scope.state + '_accounts';
          options = options || {state: $scope.state};
          sledgerSvc.getAccounts(options).then(
            function(apiRes){ $scope.accounts = apiRes[$scope.type]; },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(){
          $scope.query();
        };
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
        $scope.state = 'active';
        $scope.type = $scope.state + '_account';
        $scope.query = function(actId){
          actId = actId || $routeParams.accountId;
          $scope.type = $scope.state + '_account';
          sledgerSvc.getAccount(actId).then(
            function(apiRes){ $scope.account = apiRes[$scope.type]; },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(actId){
          $scope.query(actId);
        };
      }
    ]
  );

  spexieAppControllers.controller(
    'JournalEntriesCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        $scope.state = 'posted';
        $scope.type = 'posted_journal_entries';
        $scope.query = function(bookId){
          $scope.alert = false;
          bookId = bookId || $scope.book.id;
          sledgerSvc.getJournalEntries(bookId,{state: $scope.state}).then(
            function(apiRes){
              $scope.journalEntries = apiRes[$scope.type];
              if($scope.journalEntries.length === 0){ $scope.alert = true; }
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(){
          $scope.query();
        };
        $scope.changeState = function(newState){
          $scope.type = newState + '_journal_entries';
          $scope.state = newState;
          $scope.query();
        };
        $scope.$on('getJEs', function(e, bookId) {
          $scope.query(bookId);
        });
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
        $scope.listing = true;
        $scope.state = $scope.state || 'posted';
        $scope.type = $scope.state + '_journal_entry';
        $scope.query = function(jeId){
          $scope.type = $scope.state + '_journal_entry';
          jeId = jeId || $routeParams.jeId;
          bookId = $scope.book.id;
          sledgerSvc.getJournalEntry(bookId, jeId).then(
            function(apiRes){ $scope.journalEntry = apiRes[$scope.type]; },
            function(error){ $scope.error = error; }
          );
        };
        $scope.toggleView = function(){
          $scope.listing = !$scope.listing;
          if($scope.listing === false){
            $scope.$broadcast('getLines', $scope.journalEntry.id);
            $scope.getBalance();
          }
        };
        $scope.init = function(jeId){
          $scope.query(jeId);
        };
        $scope.getBalance = function(jeId){
          jeId = jeId || $scope.journalEntry.id;
          sledgerSvc.getJournalEntryBalance(jeId).then(
            function(apiRes){
              $scope.jeBalance = apiRes['balance'];
            },
            function(error){ $scope.error = error; }
          );
        };
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
        $scope.state = $scope.state || 'posted';
        $scope.type = $scope.type || $scope.state + '_lines';
        $scope.query = function(jeId, options){
          jeId = jeId || $routeParams.jeId;
          options = options || {state: 'posted'};
          $scope.type = $scope.state + '_lines';
          sledgerSvc.getLines(jeId, options).then(
            function(apiRes){
              $scope.lines = apiRes[$scope.type];
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.$on('getLines', function(e, id) {
          if (!$scope.lines) {
            $scope.query(id);
          }
        });
        this.credit = function(value){
          if(value.type === 'credit'){ return value.amount; }
        };
        this.debit = function(value){
          if(value.type === 'debit'){ return value.amount; }
        };
        $scope.init = function(jeId){
          $scope.query(jeId);
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
