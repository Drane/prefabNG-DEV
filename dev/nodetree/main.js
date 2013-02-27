var app = angular.module('app', ['ui.bootstrap.dropdownToggle']);

app.directive(psDirectives);

app.factory('arrayJsonNode', function () {
    var arrayJsonNode = [
        {array:[1 , 2 , true]},
        {obj:{vet:true}},
        {id:"user"}
    ];
    return arrayJsonNode;
});

app.factory('objectJsonNode', function () {
    var objectJsonNode = {
        array:[1 , 2 , true],
        obj:{vet:true},
        id:"user"
    };
    return objectJsonNode;
});

app.filter('jsonNodeWrapper', function ($filter) {
    return function (input, config) {
        var wrappedJsonNode = {
            id:"node",
            childArray:angular.isArray(input) ? input : $filter('objectToArray')(input),
            parent:{},
            depth:1
        };

        return wrappedJsonNode;
    };
});

app.filter('objectToArray', function () {
    return function (object) {
        var array = [];
        var keyArray = Object.keys(object);

        for (var i = 0; i < keyArray.length; i++) {
            var wrapObj = {};
            wrapObj[keyArray[i]] = object[keyArray[i]]
            array.push(wrapObj);
        }

        console.log(object, ' ->objectToArray-> ', array);
        return array;
    };
});

app.controller("AppCtrl",function($scope, objectJsonNode) {
    $scope.data = {jsonNode:objectJsonNode };
});

app.directive('nodeTree', function () {
    return {
        restrict: 'C',
        template: '<textarea rows="10" cols="10"></textarea>',
        transclude: true,
        replace: true,
        controller: function($scope, $element, $transclude) {
            $element.append($transclude().contents());
        }
    }
});


/**
 * TODO: inject configured item and use same directive for string/boolean
 */
app.directive('psEbool', function () {
	return {
		restrict: 'AE',
		scope: {
			id:"@",
			key:"@"
		},
		template:'<div>\n    <span ng-dblclick="item.toggleEditing()" ng-hide="item.editing">{{item.value}}</span>\n    <form ng-submit="item.toggleEditing()" ng-show="item.editing">\n        <label for="{{item.id}}" ng-show="item.getKey()" \n               >{{key}}</label>\n        <input id="{{item.id}}"\n               type="checkbox" \n               style="{{item.style}}"\n               ng-focus="item.editing"\n               ng-model="item.value"\n               ng-blur="item.onBlur(\'input\')"\n               ng-mousedown="item.value=!item.value"\n               >{{item.value}}\n    </form>    \n</div>\n',
		transclude: true,
		replace: true,
		controller:function psEboolCtrl($scope, $transclude) {
			console.debug('psEboolCtrl$scope: ',$scope);
			console.warn($transclude().contents()[0].data);
			console.warn("true");
			console.warn(true);
//			var item = {value: $transclude().contents()[0].data};
			var item = {value: true};
			item.id = $scope.id;// || $scope.$id
			item.type = 'checkbox';
			item.style = '';
			item.editing = false;
			item.key = $scope.key;
			item.onBlur = function(src){
				console.debug('item.onBlur: ',src);
//				if(src!=='input')
					item.toggleEditing();
				/*else{
					item.value = ! item.value;
					item.toggleEditing();
				}*/
			};
			item.getType = function(){return 'checkbox';};
			item.getKey = function(){
				/*console.debug('psEboolCtrl$scope: ',$scope);
				console.debug('psEboolCtrl item.key: ',item.key);
				console.debug('psEboolCtrl$scope.key: ',$scope.key);*/
				return $scope.key;
			};

			item.toggleEditing = function(){
				console.debug('toggleEditing()');
				return item.editing = ! item.editing;
			};

			$scope.item = item;
//			$scope.value = true;
		}
	};
});



/*
//Credit for ngBlur and ngFocus to https://github.com/addyosmani/todomvc/blob/master/architecture-examples/angularjs/js/directives/
*//**
 * Directive that executes an expression when the element it is applied to loses focus.
 *//*
app.directive('ngBlur', function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			console.debug('ngBlur->blur event captured');
			scope.$apply(attrs.ngBlur);
		});
	};
});
*//**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 *//*
app.directive('ngFocus', function( $timeout ) {
	return function( scope, elem, attrs ) {
		scope.$watch(attrs.ngFocus, function( newval ) {
			if ( newval ) {
				$timeout(function() {
					console.debug('ngFocus->elem[0]:',elem[0]);
					elem[0].focus();
				}, 0, false);
			}
		});
	};
});

app.directive('psStringItem', function () {
	return {
		restrict: 'A',
		template:'<div>\n    <span ng-dblclick="item.toggleEditing()" ng-hide="item.editing">{{item.stringValue}}</span>\n    <form ng-submit="item.toggleEditing()" ng-show="item.editing">\n        <input style="width:{{(item.stringValue.length*8)}}px;" ng-model="item.stringValue" ng-blur="item.toggleEditing()" ng-focus="item.editing" ng-transclude>\n    </form>    \n</div>\n',
		transclude: true,
		replace: true,
		controller:function ($scope, $transclude) {
			*//*console.log('controller() $transclude.contents():',contents[0].data);*//*

			var item = {stringValue: $transclude().contents()[0].data};

			item.editing = false;

			item.toggleEditing = function(){
				console.debug('toggleEditing()');
				return item.editing = ! item.editing;
			};

			$scope.item = item;
		}
	};
});*/

