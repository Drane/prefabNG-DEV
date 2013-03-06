'use strict';

/* Controllers */
console.debug('> in controllers.js');

function NodeCtrl($scope, $log) {
    $log.info('NodeCtrl');
    $scope.log = $log;

    var node = {value :["A","B"]};

	var node2 = [
        "A"//, "B", "C"
        /*
        {name: "a", val: "string"},
        {name: "b", val: "bbb"},
        {name: "c", val: "ccc"}
		true,
        666,
        ["1",2,true],
        {"obj" : true, "arr":[1,2,3], "anobjpropnr" : 666}*/
	];
	var array = ["1",2,true];
    $scope.object = {"obj" : true, "anobjpropnr" : 666, "arr":[1,2,3]};
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
	$scope.parents = [
		{ name: 'Anna',
			children: ['Alvin', 'Becky' ,'Charlie'] },
		{ name: 'Barney',
			children: ['Dorothy', 'Eric'] },
		{ name: 'Chris',
			children: ['Frank', 'Gary', 'Henry'] }
	];
	$scope.array = array;
	$scope.node = node;
}
