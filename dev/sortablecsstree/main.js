var myApp = angular.module('myApp', []);
myApp.factory('Data', function () {
    return {
        node : {
            id : "first",
            array : [1, 2, 3],
            obj : {bool : true, str : "name"}
        }
    };
});

myApp.filter('prettyJson',function(){
    return function(data){
        return angular.toJson(data, true);
//        return {node : "fake"};
    };
});

myApp.controller("NodeCtrl", function($scope, $log, Data){
    //$log.info('angular.toJson(Data.node, true): ',angular.toJson(Data.node, true));
    $scope.data = {node : angular.toJson(Data.node, true)};
});

/*
myApp.directive("recursive", function($compile) {
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
});*/

myApp.directive("nodeTree", function() {
    return {
        //restrict: 'C',
        //scope: {tree: '='},
        //template: '<p>{{ tree.text }}</p><ul><li ng-repeat="child in tree.children"><recursive><span tree="child"></span></recursive></li></ul>',
        transclude: true,
        template: '<div class="ng-transclude">transclude:</div>' /*+
            '<div ng-tranclude></div>'*/
/*        compile: function() {
            return  function() {
            }
        }*/
    };
});

myApp.factory('DataArray', function () {
    return [{"item":"first"},{"item":[1,2,3]},{"item":{"bool":true,"str":"name"}}];
});


myApp.filter('objectToArray', function () {
    return function (object) {
        var keys = Object.keys(object);
        var array = [];
        for(key in keys){
            array.push({key : object[key]});
        }
        return array;
    };
});

function FirstCtrl($scope) {
    $scope.sayHi = function(){alert('yo first')}
}

function SecondCtrl($scope, Data) {
    $scope.sayHi = function(){alert('yo second')}
    $scope.data = Data;
}