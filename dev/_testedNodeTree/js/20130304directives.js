'use strict';

/* Directives */
console.debug('> in directive.js');

app.directive('psNodeTree', function ($compile) {
	console.log('> in psNodeTree directive');
	return {
		restrict:'E', //Element
		link:function (scope, element, attrs) {
//			console.log('psNodeTree attrs:',attrs);
//			console.log('psNodeTree scope:',scope);

			scope.getType = function(value) {
				console.log('getType: ', value);
				return "node";
			};

			scope.getLength = function(value){
				if(angular.isArray(value))
					return ' [' + Object.keys(value).length + ']';
				else if(angular.isObject(value))
					return ' {' + Object.keys(value).length + '}';
				else
					return '';
			}

			scope.getNode = function(value){
				console.log('getNode: ', scope);
				var template;
				if(angular.isString(value)){
					template = '<ps-string-node node="value"></ps-string-node>';
				}else{
					template =  '<ps-node node="value" type="{{getType(value)}}"></ps-node>';
				}
//				var linkFunction = $compile(template);
//				linkFunction(scope);

				return $compile(template);
			}

			var template = angular.element('<ul id="nodeTree">' +
				'<li>'+attrs.data + scope.getLength(scope[attrs.data]) +
					'<ul>' +
						'<li ng-repeat="(key, value) in '+attrs.data+'">' +
//							'{{key}}' + '{{getLength(key)}}' +
//							'{{getNode(value)(this)}}' +
							'<ps-node node="value" type="{{getType(value)}}"></ps-node>' +
						'</li>\n' +
					'</ul>' +
				'</li>'+
			'</ul>');
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
		link:function (scope, element, attrs) {
			console.log('psNode scope:',scope);
			console.log('psNode element:',element);
			console.log('psNode attrs:',attrs);
//			console.log('psNode attrs:',scope['type']);
			scope.node = scope.value;
//			scope.getType = scope.$parent.getType;
			scope.getLength = scope.$parent.getLength;

			function getType(value) {
				console.log('getType: ', value);
				return "node";
			}
			if(typeof scope.node === "boolean"){
				console.log('psNode boolean scope.node:',scope.node);
				var template = angular.element('<span ng-class="key">{{key}}</span><span> : </span><ps-boolean-node value="{{node}}"></ps-boolean-node>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}else if(angular.isNumber(scope.node)){
                console.log('psNode number scope.node:',scope.node);
                var template = angular.element('<span ng-class="key">{{key}}</span><span> : </span><ps-number-node value="{{node}}"></ps-number-node>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else if(angular.isString(scope.node)){
				console.log('psNode string scope.node:',scope.node);
				var template = angular.element('<span ng-class="key">{{key}}</span><span> : </span><ps-string-node value="{{node}}"></ps-string-node>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}else if(angular.isArray(scope.node)){
                console.log('psNode array scope.node:',scope.node);
                var template = angular.element('<span ng-class="key">{{key}}</span><span> : </span><ps-array-node node="node"></ps-array-node>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else if(angular.isObject(scope.node)){
                console.log('psNode object scope.node:',scope.node);
                var template = angular.element('<span ng-class="key">{{key}}</span><span> : </span><ps-object-node node="node"></ps-object-node>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else{
                throw new Error('unknow type');
/*				console.log('psNode non-string scope.node:',scope.node);
				var template = angular.element('<ul>\n    ' +
					'<li ng-repeat="(key, value) in node">' +
					//'{{key}}' +
					'<ps-node node="value"></ps-node>' +
					'</li>' +
					'</ul>');

				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);*/
			}
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
		replace: true,
		template: '<span>{{value}} (Boolean)</span>'
	};
});
app.directive('psNumberNode', function ($compile) {
    console.log('psNumberNode');
    return {
        restrict:'E', //Element
        scope:{
            value:"@"
        },
        replace: true,
        template: '<span>{{value}} (Number)</span>'
    };
});
app.directive('psStringNode', function ($compile) {
	console.log('psStringNode');
	return {
		restrict:'E', //Element
		scope:{
			value:"@"
		},
		replace: true,
		template: '<span>"{{value}}" (String)</span>'
	};
});

app.directive('psArrayNode', function ($compile) {
	console.log('psArrayNode');
	return {
		restrict:'E', //Element
		scope:{
			node:"="
		},
		replace: true,
//		template: '<span>"{{value}}" (Array)</span>'
        link:function (scope, element, attrs) {
            console.log('psArrayNode scope:',scope);
            console.log('psArrayNode element:',element);
            console.log('psArrayNode attrs:',attrs);

            var template = angular.element('<span>'+attrs.node+' [' + scope.node.length + ']</span>\n' +
                    '<ul>\n' +
                        '<li ng-repeat="(key, value) in node">' +
//                            '{{key}}' +
                            '<ps-node node="value"></ps-node>' +
                        '</li>' +
                    '</ul>' +
                '</li>' +
            '</ul>');

            var linkFunction = $compile(template);
            linkFunction(scope);
            element.html(null).append(template);
        }
	};
});

app.directive('psObjectNode', function ($compile) {
    console.log('psObjectNode');
    return {
        restrict:'E', //Element
        scope:{
            node:"="
        },
        replace: true,
//		template: '<span>"{{value}}" (Array)</span>'
        link:function (scope, element, attrs) {
            console.log('psArrayNode scope:',scope);
            console.log('psArrayNode element:',element);
            console.log('psArrayNode attrs:',attrs);

            function getObjectLength(object){
                return object.$$hashKey?Object.keys(scope.node).length-1:Object.keys(scope.node).length;
            }

            var template = angular.element('<span>'+attrs.node+' {' + getObjectLength(scope.node) + '}</span>\n' +
                '<ul>\n' +
                    '<li ng-repeat="(key, value) in node">' +
//                        '{{key}}' +
                        '<ps-node node="value"></ps-node>' +
                    '</li>' +
                '</ul>');
/*            var template = angular.element('<ul>\n' +
                '<li>'+attrs.node+' {' + getObjectLength(scope.node) + '}\n' +
                '<ul>\n' +
                '<li ng-repeat="(key, value) in node">' +
                '{{key}}' +
                '<ps-node node="value"></ps-node>' +
                '</li>' +
                '</ul>' +
                '</li>' +
                '</ul>');*/

            var linkFunction = $compile(template);
            linkFunction(scope);
            element.html(null).append(template);
        }
    };
});

