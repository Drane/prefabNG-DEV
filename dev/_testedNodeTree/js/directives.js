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
							'{{key}}' + '{{getLength(key)}}' +
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

			function getType(value) {
				console.log('getType: ', value);
				return "node";
			}



			if(typeof scope.node === "boolean"){
				console.log('psNode boolean scope.node:',scope.node);
				var template = angular.element('<span> : </span><ps-boolean-node value="{{node}}"></ps-boolean-node>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);

			}else if(angular.isString(scope.node)){
				console.log('psNode string scope.node:',scope.node);
				var template = angular.element('<span> : </span><ps-string-node value="{{node}}"></ps-string-node>');
				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);

			}else{
				console.log('psNode non-string scope.node:',scope.node);
				var template = angular.element('<ul>\n    ' +
					'<li ng-repeat="(key, value) in node">' +
					'{{key}}' +
					'<ps-node node="value"></ps-node>' +
					'</li>' +
					'</ul>');

				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}
		}
	};
});
app.directive('psBooleanNode', function ($compile) {
	console.log('psStringNode');
	return {
		restrict:'E', //Element
		scope:{
			value:"@"
		},
		replace: true,
		template: '<span>{{value}}</span>'
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
		template: '<span>"{{value}}"</span>'
	};
});

