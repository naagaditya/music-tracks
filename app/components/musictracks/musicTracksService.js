(function() {
	'use strict';
	var musicTracksService = angular.module('musicTracks.Service', []);

	musicTracksService.factory('musicTracksService', function($http){
		return {
			getAllTracks: function () {
		    	return $http.get('http://104.197.128.152:8000/v1/tracks');
		    },

		    getTracksByTitle: function (title) {
		    	return $http.get('http://104.197.128.152:8000/v1/tracks?title=' + title);
		    },

		    getTrackById: function (id) {
		    	return $http.get('http://104.197.128.152:8000/v1/tracks/' + id);
		    },

		    editTrack: function (id, track) {
		    	return $http.patch(
		    		'http://104.197.128.152:8000/v1/tracks/' + id,
		    		track
		    	);
		    },

		    addTrack: function (track) {
		    	return $http.post(
		    		'http://104.197.128.152:8000/v1/tracks',
		    		track
		    	);
		    }

		}
	});

})();