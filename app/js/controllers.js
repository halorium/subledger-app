'use strict';

(function(){

  /* Controllers */

  var spexieAppControllers = angular.module('spexieApp.controllers', []);

  spexieAppControllers.controller(
    'JournalEntriesCtrl',
    [
      '$scope',
      'JournalEntries',
      function($scope, JournalEntries){
        $scope.journalEntries = JournalEntries.query();
      }
    ]
  );


  spexieAppControllers.controller(
    'appCtrl',
    [
      '$scope',
      function($scope) {
        this.journalEntries = [
          {
            "id": "8pghmwUxYSepB9jNufVl2M",
            "book": "7klMwkWbY7HWR8qqq24W5U",
            "effective_at": "2014-07-26T15:00:31.508Z",
            "description": "4 lemonade(s) sold",
            "reference": "https://s3-us-west-2.amazonaws.com/demo-references/receipt3310.pdf",
            "version": 1
          },
          {
            "id": "9ZP07snpLcVGmT9HzU3pWD",
            "book": "7klMwkWbY7HWR8qqq24W5U",
            "effective_at": "2014-07-26T14:59:25.676Z",
            "description": "6 lemonade(s) sold",
            "reference": "https://s3-us-west-2.amazonaws.com/demo-references/receipt3309.pdf",
            "version": 1
          },
          {
            "id": "QOIsYn2L8AucrC843eFvMz",
            "book": "7klMwkWbY7HWR8qqq24W5U",
            "effective_at": "2014-07-26T14:58:19.812Z",
            "description": "4 lemonade(s) sold",
            "reference": "https://s3-us-west-2.amazonaws.com/demo-references/receipt3308.pdf",
            "version": 1
          }
        ];
        this.journalEntryLines = [
          {
            "id": "egaupdW4lgiK9chrQvozgh",
            "journal_entry": "9ZP07snpLcVGmT9HzU3pWD",
            "account": "hiZogKMt9RhfdJGF6eBwT2",
            "description": "cash received for lemonade",
            "reference": "https://s3-us-west-2.amazonaws.com/demo-references/receipt3309.pdf",
            "value": {
              "type": "debit",
              "amount": "8.025"
            },
            "order": "0004.00",
            "version": 1,
            "effective_at": "2014-07-26T14:59:25.676Z",
            "posted_at": "2014-07-26T14:59:29.671Z"
          },
          {
            "id": "B0APoPhk26zjAn1Uo0wv0h",
            "journal_entry": "9ZP07snpLcVGmT9HzU3pWD",
            "account": "1bBSZ6roiB6bdNmTIVKA6F",
            "description": "cost of lemons used",
            "reference": "https://s3-us-west-2.amazonaws.com/demo-references/receipt3309.pdf",
            "value": {
              "type": "credit",
              "amount": "1.62412355"
            },
            "order": "0005.00",
            "version": 1,
            "effective_at": "2014-07-26T14:59:25.676Z",
            "posted_at": "2014-07-26T14:59:29.671Z"
          }
        ];
        this.journalEntryLineAccounts = [
          {
            "id": "1bBSZ6roiB6bdNmTIVKA6F",
            "book": "7klMwkWbY7HWR8qqq24W5U",
            "description": "1020 Inventory Lemons",
            "normal_balance": "debit",
            "version": 1
          }
        ];
        this.journalEntryBalance =
        {
          "debit_value": {
            "type": "debit",
            "amount": "11.47585667"
          },
          "credit_value": {
            "type": "credit",
            "amount": "11.47585667"
          },
          "value": {
            "type": "zero",
            "amount": "0"
          }
        };

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
