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
		$scope.musicTracks.getAllMusicTracks(1);
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
			var musicTrackGenres = [];
			musicTrack.genres.forEach(function (genre) {
				musicTrackGenres.push(genre.id);
			});
			musicTrack.genres = musicTrackGenres;
			if (musicTrack.id) {
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
		$scope.getValidRating = function (rating) {
			var unitDigit = rating % 10, validRating = rating;
			if (unitDigit > 0 && unitDigit < 5) {
				validRating = (Math.floor(rating/10)*10 + 5);
			} else if (unitDigit > 5 && unitDigit < 10) {
				validRating = (Math.floor(rating/10)*10 + 10);
			}
			return validRating;
		}
	});

})();