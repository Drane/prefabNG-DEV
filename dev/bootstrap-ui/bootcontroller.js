'use strict';


angular.module('bootstrapDemoApp', ['ui.bootstrap']);

function refresh(templateId, $scope, $templateCache, $timeout) {
	$templateCache.remove(templateId);
	$scope.logTemplate = '';
	$timeout(function () {
		$scope.logTemplate = templateId;
	}, 1000);
}

/* Controllers */
function BootDemoCtrl($scope, $log) {
	$log.info('BootDemoCtrl');

	$scope.oneAtATime = true;

	$scope.groups = [
		{
			title: "Dynamic Group Header - 1",
			content: "Dynamic Group Body - 1"
		},
		{
			title: "Dynamic Group Header - 2",
			content: "Dynamic Group Body - 2"
		}
	];

	$scope.items = ['Item 1', 'Item 2', 'Item 3'];

	$scope.addItem = function() {
		$scope.items.push('Item ' + $scope.items.length);
	};

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
}