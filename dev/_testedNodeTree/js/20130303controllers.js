'use strict';

/* Controllers */
var counter = 0;

function NodeCtrl($scope) {
	var node = [
		{"name":"Nexus S",
			"snippet":"Fast just got faster with Nexus S."},
		{"name":"Motorola XOOM™ with Wi-Fi",
			"snippet":"The Next, Next Generation tablet."},
		{"name":"MOTOROLA XOOM™",
			"snippet":"The Next, Next Generation tablet."}
	];

	$scope.getNode = function(){
		console.log('getNode');
		if(counter<3)
			return ++counter;
	};
}
