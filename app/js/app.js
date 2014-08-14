'use strict';

(function(){

  // Declare app level module which depends on filters, and services
  var subledgerApp = angular.module(
    'subledgerApp',
    [
      'ui.bootstrap',
      'ngRoute',
      'subledgerApp.filters',
      'subledgerApp.services',
      'subledgerApp.directives',
      'subledgerApp.controllers',
      'infinite-scroll'
    ]
  );

  subledgerApp.config(
    [
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'appCtrl'
          }).
          when('/books', {
            templateUrl: 'partials/books.html',
            controller: 'BooksCtrl'
          }).
          when('/journal-entries', {
            // templateUrl: 'partials/journal-entries.html',
            templateUrl: 'partials/jes.html',
            controller: 'JournalEntriesCtrl'
          }).
          when('/journal-entries/:jeId/lines', {
            templateUrl: 'partials/je.html',
            controller: 'JournalEntryCtrl'
          }).
          when('/accounts', {
            templateUrl: 'partials/accounts.html',
            controller: 'AccountsCtrl'
          }).
          when('/accounts/:actId/lines', {
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
          }).
          when('/accounts/:actId/chart', {
            templateUrl: 'partials/account-chart.html',
            controller: 'AccountChartCtrl'
          }).
          when('/', {
            templateUrl: 'partials/home.html',
            controller: 'appCtrl'
          }).
          otherwise({
            templateUrl: 'partials/not-found.html',
            controller: 'appCtrl'
          }
        );
      }
    ]
  );


  // subledgerApp.config(
  //   [
  //     '$routeProvider',
  //     function($routeProvider) {
  //       $routeProvider.when(
  //         '/home',
  //         {templateUrl: 'partials/home.html', controller: 'homeCtrl'}
  //       );
  //       $routeProvider.when(
  //         '/home/journal-entries',
  //         {templateUrl: 'partials/journal-entries.html', controller: 'jeCtrl'}
  //       );
  //       $routeProvider.when(
  //         '/view1',
  //         {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'}
  //       );
  //       $routeProvider.when(
  //         '/view2',
  //         {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'}
  //       );
  //       $routeProvider.otherwise(
  //         {redirectTo: '/home'}
  //       );
  //     }
  //   ]
  // );

})();
