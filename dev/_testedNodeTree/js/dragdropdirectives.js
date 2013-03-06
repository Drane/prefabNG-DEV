'use strict';

/* Directives */
console.debug('> in directive.js');

app.directive('psNodeTree', function ($compile) {
    console.log('> in psNodeTree directive');

    return {
        scope:{
            data:"=",
            //label:'@',
            depth:'='
        },
        restrict:'E', //Element
        replace:true,
        link:function (scope, element, attrs) {
            console.log('psNodeTree attrs:', attrs);
            console.log('psNodeTree scope:', scope);

            scope.getType = function (value) {
                console.log('getType: ', value);
                var type = "";

                if (typeof value === "boolean") {
                    type = "leaf boolean";
                } else if (angular.isNumber(value)) {
                    type = "leaf number";
                } else if (angular.isString(value)) {
                    type = "leaf string";
                } else if (angular.isArray(value)) {
                    type = "node array";
                } else if (angular.isObject(value)) {
                    type = "node object";
                }

                scope.type = type;

                return type + "-type";
            };

           /* scope.nodeWrap = {};
            scope.nodeWrap[attrs.node] = scope[attrs.node];
            attrs.data = "nodeWrap";*/
            var template = angular.element('<ul id="nodeTree" ng-model="data" ui-sortable>' +
                '<li ng-repeat="value in data">' +
                '<span>handle {{$index}}<input type="text" ng-model="value.name"></span>'+

                //'<li ng-repeat="(key, value) in data">' +
                //'<h3>{{key}} => {{value.name}}</h3>'+
                //'<input type="text" ng-model="value.name">'+
                //'<input type="text" ng-model="str">'+
                //'<ps-node></ps-node>' + //class="{{getType(value)}}"
                '</li>' +
                '</ul>');

//            scope.depth = attrs.depth;

            var linkFunction = $compile(template);
            linkFunction(scope);
            element.html(null).append(template);
        }
    };
});
app.directive('psNode', function ($compile) {
    console.log('> in psNode directive');
    return {
        restrict:'E', //Element
        replace:true,
        link:function (scope, element, attrs) {
            console.log('psNode scope:', scope);
            console.log('psNode element:', element);
            console.log('psNode attrs:', attrs);
//			console.log('psNode attrs:',scope['type']);
            scope.node = scope.value;
            scope.getType = scope.$parent.getType;
            scope.getLength = scope.$parent.getLength;
            scope.depth = scope.$parent.depth - 1;

            function getType(value) {
                console.log('getType: ', value);
                return "node";
            }

            console.log('scope.node: ', scope.node);
            var template;
            if (typeof scope.node === "boolean") {
                console.log('psNode boolean scope.node:', scope.node);
                template = angular.element('<i class="icon-boolean"></i><span class="key">{{key}}</span><span> : </span><ps-boolean-node value="{{node}}"></ps-boolean-node>');
            } else if (angular.isNumber(scope.node)) {
                console.log('psNode number scope.node:', scope.node);
                template = angular.element('<i class="icon-number"></i><span class="key">{{key}}</span><span> : </span><ps-number-node value="{{node}}"></ps-number-node>');
            } else if (angular.isString(scope.node)) {
                console.log('psNode string scope.node:', scope.node);
                template = angular.element('<i class="icon-string"></i><span class="key">{{key}}</span><span> : </span><ps-string-node value="{{node}}"></ps-string-node>');
            } else if (angular.isArray(scope.node)) {
                console.log('psNode array scope.node:', scope.node);
                /*if (scope.depth >= 0) {
                 template = angular.element('<i class=" icon-folder-open-alt"></i><span class="key">{{key}}</span><span> </span><ps-array-node node="node" label=""></ps-array-node>');//Array
                 } else
                 template = angular.element('<i class="icon-folder-close-alt"></i><span class="key">{{key}}</span><span> </span>');//Array*/
                template = angular.element('<ps-array-node node="node" label="" toggle="open" depth="depth"></ps-array-node>');
//				template = angular.element('<span class="key">{{key}}</span><span> </span><ps-array-node node="node" label="" toggle="open"></ps-array-node>');

            } else if (angular.isObject(scope.node)) {
                console.log('psNode object scope.node:', scope.node);
                /*if (scope.depth >= 0) {
                 template = angular.element('<i class=" icon-folder-open"></i><span class="key">{{key}}</span><span> </span><ps-object-node node="node" label=""></ps-object-node>');//Object
                 } else
                 template = angular.element('<i class=" icon-folder-close"></i><span class="key">{{key}}</span><span> </span>');//Objectay*/
                template = angular.element('<ps-object-node node="node" label="{{key}}" toggle="open"></ps-object-node>');//Object
//				template = angular.element('<span class="key">{{key}}</span><span> </span><ps-object-node node="node" label="" toggle="open"></ps-object-node>');//Object

            }
            var linkFunction = $compile(template);
            linkFunction(scope);
            element.replaceWith(template);
        }
    };
});
app.directive('psBooleanNode', function ($compile) {
    console.log('psBooleanNode');
    return {
        restrict:'E', //Element
        scope:{
            value:"@"
        },
        replace:true,
        template:'<span class="boolean-node">{{value}} (Boolean)</span>'
    };
});
app.directive('psNumberNode', function ($compile) {
    console.log('psNumberNode');
    return {
        restrict:'E', //Element
        scope:{
            value:"@"
        },
        replace:true,
        template:'<span class="number-node">{{value}} (Number)</span>'
    };
});
app.directive('psStringNode', function ($compile) {
    console.log('psStringNode');
    return {
        restrict:'E', //Element
        scope:{
            value:"@"
        },
        replace:true,
        template:'<span class="string-node">"{{value}}" (String)</span>'
    };
});

