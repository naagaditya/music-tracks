(function() {
	'use strict';
	var tracksGenres = angular.module('tracksGenres.Controller', []);
	tracksGenres.controller('tracksGenresController', function($rootScope, $scope){
		$rootScope.currentTab = 'tracksGenres';
	});

})();