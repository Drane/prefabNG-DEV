var app = angular.module('app', ['ui.bootstrap.dropdownToggle']);

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
