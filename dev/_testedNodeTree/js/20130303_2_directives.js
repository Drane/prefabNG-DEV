'use strict';

/* Directives */
console.debug('> in directive.js');

app.directive('psNodeTree', function ($compile) {
	console.log('> in psNodeTree directive');
	return {
		restrict:'E', //Element
		link:function (scope, element, attrs) {
			//console.log('attrs:',attrs);
			//console.log('scope:',scope);

			var template = angular.element('<ul id="nodeTree">\n    ' +
				'<li ng-repeat="(key, value) in '+attrs.data+'">' +
					'{{key}}' +
					'<ps-node node="value"></ps-node>' +
				'</li>\n' +
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
			scope.node = scope.value;


//			var template = angular.element('<span>{{node}}</span>');
			if(!angular.isString(scope.node)){
				console.log('psNode non-string scope.node:',scope.node);
				var template = angular.element('<ul>\n    ' +
					'<li ng-repeat="(key, value) in node">' +
					'{{key}}' +
					'<ps-node node="value"></ps-node>\n    ' +
					'</li>\n' +
					'</ul>');

				var linkFunction = $compile(template);
				linkFunction(scope);
				element.replaceWith(template);
			}else{
				console.log('psNode string scope.node:',scope.node);
				var linkFunction = $compile(angular.element('<span>'+scope.node+'</span>'));
				linkFunction(scope);
				element.html(null).append(' = '+scope.node);
			}
		}
	};
});