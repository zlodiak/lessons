var fruitsApp = angular.module('formValidation', [])
 
fruitsApp.controller('requestFormTop', function($scope){
	$scope.name = false;
	
	$scope.phone = false;
	
	$scope.submit = function(){
		alert($('#request_form_0 fld_name').val());
	}	
});