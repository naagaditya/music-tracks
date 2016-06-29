(function() {
	'use strict';
	var musicTracks = angular.module('musicTracks.Controller', [
		'MusicTracks.Model',
		'TrackGenres.Model'
	]);
	musicTracks.controller('musicTracksController', function(
			$rootScope,
			$scope,
			MusicTracksModel,
			TrackGenresModel
		){
		var tracksGenresPageNumber = 1, tracksGenresOffset = 20;
		$rootScope.currentTab = 'musicTracks';
		$scope.musicTracks = MusicTracksModel().getNewInstance();
		$scope.musicTracks.getAllMusicTracks();
		$scope.tracksGenres = TrackGenresModel().getNewInstance();
		$scope.tracksGenres.getAllTrackGenres(tracksGenresPageNumber);
		$scope.addEditMusicTrack = function (musicTrack) {
			$scope.currentMusicTrack = {};
			angular.copy(musicTrack, $scope.currentMusicTrack)
		}
		$scope.saveMusicTrack = function (musicTrack) {
			if (musicTrack && musicTrack.id) {
				$scope.musicTracks.editMusicTrack(musicTrack.id, musicTrack);
			} else {
				$scope.musicTracks.addMusicTrack(musicTrack);
			}
		}
		$scope.getNextTracksGenres = function () {
			tracksGenresPageNumber++;
			$scope.tracksGenres.getAllTrackGenres(tracksGenresPageNumber);
			$scope.allTracksGenresLoaded = 
				(tracksGenresPageNumber * tracksGenresOffset) >= $scope.tracksGenres.count;
		}
	});

})();