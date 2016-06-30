(function () {
	'use strict';
	var trackGenres = angular.module('TrackGenres.Model', ['tracksGenres.Service']);
	trackGenres.factory('TrackGenresModel', function ($q, tracksGenresService) {
		var currentData = '';
		function TrackGenresModel () {
			this.trackGenresById = {};
			this.count = 0;
		}
		TrackGenresModel.prototype = (function () {
			function getAllTrackGenres (pageNumber) {
				var promise = tracksGenresService.getAllGenres(pageNumber),
					deferred = $q.defer(),
					self = this;
				promise.then(function (response) {
					self.count = response.data.count;
					self.trackGenresById = {};
					response.data.results.forEach(function (trackGenre) {
						self.trackGenresById[trackGenre.id] = trackGenre;	
					})
					deferred.resolve('success');
				}, function (error) {
					deferred.reject(error);
				});
				return deferred.promise
			}

			function addTrackGenre (newTrackGenre) {
				var promise = tracksGenresService.addGenre(newTrackGenre),
					deferred = $q.defer(),
					self = this;
				promise.then(function (response) {
					var trackGenre = response.data;
					self.trackGenresById[trackGenre.id] = trackGenre;	
					deferred.resolve('success');
				}, function (error) {
					deferred.reject(error);
				});
				return deferred.promise
			}
			
			function editTrackGenre (id, trackGenre) {
				var promise = tracksGenresService.editGenre(id, trackGenre),
					deferred = $q.defer(),
					self = this;
				promise.then(function (response) {
					var trackGenre = response.data;
					self.trackGenresById[trackGenre.id] = trackGenre;	
					deferred.resolve('success');
				}, function (error) {
					deferred.reject(error);
				});
				return deferred.promise
			}

			return {
				editTrackGenre: editTrackGenre,
				addTrackGenre: addTrackGenre,
				getAllTrackGenres: getAllTrackGenres
			};

		})();
		var manipulator = {
            getNewInstance: function () {
                var ci = new TrackGenresModel();
                currentData = ci;
                return ci;

            },
            getCurrentInstance: function () {
                return currentData;
            }
        };
        return function () {
            return manipulator;
        };
	});
})();