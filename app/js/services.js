'use strict';

(function(){

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
  var spexieAppServices = angular.module('spexieApp.services', ['ngResource']);

  spexieAppServices.value('version', '0.1');

  var subledger = new Subledger();

  // Demo Account Creds
  var creds = {
    key: '8bDALFFz8q7uvFNskbW9Kq',
    secret: 'flWncmVODPlEUktLahThhW',
    org: 'Mx88KmjlVja1i4EMXoBjs1',
    book: '7klMwkWbY7HWR8qqq24W5U'
  };

  subledger.setCredentials(creds.key,creds.secret);

  subledger.creds = creds;

  spexieAppServices.value('subledger', subledger);

  spexieAppServices.factory(
    'JournalEntries',
    [
    '$q',
    'subledger',
      function($q, subledger){
        var getJournalEntries = function(options) {
          var deferred = $q.defer();

          subledger
            .organization(subledger.creds.org)
              .book(subledger.creds.book)
                .journalEntry()
                  .get(options, function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });

          return deferred.promise;
        };

        return { getJournalEntries: getJournalEntries };
      }
    ]
  );

  spexieAppServices.factory(
    'JournalEntry',
    [
    '$q',
    'subledger',
      function($q, subledger){
        var getJournalEntry = function(journalEntryId) {
          var deferred = $q.defer();

          subledger
            .organization(subledger.creds.org)
              .book(subledger.creds.book)
                .journalEntry(journalEntryId)
                  .get(function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });

          return deferred.promise;
        };

        return { getJournalEntry: getJournalEntry };
      }
    ]
  );


})();
