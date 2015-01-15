'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http) { 
  $http.get('phones.json').success(function(data) {
    $scope.phones = data;
	
	//$scope.phones = data.splice(0, 5);
  });  
  
  $scope.orderProp = 'name';
}