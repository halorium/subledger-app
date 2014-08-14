'use strict';

(function(){

  /* Directives */

  var subledgerAppDirectives = angular.module('subledgerApp.directives', []);

  subledgerAppDirectives.directive(
    'appVersion',
    [
      'version',
      function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
        };
      }
    ]
  );

  // subledgerAppDirectives.directive(
  //   'journalEntries',
  //   [
  //     'je',
  //     function(je){
  //       return {
  //         replace: true,
  //         restrict: 'E',
  //         controllerAs: 'journalEntriesCtrl',
  //         templateUrl: 'partials/journal-entries.html'
  //       };
  //     }
  //   ]
  // );

})();
