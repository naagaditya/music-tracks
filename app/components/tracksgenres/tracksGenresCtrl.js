(function() {
	'use strict';
	var tracksGenres = angular.module('tracksGenres.controller', []);
	tracksGenres.controller('tracksGenresController', function($rootScope, $scope){
		$rootScope.currentTab = 'tracksGenres';
	});

})();