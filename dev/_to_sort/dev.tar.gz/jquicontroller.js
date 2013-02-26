'use strict';

//Here's an example to make ui-select2 clearable by default:
var myModule = angular.module('myModule', ['ui']);
myModule.value('ui.config', {
	select2: {
		allowClear: true
	}
});
7
/* Controllers */
function JquiController($scope, $log) {
	$log.info('JquiController');

	$scope.data = {
		id:"user",
		children:[
			{
				id:"subuser1",
				children:{id:"laatste", children:[]}
			},
			{
				id:"subuser2",
				children:{id:"laatste", children:[]}
			},
			{
				id:"newuser",
				children:[
					{
						id:"subuser1",
						children:{id:"laatste", children:[]}
					},
					{
						id:"subuser2",
						children:{id:"laatste", children:[]}
					}
				]
			}
		]
	};
	$scope.codeMirrorModel = "var helloWorld = 'Success!';";

	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	$scope.events = [
		{title: 'All Day Event',start: new Date(y, m, 1)},
		{title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
		{id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
		{id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
		{title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
		{title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
	]

	$scope.addChild = function() {
		$scope.events.push({
			title: 'Open Sesame',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29)
		});
	}

	$scope.remove = function(index) {
		$scope.events.splice(index,1);
	}
}
