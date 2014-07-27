'use strict';

(function(){

  /* Directives */

  var spexieAppDirectives = angular.module('spexieApp.directives', []);

  spexieAppDirectives.directive(
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

  // spexieAppDirectives.directive(
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
