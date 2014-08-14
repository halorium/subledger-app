'use strict';

(function(){

  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
  var subledgerAppServices = angular.module('subledgerApp.services', ['ngResource']);

  subledgerAppServices.value('version', '0.1');

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

  subledgerAppServices.value('subledger', subledger);

  subledgerAppServices.factory(
    'sledgerSvc',
    [
    '$q',
    'subledger',
      function($q, subledger){

        var creds = {
          key: '8bDALFFz8q7uvFNskbW9Kq',
          secret: 'flWncmVODPlEUktLahThhW',
          orgId: 'Mx88KmjlVja1i4EMXoBjs1',
          bookId: '7klMwkWbY7HWR8qqq24W5U'
        };

        var getBooks = function(options) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book()
                .get(options, function(error, apiRes){
                  if (error !== null) { deferred.reject(error); }
                  else { deferred.resolve(apiRes); }
                });
          return deferred.promise;
        };

        var getBook = function(bookId) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .get(function(error, apiRes){
                  if (error !== null) { deferred.reject(error); }
                  else { deferred.resolve(apiRes); }
                });
          return deferred.promise;
        };

        var getAccounts = function(bookId, options) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .account()
                  .get(options, function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });
          return deferred.promise;
        };

        var getAccount = function(bookId, accountId) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .account(accountId)
                  .get(function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });
          return deferred.promise;
        };

        var getAccountLines = function(bookId, actId, options) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .account(actId)
                  .line()
                    .get(options, function(error, apiRes){
                      if (error !== null) { deferred.reject(error); }
                      else { deferred.resolve(apiRes); }
                    });
          return deferred.promise;
        };

        var getJournalEntries = function(bookId, options) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .journalEntry()
                  .get(options, function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });
          return deferred.promise;
        };

        var getJournalEntry = function(bookId, jeId) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .journalEntry(jeId)
                  .get(function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });
          return deferred.promise;
        };

        var getJournalEntryBalance = function(bookId, jeId) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .journalEntry(jeId)
                  .balance(function(error, apiRes){
                    if (error !== null) { deferred.reject(error); }
                    else { deferred.resolve(apiRes); }
                  });
          return deferred.promise;
        };

        var getLines = function(bookId, jeId, options) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .journalEntry(jeId)
                  .line()
                    .get(options, function(error, apiRes){
                      if (error !== null) { deferred.reject(error); }
                      else { deferred.resolve(apiRes); }
                    });
          return deferred.promise;
        };

        var getLine = function(bookId, jeId, lineId) {
          var deferred = $q.defer();
          subledger
            .organization(subledger.creds.org)
              .book(bookId)
                .journalEntry(jeId)
                  .line(lineId)
                    .get(function(error, apiRes){
                      if (error !== null) { deferred.reject(error); }
                      else { deferred.resolve(apiRes); }
                    });
          return deferred.promise;
        };


        return {
          creds: creds,
          getBooks: getBooks,
          getBook: getBook,
          getAccounts: getAccounts,
          getAccount: getAccount,
          getAccountLines: getAccountLines,
          getJournalEntries: getJournalEntries,
          getJournalEntry: getJournalEntry,
          getJournalEntryBalance: getJournalEntryBalance,
          getLines: getLines,
          getLine: getLine
        };
      }
    ]
  );

})();
