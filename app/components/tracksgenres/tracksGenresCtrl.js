(function() {
	'use strict';
	var tracksGenres = angular.module('tracksGenres.Controller', ['TrackGenres.Model']);
	tracksGenres.controller('tracksGenresController', function(
			$rootScope,
			$scope,
			TrackGenresModel
		){
		$rootScope.currentTab = 'tracksGenres';
		$scope.tracksGenres = TrackGenresModel().getNewInstance();
		$scope.tracksGenres.getAllTrackGenres(1);
		$scope.addEditTrackGenre = function (tracksGenres) {
			$scope.currentTrackGenre = {};
			angular.copy(tracksGenres, $scope.currentTrackGenre)
		}
		$scope.saveTrackGenre = function (tracksGenres) {
			if (tracksGenres && tracksGenres.id) {
				$scope.tracksGenres.editTrackGenre(tracksGenres.id, tracksGenres);
			} else {
				$scope.tracksGenres.addTrackGenre(tracksGenres);
			}
		}
	});

})();
