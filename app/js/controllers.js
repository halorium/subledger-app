'use strict';

(function(){

  /* Controllers */

  var subledgerAppControllers = angular.module('subledgerApp.controllers', []);

  subledgerAppControllers.controller(
    'appCtrl',
    [
      '$scope',
      '$location',
      '$route',
      function($scope, $location, $route) {
        $scope.loggedIn = $scope.loggedIn || false;
        if (!$scope.loggedIn) {
          $location.path('/login');
          $route.reload();
        };
        $scope.logIn = function(){
          $scope.loggedIn = true;
          $location.path('/');
          $route.reload();
        };
        $scope.logOut = function(){
          $scope.loggedIn = false;
          $location.path('/login');
          $route.reload();
        };
        $scope.alert = false;
      }
    ]
  );

  subledgerAppControllers.controller(
    'LoginCtrl',
    [
      '$scope',
      '$rootScope',
      function($scope, $rootScope) {
        $scope.init = function(){
          $scope.creds = {};
        };
        $scope.demoCreds = function(){
          $scope.creds = {
            key: '8bDALFFz8q7uvFNskbW9Kq',
            secret: 'flWncmVODPlEUktLahThhW',
            org: 'Mx88KmjlVja1i4EMXoBjs1',
            book: '7klMwkWbY7HWR8qqq24W5U'
          };
        };
        $scope.login = function(){
          if ($scope.creds.key && $scope.creds.secret && $scope.creds.org) {
            $scope.logIn();
          }
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'NavBarCtrl',
    [
      '$scope',
      function($scope) {
        $scope.isCollapsed = true;
      }
    ]
  );

  subledgerAppControllers.controller(
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

  subledgerAppControllers.controller(
    'BooksCtrl',
    [
      '$route',
      '$location',
      '$rootScope',
      '$scope',
      'sledgerSvc',
      function($route, $location, $rootScope, $scope, sledgerSvc){
        $scope.state = 'active';
        $scope.type = $scope.state + '_books';
        $scope.query = function(options){
          $scope.type = $scope.state + '_books';
          options = options || {state: $scope.state, action: 'before', description: 'a'};
          sledgerSvc.getBooks(options).then(
            function(apiRes){
              $scope.books = apiRes[$scope.type];
              $scope.book = $scope.book || $scope.books[0];
              sledgerSvc.creds.bookId = $scope.book.id;
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
          sledgerSvc.creds.bookId = $scope.book.id;
          var root_path = $route.current.$$route.originalPath.match(/[^\/]+/)[0];
          root_path = "/" + root_path;
          $location.path(root_path);
          $route.reload();
          // $rootScope.$broadcast('getJEs', $scope.book.id);
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'BookCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.state = 'active';
        $scope.type = $scope.state + '_book';
        $scope.query = function(bookId){
          // bookId = bookId || $routeParams.bookId;
          bookId = bookId || sledgerSvc.creds.bookId;
          $scope.type = $scope.state + '_book';
          sledgerSvc.getBook(bookId).then(
            function(apiRes){
              $scope.book = apiRes[$scope.type];
              sledgerSvc.creds.bookId = $scope.book.id;
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(bookId){
          $scope.query(bookId);
        };
      }
    ]
  );


  subledgerAppControllers.controller(
    'AccountsCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        $scope.state = $scope.state || 'active';
        $scope.type = $scope.type || $scope.state + '_accounts';
        $scope.query = function(bookId, options){
          $scope.type = $scope.state + '_accounts';
          options = options || {state: $scope.state};
          bookId = bookId || sledgerSvc.creds.bookId;
          sledgerSvc.getAccounts(bookId, options).then(
            function(apiRes){ $scope.accounts = apiRes[$scope.type]; },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(bookId){
          $scope.query(bookId);
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'AccountCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.state = 'active';
        $scope.type = $scope.state + '_account';
        $scope.query = function(actId){
          var bookId = sledgerSvc.creds.bookId;
          actId = actId || $routeParams.actId || sledgerSvc.creds.accountId;
          $scope.type = $scope.state + '_account';
          sledgerSvc.getAccount(bookId, actId).then(
            function(apiRes){
              $scope.account = apiRes[$scope.type];
              sledgerSvc.creds.accountId = $scope.account.id;
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(actId){
          $scope.query(actId);
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'AccountChartCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.state = 'posted';
        $scope.type = $scope.state + '_lines';
        $scope.query = function(actId, options){
          var bookId = sledgerSvc.creds.bookId;
          options = options || {state: $scope.state, action: 'before', effective_at: new Date().toISOString()};
          actId = actId || $routeParams.actId || sledgerSvc.creds.accountId;
          $scope.type = $scope.state + '_lines';
          sledgerSvc.getAccountLines(bookId, actId, options).then(
            function(apiRes){
              $scope.actLines = apiRes[$scope.type];
              $scope.render($scope.actLines);
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(){
          $scope.query();
        };
        $scope.render = function(actLines){
            var categories = [];
            var data = [];
            var startDate = actLines[actLines.length - 1].effective_at;

            for(var i = actLines.length - 1; i >= 0; i--){
              categories.push(actLines[i].effective_at);
              data.push( parseFloat( actLines[i].balance.value.amount ) );
            }

            $scope.actChart = new Highcharts.Chart(
              {
                chart: {
                          renderTo: 'container',
                          type: 'line'
                       },
                title: {  text: 'Account Balance' },
                // xAxis: {  categories: categories },
                xAxis: { type: 'datetime',
                         dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%e. %b',
                            week: '%e. %b',
                            month: '%b \'%y',
                            year: '%Y'
                         }},
                yAxis: {  title: { text: 'Balance' } },
                series: [ {
                            data: data,
                            pointStart: Date.parse(startDate),
                            pointInterval: 24 * 3600 * 1000
                           }
                        ]
              });
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'AccountLinesCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.infiniteScrollReady = false;
        $scope.state = 'posted';
        $scope.type = $scope.state + '_lines';
        $scope.actLines = [];
        $scope.query = function(actId, options){
          $scope.loading = true;
          var bookId = sledgerSvc.creds.bookId;
          options = options || {state: $scope.state, action: 'before', effective_at: new Date().toISOString()};
          actId = actId || $routeParams.actId || sledgerSvc.creds.accountId;
          $scope.type = $scope.state + '_lines';
          sledgerSvc.getAccountLines(bookId, actId, options).then(
            function(apiRes){
              $scope.infiniteScrollReady = true;
              $scope.actLines = $scope.actLines.concat(apiRes[$scope.type]);
              if ($scope.actLines.length >= 100) {
                $scope.actLines.splice(0, 25);
              }
              $scope.loading = false;
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.init = function(actId){
          $scope.query(actId);
        };
        this.credit = function(value){
          if(value.type === 'credit'){ return value.amount; }
        };
        this.debit = function(value){
          if(value.type === 'debit'){ return value.amount; }
        };
        $scope.getMoreLines = function(actId){
          var lastLineId = $scope.actLines[$scope.actLines.length - 1].id;
          console.log("lastLineId", lastLineId);
          $scope.query(actId, {state: $scope.state, action: 'following', id: lastLineId });
        };
      }
    ]
  );


  subledgerAppControllers.controller(
    'JournalEntriesCtrl',
    [
      '$scope',
      'sledgerSvc',
      function($scope, sledgerSvc){
        $scope.state = 'posted';
        $scope.type = 'posted_journal_entries';
        $scope.query = function(bookId, options){
          $scope.alert = false;
          bookId = bookId || sledgerSvc.creds.bookId;
          options = options || {state: $scope.state};
          sledgerSvc.getJournalEntries(bookId, options).then(
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

  subledgerAppControllers.controller(
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
          jeId = jeId || $routeParams.jeId || sledgerSvc.creds.journalEntryId;
          var bookId = sledgerSvc.creds.bookId;
          sledgerSvc.getJournalEntry(bookId, jeId).then(
            function(apiRes){
              $scope.journalEntry = apiRes[$scope.type];
              sledgerSvc.creds.journalEntryId = $scope.journalEntry.id;
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.toggleView = function(){
          $scope.listing = !$scope.listing;
          if($scope.listing === false){
            $scope.$broadcast('getLines', $scope.journalEntry.id);
            $scope.getBalance($scope.journalEntry.id);
          }
        };
        $scope.init = function(jeId){
          $scope.query(jeId);
        };
        $scope.getBalance = function(jeId){
          var bookId = sledgerSvc.creds.bookId;
          jeId = jeId || $routeParams.jeId || sledgerSvc.creds.journalEntryId;
          sledgerSvc.getJournalEntryBalance(bookId, jeId).then(
            function(apiRes){
              $scope.jeBalance = apiRes['balance'];
            },
            function(error){ $scope.error = error; }
          );
        };
        $scope.initBalance = function(jeId){
          $scope.query(jeId);
          $scope.getBalance(jeId);
        };
      }
    ]
  );

  subledgerAppControllers.controller(
    'LinesCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        $scope.state = $scope.state || 'posted';
        $scope.type = $scope.type || $scope.state + '_lines';
        $scope.query = function(jeId, options){
          var bookId = sledgerSvc.creds.bookId;
          jeId = jeId || $routeParams.jeId || sledgerSvc.creds.journalEntryId;
          options = options || {state: 'posted'};
          $scope.type = $scope.state + '_lines';
          sledgerSvc.getLines(bookId, jeId, options).then(
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

  subledgerAppControllers.controller(
    'LineCtrl',
    [
      '$scope',
      'sledgerSvc',
      '$routeParams',
      function($scope, sledgerSvc, $routeParams){
        var bookId = sledgerSvc.creds.bookId;
        var jeID = $scope.journalEntry.id || sledgerSvc.creds.journalEntryId;
        var lineId = $scope.line.id || sledgerSvc.creds.lineId;
        sledgerSvc.getLine(bookId, jeId, lineId).then(
          function(apiRes){
            $scope.line = apiRes.posted_line;
            sledgerSvc.creds.lineId = $scope.line.id;
          },
          function(error){ $scope.error = error; }
        );
      }
    ]
  );

})();
