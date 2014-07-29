'use strict';

(function(){

  // Declare app level module which depends on filters, and services
  var spexieApp = angular.module(
    'spexieApp',
    [
      'ui.bootstrap',
      'ngRoute',
      'spexieApp.filters',
      'spexieApp.services',
      'spexieApp.directives',
      'spexieApp.controllers'
    ]
  );

  spexieApp.config(
    [
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'appCtrl'
          }).
          when('/journal_entries', {
            templateUrl: 'partials/journal-entries.html',
            controller: 'JournalEntriesCtrl'
          }).
          when('/journal_entries/:journalEntryId', {
            templateUrl: 'partials/journal-entry.html',
            controller: 'JournalEntryCtrl'
          }).
          otherwise({
            redirectTo: '/login'
          }
        );
      }
    ]
  );


  // spexieApp.config(
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
