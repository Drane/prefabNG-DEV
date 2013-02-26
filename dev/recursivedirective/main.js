var module = angular.module('app', []);

module.controller("TreeCtrl", function($scope) {
	$scope.tree = {
		text : "Parent",
		children: [{
			text : "Sub1",
			children: [{
				text : "SubSub1",
				children: []
			}]
		}, {
			text: "Sub2",
			children: []
		}]};
});

module.directive("recursive", function($compile) {
	return {
		restrict: "EACM",
		priority: 100000,
		compile: function(tElement, tAttr) {
			var contents = tElement.contents().remove();
			var compiledContents;
			return function(scope, iElement, iAttr) {
				if(!compiledContents) {
					compiledContents = $compile(contents);
				}
				iElement.append(
					compiledContents(scope,
						function(clone) {
							return clone; }));
			};
		}
	};
});

module.directive("tree", function() {
	return {
		scope: {tree: '='},
		template: '<p>{{ tree.text }}</p><ul><li ng-repeat="child in tree.children"><recursive><span tree="child"></span></recursive></li></ul>',
		compile: function() {
			return  function() {
			}
		}
	};
});