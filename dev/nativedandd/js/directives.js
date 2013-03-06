'use strict';

/* Directives */
console.debug('> in directive.js');

/**
 * source: https://coderwall.com/p/ngisma
 * @param fn
 */
var safeApply = function (fn) {
	var phase = this.$root.$$phase;
	if (phase == '$apply' || phase == '$digest') {
		if (fn) fn();
	} else {
		this.$apply(fn);
	}
};
// run blocks
app.run(function($rootScope) {
	$rootScope.safeApply = safeApply;
//monkeypatch default apply
	hook($rootScope, 'apply', safeApply);
});

/*
 * A directive that allows creation of custom onclick handlers that are defined as angular
 * expressions and are compiled and executed within the current scope.
 *
 * Events that are handled via these handler are always configured not to propagate further.
 */
var psEventDirectives = {};
angular.forEach(
	'dragstart dragenter dragover dragleave drop dragend'.split(' '),
	function (name) {
		var directiveName = 'ps' + angular.uppercase(name.substring(0, 1)) + name.substring(1);
		psEventDirectives[directiveName] = ['$parse', function ($parse) {
			return function (scope, element, attr) {
				var fn = $parse(attr[directiveName]);
				element.bind(angular.lowercase(name), function (event) {
					scope.safeApply(function () {
						fn(scope, {$event:event});
					});
				});
			};
		}];
	}
);

app.directive(psEventDirectives);

/*function psFn(fn){

 var resultFn = function(){};

 return resultFn;
 }*/

/*function callbackWrap(object, property, argumentIndex, wrapperFactory, extra) {
 var original = object[property];
 object[property] = function() {
 arguments[argumentIndex] = wrapperFactory(arguments[argumentIndex], extra, arguments);
 return original.apply(this, arguments);
 }
 return original;
 }

 function logWrapper(func, extra, args) {
 console.log(arguments);
 console.log(args);
 return function() {
 console.log("whoooaaaaa: " + extra,arguments);
 return func.apply(this, arguments);
 }
 }

 callbackWrap(app, "directive", 1, logWrapper, "wrapped a app.directive!");*/


/*hook(link, null, function() {
 console.log("hook=>link("+arguments.length+")=>",arguments);
 });*/


app.directive('psDraggable', function ($compile) {
	console.log('> in psDraggable directive');

	return {
		controller:function ($scope, $element) {
            var thiz;

			$scope.handleDragStart = function ($event) {
				console.debug("handleDragStart event:", $event);

				// Target (this) element is the source node.
				this.style.opacity = '0.4';
				console.log('$event.currentTarget',$event.currentTarget);
				console.log('this',this);
//dragSrcEl = $event.currentTarget;
				$scope.thiz = this;
//				$scope.thiz = $event.currentTarget;
				console.log('$scope.thiz',$scope.thiz);

				$event.dataTransfer.effectAllowed = 'move';
				var jsonScope = angular.toJson({key: $scope.key, value: $scope.value});
//				var jsonScope = angular.toJson($scope);
				$event.dataTransfer.setData('application/json', jsonScope);
//				$event.dataTransfer.setData('text/html', $scope.thiz.innerHTML);
			};

			$scope.handleDragEnter = function ($event) {


				console.debug("handleDragEnter event:", $event);

				console.log('$event.target', $event.target);
				console.log('$event.currentTarget', $event.currentTarget);
				console.log('$event.fromElement', $event.fromElement);
				console.log('$event.toElement', $event.toElement);
				console.log($event.currentTarget === $event.fromElement);
				console.log($event.currentTarget == $event.fromElement);


				// this / $event.target is the current hover target.
				$element.addClass('over');

//	            $element.classList.add('over');
			};

			$scope.handleDragOver = function ($event) {
//console.debug("handleDragOver event:",$event);
				//In the case of dragging something like a link, we need to prevent
				// the browser's default behavior, which is to navigate to that link.
				if ($event.preventDefault) {
					$event.preventDefault(); // Necessary. Allows us to drop.
				}

				$event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

				return false;
			};
			$scope.handleDragLeave = function ($event) {
				console.debug("handleDragLeave event:", $event);
				$element.removeClass('over');  // this / $event.target is previous target element.
			};
			$scope.handleDrop = function ($event) {
				console.debug("handleDrop event:", $event);
				// this/$event.target is current target element.

				function swap(a, b){
					console.log(a,b);
					b.key = a.key;
					b.value = a.value;
					/*var temp = a;
					a = b;
					b = temp;*/
					console.log(a,b);
				}

				if ($event.stopPropagation) {
					$event.stopPropagation(); // Stops some browsers from redirecting.
				}

				// Don't do anything if dropping the same column we're dragging.
				if ($scope.thiz != $event.currentTarget) {
					console.log('$element',$element);
					console.log('$event.currentTarget',$event.currentTarget);
					console.log('$event.target',$event.target);
					console.log('$scope.thiz',$scope.thiz);
					console.log('this',this);
					// Set the source column's HTML to the HTML of the column we dropped on.
					$event.target.innerHTML = this.innerHTML;
//					this.innerHTML = $event.dataTransfer.getData('text/html');
					var jsonString = $event.dataTransfer.getData('application/json');
					swap(angular.fromJson(jsonString), $scope);
					$compile($element)($scope).$apply();
//					updateLater(); // kick off the UI update process.
/*					$scope.thiz.innerHTML = $event.currentTarget.innerHTML;
					$event.currentTarget.innerHTML = $event.dataTransfer.getData('text/html');*/
				}else{
					console.log('Drop on drag source detected!');
				}

//			    $element.style.opacity='1';

				return false;
			};
			$scope.handleDragEnd = function ($event) {
				console.debug("handleDragEnd event:", $event);
				// this/$event.target is the source node.

				[].forEach.call(cols, function (col) {
					col.classList.remove('over');
					col.style.opacity = '1';
				});
			};
		},
		link:function (scope, element, attrs) {
			console.log('psArrayNode scope:', scope);
			console.log('psArrayNode element:', element);
			console.log('psArrayNode attrs:', attrs);
			element.attr('draggable', true);
			element.bind('dragstart', scope.handleDragStart);
			element.bind('dragenter', scope.handleDragEnter);
			element.bind('dragover', scope.handleDragOver);
			element.bind('dragleave', scope.handleDragLeave);
			element.bind('drop', scope.handleDrop);
			element.bind('dragend', scope.handleDragEnd);

			/*	        element.attr('ps-dragstart', "handleDragStart($event)");
			 element.attr('ps-dragenter', "handleDragEnter($event)");
			 element.attr('ps-dragover', "handleDragOver($event)");
			 element.attr('ps-dragleave', "handleDragLeave($event)");
			 element.attr('ps-drop', "handleDrop($event)");
			 element.attr('ps-dragend', "handleDragEnd($event)");*/

//			element.val(scope.$eval(element));
		}
	};
});
/*hook(directives, 'psDraggable', function() {
 console.log("hook=>psDraggable("+arguments.length+")=>",arguments);
 });*/

app.directive('psDroppable', function ($compile) {
});

console.log('app', app)