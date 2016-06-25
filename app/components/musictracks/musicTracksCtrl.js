(function() {
	'use strict';
	var musicTracks = angular.module('musicTracks.controller', []);
	musicTracks.controller('musicTracksController', function($rootScope, $scope){
		$rootScope.currentTab = 'musicTracks';
	});

})();