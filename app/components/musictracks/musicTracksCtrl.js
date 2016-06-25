(function() {
	'use strict';
	var musicTracks = angular.module('musicTracks.Controller', []);
	musicTracks.controller('musicTracksController', function($rootScope, $scope){
		$rootScope.currentTab = 'musicTracks';
	});

})();