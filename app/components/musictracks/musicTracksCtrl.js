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
		var tracksGenresPageNumber = 1,
			tracksGenresOffset = 20,
			tracksGenres = TrackGenresModel().getNewInstance();
		$scope.tracksGenres = {};
		$rootScope.currentTab = 'musicTracks';
		$scope.musicTracks = MusicTracksModel().getNewInstance();
		$scope.musicTracks.getAllMusicTracks();
		tracksGenres.getAllTrackGenres(tracksGenresPageNumber)
		.then(function () {
			$scope.tracksGenres = tracksGenres.trackGenresById;
		});
		$scope.addEditMusicTrack = function (musicTrack) {
			$scope.currentMusicTrack = {
				'title': '',
				'id': '',
				'genres': [],
				'rating': 0
			};
			if (musicTrack) {
				angular.copy(musicTrack, $scope.currentMusicTrack);
			}
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
			tracksGenres.getAllTrackGenres(tracksGenresPageNumber)
			.then(function () {
				angular.extend($scope.tracksGenres, tracksGenres.trackGenresById);
			});
			$scope.allTracksGenresLoaded = 
				(tracksGenresPageNumber * tracksGenresOffset) >= $scope.tracksGenres.count;
		}
	});

})();