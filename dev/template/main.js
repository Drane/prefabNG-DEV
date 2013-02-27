'use strict';
var app = angular.module('app', ['ui.bootstrap.dropdownToggle']);

app.run(function ($templateCache) {
	$templateCache.put('dev2.html', '<div>blabla</div>');
	console.log($templateCache.info());
});

function AppCtrl($scope) {
	$scope.data = {message:"Hello"};
}

app.directive('devdirective', function ($templateCache) {
	//console.log("$templateCache.get('dev.html'):\n\n",$templateCache.get('dev.html'));

	return {
		restrict:"E",
		transclude:true,
		scope:{
			title:"@"
		},
		template: $templateCache.get('dev.html'),
//		templateUrl:'dev.html',
		link:function (scope) {
			scope.isContentVisible = true;

			scope.toggleContentVisible = function () {
				scope.isContentVisible = ! scope.isContentVisible;
				console.info('scope.isContentVisible: ',scope.isContentVisible);
			}

			scope.items = [
				"The first choice!",
				"And another choice for you.",
				"but wait! A third!"
			];
		}

	}
});