app.directive('psArrayNode', function ($compile) {
    console.log('psArrayNode');
    return {
        restrict:'E', //Element
        scope:{
            node:"=",
            //label:'@',
            depth:'='
        },
        replace:true,
        link:function (scope, element, attrs) {
            console.log('psArrayNode scope:', scope);
            console.log('psArrayNode element:', element);
            console.log('psArrayNode attrs:', attrs);

            scope.iconClass = 'icon-folder-close-alt';

//			var button = '<button class="btn btn-mini" type="button" ng-click="toggleOpen()"><i ng-class="iconClass""></i></button>';
            var icon = '<i ng-class="iconClass""></i>';
            var key = '<span ng-click="toggle()" class="key">{{$parent.key}}</span><span> : </span>';
            var header = '<span ng-click="toggle()">' + (attrs.label ? attrs.label : '') + ' [' + scope.node.length + ']</span>\n';

            var templateContent = '<span ng-show="open">: [</span>\n<ul ui-sortable ng-show="open">\n' +
                '<li class="{{getType(value)}}" ng-repeat="(key, value) in node">' +
                '<ps-node node="value"></ps-node>' +
                '</li>' +
                '</ul>\n<span ng-show="open">]</span>';

            scope.regToggleCb(function (open) {
                if (!scope.open)
                    scope.open = open;

                scope.iconClass = open ? 'icon-folder-open-alt' : 'icon-folder-close-alt';
                if (open) {
                    render();
                }
            });

            if (scope.depth > 0) {
                scope.toggle();
                render();
            }

            function render() {
//				var template = angular.element('<ul><li>' + icon + key + header + (scope.open||open?templateContent:'') +'</li></ul>');
                var template = angular.element(icon + key + header + (scope.open ? templateContent : ''));
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.html(null).append(template);
            }

            render();
        }
    };
});

app.directive('psObjectNode', function ($compile) {
    console.log('psObjectNode');
    return {
        restrict:'E', //Element
        scope:{
            node:"=",
            label:'@',
            depth:'@'
        },
        replace:true,
        link:function (scope, element, attrs) {
            console.log('psObjectNode scope:', scope);
            console.log('psObjectNode element:', element);
            console.log('psObjectNode attrs:', attrs);

            scope.iconClass = 'icon-folder-close';

            var icon = '<i ng-class="iconClass"></i>';
            var key = '<span ng-click="toggle()" class="key">{{$parent.key}}</span><span> : </span>';
            var header = '<span ng-click="toggle()">' + (attrs.label ? attrs.label : '') + ' {' + getObjectLength(scope.node) + '}</span>\n';

            function getObjectLength(object) {
                return object.$$hashKey ? Object.keys(scope.node).length - 1 : Object.keys(scope.node).length;
            }

            var templateContent = '<span ng-show="open">: {</span>\n<ul ui-sortable ng-show="open">\n' +
                '<li ng-repeat="(key, value) in node">' +
                '<ps-node node="value"></ps-node>' +
                '</li>' +
                '</ul>\n<span ng-show="open">}</span>';

            scope.regToggleCb(function (open) {
                scope.iconClass = open ? 'icon-folder-open' : 'icon-folder-close';
                if (open) {
                    render();
                }
            });

            if (scope.depth > 0) {
                scope.toggle();
            }

            function render() {
                var template = angular.element(icon + key + header + (scope.open ? templateContent : ''));
//				var template = angular.element('<ul><li>' + icon + header + (scope.open?templateContent:'') +'</li></ul>');

                var linkFunction = $compile(template);
                linkFunction(scope);
                element.html(null).append(template);
            }

            render();
        }
    };
});

app.directive('toggle', function () {
    return {
        controller:function ($scope) {
            this.cb = null;

            $scope.toggle = function () {
                $scope[$scope.toggleAttribute] = !$scope[$scope.toggleAttribute];
                console.log('$scope[$scope.toggleAttribute]: ', $scope[$scope.toggleAttribute]);
                if (this.cb)
                    this.cb($scope[$scope.toggleAttribute]);
            };

            $scope.regToggleCb = function (cb) {
                this.cb = cb;
            };
        },
        link:function (scope, element, attrs) {
            console.log('psArrayNode scope:', scope);
            console.log('psArrayNode element:', element);
            console.log('psArrayNode attrs:', attrs);
            scope.toggleAttribute = attrs.toggle;
            scope[attrs.toggle] = false;

            /*element.bind("click", function () {
             console.log(scope);
             scope.toggle();
             });*/


        }
    };
});

app.directive('psTemp', function ($compile) {
    return {
        restrict:'E', //Element
        scope:{
            node:"=",
            depth:'='
        },
        link:function (scope, element, attrs) {
            console.log('psTemp scope:', scope);
            console.log('psTemp element:', element);
            console.log('psTemp attrs:', attrs);

            var template = angular.element('<ul ng-model="node">\n    <input type="text" ng-model="node[0]">\n    <li ng-repeat="(key, value) in node">\n        <h3>key:{{key}}</h3>\n        <ul class="value"\n             >\n            <li>\n                value: <input type="text" ng-model="value">\n            </li>\n        </ul>\n    </li>\n</ul>');
            var linkFunction = $compile(template);
            linkFunction(scope);
            element.html(null).append(template);
        }
    };
});