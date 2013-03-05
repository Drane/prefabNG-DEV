'use strict';

/* Directives */
console.debug('> in directive.js');

app.directive('psNodeTree', function ($compile) {
	console.log('> in psNodeTree directive');

	return {
		restrict:'E', //Element
		replace: true,
		link:function (scope, element, attrs) {
			console.log('psNodeTree attrs:',attrs);
			console.log('psNodeTree scope:',scope);

            scope.getType = function(value) {
                console.log('getType: ', value);
                var type = "";

                if(typeof value === "boolean"){
                    type = "leaf boolean";
                }else if(angular.isNumber(value)){
                    type = "leaf number";
                }else if(angular.isString(value)){
                    type = "leaf string";
                }else if(angular.isArray(value)){
                    type = "node array";
                }else if(angular.isObject(value)){
                    type = "node object";
                }

	            scope.type = type;

                return type+"-type";
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
					template =  '<ps-node node="value" type="type"></ps-node>';
				}
//				var linkFunction = $compile(template);
//				linkFunction(scope);

				return $compile(template);
			}

			scope.nodeWrap = {};
			scope.nodeWrap[attrs.data] = scope[attrs.data];
			attrs.data = "nodeWrap";
			scope.depth = attrs.depth;

			var template = angular.element('<ul id="nodeTree">' +
				'<li ng-repeat="(key, value) in '+attrs.data+'" class="{{getType(value)}}">'+
					'<ps-node></ps-node>' +//class="{{getType(value)}}"
				'</li>'+
			'</ul>');
/*			var template = angular.element('<ul id="nodeTree">' +
				'<li class="'+scope.getType(scope[attrs.data])+'">'+attrs.data + scope.getLength(scope[attrs.data]) +
					'<ul>' +
						'<li ng-repeat="(key, value) in '+attrs.data+'" class="{{getType(value)}}">'+
							'<ps-node></ps-node>' +//class="{{getType(value)}}"
						'</li>'+
					'</ul>' +
				'</li>'+
			'</ul>');*/
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
		replace: true,
		link:function (scope, element, attrs) {
			console.log('psNode scope:',scope);
			console.log('psNode element:',element);
			console.log('psNode attrs:',attrs);
//			console.log('psNode attrs:',scope['type']);
			scope.node = scope.value;
			scope.getType = scope.$parent.getType;
			scope.getLength = scope.$parent.getLength;
			scope.depth = scope.$parent.depth-1;

			function getType(value) {
				console.log('getType: ', value);
				return "node";
			}

			console.log('scope.node: ', scope.node);
			var template;
			if(typeof scope.node === "boolean"){
				console.log('psNode boolean scope.node:',scope.node);
				template = angular.element('<i class="icon-check"></i><span class="key">{{key}}</span><span> : </span><ps-boolean-node value="{{node}}"></ps-boolean-node>');
			}else if(angular.isNumber(scope.node)){
				console.log('psNode number scope.node:',scope.node);
				template = angular.element('<i class="icon-dashboard"></i><span class="key">{{key}}</span><span> : </span><ps-number-node value="{{node}}"></ps-number-node>');
			}else if(angular.isString(scope.node)){
				console.log('psNode string scope.node:',scope.node);
				template = angular.element('<i class="icon-quote-left"></i><span class="key">{{key}}</span><span> : </span><ps-string-node value="{{node}}"></ps-string-node>');
			}else if(angular.isArray(scope.node)){
				console.log('psNode array scope.node:',scope.node);
				if(scope.depth>=0){
					template = angular.element('<i class=" icon-folder-open-alt"></i><span class="key">{{key}}</span><span> </span><ps-array-node node="node" label=""></ps-array-node>');//Array
				}else
					template = angular.element('<button class="btn btn-mini" type="button"><i class="icon-folder-close-alt"></i></button><span class="key">{{key}}</span><span> </span>');//Array
			}else if(angular.isObject(scope.node)){
				console.log('psNode object scope.node:',scope.node);
				if(scope.depth>=0){
					template = angular.element('<i class=" icon-folder-open"></i><span class="key">{{key}}</span><span> </span><ps-object-node node="node" label=""></ps-object-node>');//Object
				}else
					template = angular.element('<i class=" icon-folder-close"></i><span class="key">{{key}}</span><span> </span>');//Objectay

			}
			var linkFunction = $compile(template);
			linkFunction(scope);
			element.replaceWith(template);

//				element.append(template);
//			element[0]=template;

/*
			if(typeof scope.node === "boolean"){
				console.log('psNode boolean scope.node:',scope.node);
				var template = angular.element('<li><span class="key">{{key}}</span><span> : </span><ps-boolean-node value="{{node}}"></ps-boolean-node></li>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}else if(angular.isNumber(scope.node)){
                console.log('psNode number scope.node:',scope.node);
                var template = angular.element('<li><span class="key">{{key}}</span><span> : </span><ps-number-node value="{{node}}"></ps-number-node></li>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else if(angular.isString(scope.node)){
				console.log('psNode string scope.node:',scope.node);
				var template = angular.element('<li><span class="key">{{key}}</span><span> : </span><ps-string-node value="{{node}}"></ps-string-node></li>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}else if(angular.isArray(scope.node)){
                console.log('psNode array scope.node:',scope.node);
                var template = angular.element('<li><span class="key">{{key}}</span><span> : </span><ps-array-node node="node"></ps-array-node></li>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else if(angular.isObject(scope.node)){
                console.log('psNode object scope.node:',scope.node);
                var template = angular.element('<li><span class="key">{{key}}</span><span> : </span><ps-object-node node="node"></ps-object-node></li>');
                var linkFunction = $compile(template);
                linkFunction(scope);
                element.replaceWith(template);
            }else{
                throw new Error('unknow type');
*//*				console.log('psNode non-string scope.node:',scope.node);
				var template = angular.element('<ul>\n    ' +
					'<li ng-repeat="(key, value) in node">' +
					//'{{key}}' +
					'<ps-node node="value"></ps-node>' +
					'</li>' +
					'</ul>');

				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);*//*
			}*/
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
		template: '<span class="boolean-node">{{value}} (Boolean)</span>'
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
        template: '<span class="number-node">{{value}} (Number)</span>'
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
		template: '<span class="string-node">"{{value}}" (String)</span>'
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

            var template = angular.element('<span>'+attrs.label+' [' + scope.node.length + ']</span>\n' +
                    '<ul>\n' +
                        '<li class="{{getType(value)}}" ng-repeat="(key, value) in node">' +
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

            var template = angular.element('<span>'+attrs.label+' {' + getObjectLength(scope.node) + '}</span>\n' +
                '<ul>\n' +
                    '<li class="{{$parent.getType(value)}}" ng-repeat="(key, value) in node">' +
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

