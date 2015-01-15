'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http) {
  $http.get('phones.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'name';
}

//PhoneListCtrl.$inject = ['$scope', '$http'];


function PhoneDetailCtrl($scope, $routeParams) {
  $scope.phoneId = $routeParams.phoneId;
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams'];