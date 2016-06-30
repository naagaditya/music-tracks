(function() {
	'use strict';
	var tracksGenres = angular.module('tracksGenres.Controller', ['TrackGenres.Model']);
	tracksGenres.controller('tracksGenresController', function(
			$rootScope,
			$scope,
			TrackGenresModel
		){
		var tracksGenresPageNumber = 1,
			tracksGenresOffset = 20,
			pageDiff;
		$scope.displayPages = [1,2,3,4,5];
		$scope.currentPage = 1;
		$rootScope.currentTab = 'tracksGenres';
		$scope.tracksGenres = TrackGenresModel().getNewInstance();
		$scope.tracksGenres.getAllTrackGenres(tracksGenresPageNumber)
			.then(function () {
				$scope.lastPage = Math.ceil($scope.tracksGenres.count / tracksGenresOffset);
			});
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
		$scope.setCurrentPage = function (pageNumber) {
			var nearToFirstPageNumber = 1, nearToLastPageNumber = 3, turnPages = 2;
			$scope.currentPage = pageNumber;
			$scope.tracksGenres.getAllTrackGenres(pageNumber);
			if ($scope.currentPage >= $scope.displayPages[nearToLastPageNumber]) {
				// if after turning page book ends then change turnpage
				if (($scope.displayPages[$scope.displayPages.length - 1] + turnPages) >
					$scope.lastPage) {
					turnPages = $scope.lastPage - $scope.displayPages[$scope.displayPages.length - 1];
				};
				for (var i = $scope.displayPages.length - 1; i >= 0; i--) {
					$scope.displayPages[i] += turnPages;
				};
			}
			else if ($scope.currentPage <= $scope.displayPages[nearToFirstPageNumber] &&
					$scope.displayPages[turnPages - 1] > turnPages) {
				for (var i = $scope.displayPages.length - 1; i >= 0; i--) {
					$scope.displayPages[i] -= turnPages;
				};
			}
		}
	});

})();
