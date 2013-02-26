'use strict';

angular.module('ngNodeTreeApp', ['ui.bootstrap']);
/*	.directive('myRepeatDirective', function() {
		return function(scope, element, attrs) {
			if (scope.$last){
//				angular.element(element).css('color','blue');
//				window.alert("im the last!"+scope.$parent.key);
//				scope.parentType = null;
				scope.$emit('LastElem');
			}
		};
	})
	.directive('myMainDirective', function() {
		return function(scope, element, attrs) {
//			angular.element(element).css('border','5px solid red');
			scope.$on('LastElem', function(event){
				scope.parentType = null;
			});
		};
	});*/

var value = {
	array:[1 , 2 , true],
	obj : {vet : true},
//	array : [1, true, "three"],
	id :"user"
//	test : true
//	obj : {vet : true}
	//fake: true,
	/*children:[
	 {
	 id:"subuser1",
	 children:{id:"laatste", children:[]}
	 }*//*,
	 {
	 id:"subuser2",
	 children:{id:"laatste", children:[{
	 id:"subsubuser1",
	 children:{id:"laatste", children:[]}
	 }]}
	 },*/
	/*{
	 id:"subuser3",
	 children:[
	 {
	 id:"subsubuser1",
	 children:{id:"laatste", children:[]}
	 },
	 {
	 id:"subsubuser2",
	 children:{id:"laatste", children:[]}
	 }
	 ]
	 }*/
	//]
};

function refresh(templateId, $scope, $templateCache, $timeout) {
    $templateCache.remove(templateId);
    $scope.logTemplate = '';
    $timeout(function () {
        $scope.logTemplate = templateId;
    }, 1000);
}

/* Controllers */
function DevController($scope, $log) {
	$log.info('devController');

	$scope.parentType = null;

	$scope.log = $log;

//	$scope.refresh = refresh

	$scope.resetParent = function(){
		$log.info('devController->resetParent');
		$scope.$parent.parentType = null;
	}

	$scope.isArray = function(value){
		$log.info('devController->isArray?', value, 'result: ',angular.isArray(value));
		return angular.isArray(value);
	}

	$scope.isObjectNotArray = function(value){
		$log.info('devController->isObjectNotArray?', value, 'result: ',!angular.isArray(value) && angular.isObject(value));
		return !angular.isArray(value) && angular.isObject(value);
	}

	$scope.isNotArrayOrObject = function(value){
		$log.info('devController->isNotArrayOrObject?', value, 'result: ',!angular.isArray(value) && !angular.isObject(value));
		return !angular.isArray(value) && !angular.isObject(value);
	}

	$scope.isObject = function(value){
		return angular.isObject(value);
	}

	var parentType = null;


	$scope.getRootNode = function(value){
		$log.info('hier',value);
		parentType = value;
		return 'node.html';
	}

	$scope.getTemplate = function(value){

		$log.info('devController->getTemplate?parentType',parentType);
		$log.info('devController->getTemplate?"scope value',$scope.value, '$scope: ',$scope);
//		$log.info('devController->getTemplate?$scope.$parent: ',$scope.$parent, "scope.$parent value",$scope.$parent.value);
		/*if(!angular.isArray(value) && !angular.isObject(value))
			template = 'nodeLeaf.html';*/

		var template = 'nodeLeaf.html';

		if(angular.isArray(value)){
			template = 'nodeArrayChild.html';
			parentType = "array";
		}else if(angular.isObject(value)){
			template = 'nodeObjectChild.html';
			parentType = "object";
		}else{
			if(parentType === "array"){
				template = 'arrayLeaf.html';
			}else if(parentType === "object"){
				template = 'objectLeaf.html';
			}else{
				template = 'nodeLeaf.html';
				//parentType = null;
			}
//			parentType = null;
		}
		$log.warn('*** devController->getTemplate?', value, 'result: ',template, 'parentType: ',parentType);
//		$log.info('devController->getTemplate parent value?', $scope.$parent.value);

		return template;
	}

	$scope.getParentType = function(){return parentType;};

	$scope.countObjectProperties = function(object){
		return Object.keys(object).length;
	}



/*	$scope.editorEnabled = false;


	$scope.enableEditor = function() {
		$log.info('devController->enableEditor?');
		$scope.editorEnabled = true;

	}*/


	$scope.value = value;
}

var globalEditorEnabled = false

function NodeEditController($scope, $log){
	$scope.editorEnabled = globalEditorEnabled;


	$scope.enableEditor = function() {
		$log.info('devController->enableEditor with scope: ', $scope);

		$scope.key = $scope.$parent.key;
		$scope.value = $scope.$parent.value;

		$scope.editorEnabled = true;

	};

	$scope.disableEditor = function() {
		$scope.editorEnabled = false;
	};

	$scope.save = function() {
		if ($scope.key === "") {
			return false;
		}

		$scope.$parent.key = $scope.key;
		$scope.$parent.value = $scope.value;

		$scope.disableEditor();
	}

	$scope.add = function(nodeValue){
		globalEditorEnabled = true;
		if(angular.isArray(nodeValue))
			nodeValue.push(null);
		else
			nodeValue['newItem'+Object.keys(nodeValue).length+1] = null;
//		value.newNode = true;
		//$scope.enableEditor();
	}

	$scope.remove = function(nodeKey){
		$log.info('removing key: ', nodeKey);
		delete value[nodeKey];
//		value.newNode = true;
		//$scope.enableEditor();
	}
}