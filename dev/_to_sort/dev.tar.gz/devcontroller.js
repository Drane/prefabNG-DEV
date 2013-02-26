'use strict';

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

	$scope.data = {
		id:"user",
		children:[
			{
				id:"subuser1",
				children:{id:"laatste", children:[]}
			},
			{
				id:"subuser2",
				children:{id:"laatste", children:[]}
			},
			{
				id:"newuser",
				children:[
					{
						id:"subuser1",
						children:{id:"laatste", children:[]}
					},
					{
						id:"subuser2",
						children:{id:"laatste", children:[]}
					}
				]
			}
		]
	};
}