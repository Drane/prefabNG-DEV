
'use strict';

angular.module('nodeTreeApp', ['ui.bootstrap','angular-underscore']);

/* Controllers */
function DevController($scope, $log) {
	$log.info('devController');

	$scope.jsonText = {"bindings": [
		{"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"},
		{"ircEvent": "PRIVMSG", "method": "deleteURI", "regex": "^delete.*"},
		{"ircEvent": "PRIVMSG", "method": "randomURI", "regex": "^random.*"}
	]
	};

	$scope.getJsonString = function(jsonText){
		$log.info('jsonText: ',jsonText);
		http://acidmartin.wordpress.com/2011/09/26/css3-treevew-no-javascript/
		//http://farhadi.ir/projects/html5sortable/
		//http://stackoverflow.com/questions/13849902/reading-in-json-through-angular-resources-service
		var jsonObject = JSON.parse(jsonText);
		var jsonArray = pairs(jsonObject);
		return jsonArray;
	}
}