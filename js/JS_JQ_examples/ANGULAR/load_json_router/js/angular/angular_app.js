'use strict';

/* App Module */

angular.module('phonecat', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'product.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]);