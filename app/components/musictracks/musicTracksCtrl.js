(function() {
	'use strict';
	var musicTracks = angular.module('musicTracks.Controller', ['MusicTracks.Model']);
	musicTracks.controller('musicTracksController', function($rootScope, $scope, MusicTracksModel){
		$rootScope.currentTab = 'musicTracks';
		$scope.musicTracks = MusicTracksModel().getNewInstance();
		$scope.musicTracks.getAllMusicTracks();
		$scope.addEditMusicTrack = function (musicTrack) {
			$scope.currentMusicTrack = musicTrack || {};
		}
		$scope.saveMusicTrack = function (musicTrack) {
			if (musicTrack && musicTrack.id) {
				$scope.musicTracks.editMusicTrack(musicTrack.id, musicTrack);
			} else {
				$scope.musicTracks.addMusicTrack(musicTrack);
			}
		}
	});

})();