'use strict';

/* Controllers */
console.debug('> in controllers.js');

function NodeCtrl($scope) {
	var node = [
		"string",
		true
	];
/*	var node = [
		{"name":"Nexus S",
			"snippet":"Fast just got faster with Nexus S."},
		{"name":"Motorola XOOM™ with Wi-Fi",
			"snippet":"The Next, Next Generation tablet."},
		{"name":"MOTOROLA XOOM™",
			"snippet":"The Next, Next Generation tablet."},
		"string",
		666
	];*/

	$scope.node = node;
}
