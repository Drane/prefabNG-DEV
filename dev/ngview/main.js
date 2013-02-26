var app = angular.module('app', ['ui.bootstrap.dropdownToggle']);

var controllers = {};

/**
 * $xxxProvider's are available in config function
 */
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl:'app.html',
			controller:"AppCtrl",
			resolve: {
				app:function ($q, $timeout) {
					var defer = $q.defer();
					defer.promise.then(function(greet){return greet+' jochen';}).then(function(msg){alert(msg);});
					$timeout(function () {
						defer.resolve('yo');
					},2000)
					return defer.promise;
				}

			}
		}).when('/load',{
			templateUrl:'app.html',
			controller:"LoadCtrl",
			loadData : loadCtrl.loadData,
			prepData : loadCtrl.prepData
		}).when('/:country/:state?dev=true', {
			templateUrl:'app.html',
			controller:"AppCtrl"
		}).otherwise({
//			redirectTo:'/belgium/limburg'
			redirectTo:function (routeParams, path, search) {
				console.log('routeParams: ', routeParams, '\npath: ', path, '\nsearch: ', search);
				return '/'+routeParams.country
			}
		});
});

app.run(function ($templateCache) {
	$templateCache.put('app.html', '<h2>{{data.message}}</h2>');
	console.log($templateCache.info());
});


/**
 * $xxxProvider's injected via $xxx here
 */
function AppCtrl($scope, $route, $routeParams) {
	console.log('$route: ', $route);
	$scope.data = {message:"Hello via routeprovider and ngview, $routeParams: "
		+$routeParams.country+', '
		+$routeParams.state};

}

controllers.AppCtrl = AppCtrl;

app.controller(controllers.AppCtrl); //alternative config method

var loadCtrl = app.controller('LoadCtrl', function ($scope, $route) {
	console.log('LoadCtrl $route.current.$route: ', $route.current.$route);//check 'locals' property for loadData and prepData
	$scope.data = {message:'load ctrl'};
});

loadCtrl.loadData = function ($q, $timeout) {
	var defer = $q.defer();
	$timeout(function () {
		defer.resolve('loadData666');//or reject to fail
	},2000);
	return defer.promise;
};
loadCtrl.prepData = function ($q, $timeout) {
	var defer = $q.defer();
	$timeout(function () {
		defer.resolve('prepData666');
	},2000)
	return defer.promise;
};


app.directive('devdirective', function ($templateCache) {
	//console.log("$templateCache.get('dev.html'):\n\n",$templateCache.get('dev.html'));

	return {
		restrict:"E",
		transclude:true,
		scope:{
			title:"@"
		},
		template:$templateCache.get('dev.html'),
//		templateUrl:'dev.html',
		link:function (scope) {
			scope.isContentVisible = true;

			scope.toggleContentVisible = function () {
				scope.isContentVisible = !scope.isContentVisible;
				console.info('scope.isContentVisible: ', scope.isContentVisible);
			}
			scope.items = [
				"The first choice!",
				"And another choice for you.",
				"but wait! A third!"
			];
		}
	}
});

