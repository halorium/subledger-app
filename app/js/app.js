'use strict';

// Declare app level module which depends on filters, and services
angular.module('spexieApp', [
  'ui.bootstrap',
  'ngRoute',
  'spexieApp.filters',
  'spexieApp.services',
  'spexieApp.directives',
  'spexieApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when(
    '/home',
    {templateUrl: 'partials/home.html', controller: 'homeCtrl'}
  );
  $routeProvider.when(
    '/view1',
    {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'}
  );
  $routeProvider.when(
    '/view2',
    {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'}
  );
  $routeProvider.otherwise(
    {redirectTo: '/home'}
  );
}]);
