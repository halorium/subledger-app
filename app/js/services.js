'use strict';

(function(){

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
  var spexieAppServices = angular.module('spexieApp.services', ['ngResource']);

  spexieAppServices.value('version', '0.1');

  spexieAppServices.factory(
    'JournalEntries',
    [
      '$resource',
      function($resource){
        return $resource(
          'https://api.subledger.com/v2/orgs/:orgId/books/:bookId/journal_entries',
          {},
          {
            query: {
              method: 'GET',
              params: {
                orgId: 'Mx88KmjlVja1i4EMXoBjs1',
                bookId: '7klMwkWbY7HWR8qqq24W5U'
              },
              isArray: true,
              responseType: 'json',
              withCredentials: true,
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Request-Headers': 'X-Requested-With, content-type, accept, origin, withcredentials'
              }

            }
          }
        );
      }
    ]
  );

})();
