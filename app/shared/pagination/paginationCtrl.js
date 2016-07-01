(function () {
	var paginationModule = angular.module('pagination.Controller',['TrackGenres.Model', 'MusicTracks.Model']);
	paginationModule.controller('paginationController', function (
			$rootScope,
			$scope,
			TrackGenresModel,
			MusicTracksModel
		) {
		var tracksGenresPageNumber = 1,
			nearToFirstPageNumber = 1,
			nearToLastPageNumber = 3,
			turnPages = 2,
			offset = 20;
		$scope.currentPage = 1;
		$scope.displayPages = [1,2,3,4,5];
		$scope.setCurrentPage = function (pageNumber) {
			turnPages = 2;
			$scope.currentPage = pageNumber;
			switch ($rootScope.currentTab) {
				case 'tracksGenres':
					$scope.tracksGenres = TrackGenresModel().getCurrentInstance();
					$scope.tracksGenres.getAllTrackGenres(pageNumber);
					$scope.lastPage = Math.ceil($scope.tracksGenres.count / offset);
					break;
				case 'musicTracks':
					$scope.musicTracks = MusicTracksModel().getCurrentInstance();
					$scope.musicTracks.getAllMusicTracks(pageNumber);
					$scope.lastPage = Math.ceil($scope.musicTracks.count / offset);
					break;
			}
			
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