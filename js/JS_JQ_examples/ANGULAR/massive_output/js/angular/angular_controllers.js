'use strict';

/* Controllers */

function PhoneListCtrl($scope) {
  $scope.phones = [
    {"name": "Nexus S",
     "snippet": "Fast just got faster with Nexus S."},
    {"name": "Motorola XOOM™ with Wi-Fi",
     "snippet": "The Next, Next Generation tablet."},
    {"name": "MOTOROLA XOOM™",
     "snippet": "The Next, Next Generation tablet."}
  ];
  
  $scope.hello = "Hello, World!"
}

function PhoneListCtrl_2($scope) {
  $scope.bye = "bye, World!"
}