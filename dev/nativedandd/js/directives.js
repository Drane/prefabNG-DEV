'use strict';

/* Directives */
console.debug('> in directive.js');


/*
 * A directive that allows creation of custom onclick handlers that are defined as angular
 * expressions and are compiled and executed within the current scope.
 *
 * Events that are handled via these handler are always configured not to propagate further.
 */
var psEventDirectives = {};
angular.forEach(
    'dragstart dragenter dragover dragleave drop dragend'.split(' '),
    function(name) {
        var directiveName = 'ps' + angular.uppercase(name.substring(0,1)) + name.substring(1);
        psEventDirectives[directiveName] = ['$parse', function($parse) {
            return function(scope, element, attr) {
                var fn = $parse(attr[directiveName]);
                element.bind(angular.lowercase(name), function(event) {
                    scope.$apply(function() {
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


app.directive('psDraggable', function ($compile){
    console.log('> in psDraggable directive');

    return {
        controller:function($scope){
            var dragSrcEl;

            $scope.handleDragStart = function($event) {
                console.debug("handleDragStart event:", $event);

                // Target (this) element is the source node.
                $event.currentTarget.style.opacity = '0.4';
                dragSrcEl = $event.currentTarget;

                $event.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', this.innerHTML);
            };

            $scope.handleDragEnter = function handleDragEnter($event) {
                console.debug("handleDragEnter event:", $event);
                // this / e.target is the current hover target.
                this.classList.add('over');
            };
        },
        link: function (scope, element, attrs) {
            console.log('psArrayNode scope:', scope);
            console.log('psArrayNode element:', element);
            console.log('psArrayNode attrs:', attrs);
        }
    };
});
/*hook(directives, 'psDraggable', function() {
    console.log("hook=>psDraggable("+arguments.length+")=>",arguments);
});*/

app.directive('psDroppable', function($compile){});

console.log('app',app)