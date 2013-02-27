/*!
 * Created by prefabSOFT with JetBrains WebStorm.
 * User: Jochen Szostek
 * Date: 2/26/13
 * Time: 9:58 PM
 * Copyright (C) 2013 Jochen Szostek
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';
var psDirectives = {};

//Credit for ngBlur and ngFocus to https://github.com/addyosmani/todomvc/blob/master/architecture-examples/angularjs/js/directives/
/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
psDirectives.ngBlur = function() {
	return function( scope, elem, attrs ) {
		elem.bind('blur', function() {
			console.debug('ngBlur->blur event captured');
			scope.$apply(attrs.ngBlur);
		});
	};
};
/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
psDirectives.ngFocus = function( $timeout ) {
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
};

psDirectives.psEstr = function () {
	return {
		restrict: 'AE',
		scope: {},
		template:'<div>\n    <span ng-dblclick="item.toggleEditing()" ng-hide="item.editing">{{item.value}}</span>\n    <form ng-submit="item.toggleEditing()" ng-show="item.editing">\n        <input type="{{item.type}}"\n               style="{{item.getStyle()}}"\n               ng-model="item.value"\n               ng-blur="item.toggleEditing()"\n               ng-focus="item.editing">\n    </form>\n</div>',
		transclude: true,
		replace: true,
		controller:function ($scope, $transclude) {
			var item = {value: $transclude().contents()[0].data};
			item.type = 'text';
			item.getStyle = function () {
				return 'width:'+(item.value.length*8)+'px;';
			};


			item.editing = false;

			item.toggleEditing = function(){
				console.debug('toggleEditing()');
				return item.editing = ! item.editing;
			};

			$scope.item = item;
		}
	};
};