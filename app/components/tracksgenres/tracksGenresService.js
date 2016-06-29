(function() {
	'use strict';
	var tracksGenresService = angular.module('tracksGenres.Service', []);

	tracksGenresService.factory('tracksGenresService', function($http){
		return {
			getAllGenres: function (pageNumber) {
		    	return $http.get('http://104.197.128.152:8000/v1/genres?page='+ pageNumber);
		    },

		    getGenreById: function (id) {
		    	return $http.get('http://104.197.128.152:8000/v1/genres/' + id);
		    },

		    editGenre: function (id, genre) {
		    	return $http.patch(
		    		'http://104.197.128.152:8000/v1/genres/' + id,
		    		genre
		    	);
		    },

		    addGenre: function (genre) {
		    	return $http.post(
		    		'http://104.197.128.152:8000/v1/genres',
		    		genre
		    	);
		    }
		};
	});

})();