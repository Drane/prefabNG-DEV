var app = angular.module('app', ['ui.bootstrap.dropdownToggle','ui.bootstrap.alert']);

var controllers = {};

/**
 * $xxxProvider's are available in config function
 */
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:'view/app.html',
			controller:"ViewCtrl",
		}).when('/new', {
			templateUrl:'view/new.html',
			controller:"NewCtrl",
			resolve: {
				loadData : viewCtrl.loadData
			}
		});
});

/**
 * Handle global fails here, like in the routing
 */
app.controller('AppCtrl',function($scope, $rootScope, $route, $location){
	/*$rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
		console.log("failed to change routes: ",rejection);
	});*/
	$rootScope.$on("$routeChangeStart", function(event, current, previous, rejection){
		console.log("$routeChangeStart event: ",event, "\ncurrent: ",current, "\nprevious: ",
			previous, "\nrejection: ", rejection, "\ncurrent: ",rejection);
		console.log("$routeChangeStart $scope: ",$scope, "\n$rootScope: ",$rootScope, "\n$route: ",
			$route, "\n$location: ", $location);
	});
	$rootScope.$on("$routeChangeSuccess", function(event, current, previous, rejection){
		console.log("$routeChangeSuccess event: ",event, "\ncurrent: ",current, "\nprevious: ",
			previous, "\nrejection: ", rejection, "\ncurrent: ",rejection);
		console.log("$routeChangeStart $scope: ",$scope, "\n$rootScope: ",$rootScope, "\n$route: ",
			$route, "\n$location: ", $location);
	});
});
var viewCtrl = app.controller('ViewCtrl',function($scope, $route, $location){
	console.log("$route: ",$route);
//	$scope.model = {message: "I'm a great app!"};
	$scope.changeRoute = function(){
		console.log("$scope: ",$scope);
		$location.path('/new');
	};
});
app.controller('NewCtrl',function($scope, loadData, $template){
	console.log("$scope: ",$scope, "\nloadData: ",loadData, "\n$template: ", $template);
});

viewCtrl.loadData = function ($q, $timeout) {
	var defer = $q.defer();
	$timeout(function () {
//		defer.reject("network failed");
		defer.resolve({message:'succes'});
	}, 2000);
	return defer.promise;
}

app.directive("error", function ($rootScope) {
	return {
		restrict:"E",
		template: '<div ng-show="isError" class="alert alert-error">\n    <a class="close" data-dismiss="alert">×</a>\n    <strong>Error!</strong>This is a fatal error.\n</div>\n',
//		template: '<alert ng-show="isError">Errror</alert>',
		link:function (scope) {
			$rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
				console.log("failed to change routes: ",rejection);
				scope.isError = true;
			});
		}
	};
})