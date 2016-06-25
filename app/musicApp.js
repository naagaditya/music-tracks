(function() {
	var app = angular.module('musicApp', ['ngRoute', 'musicTracks.Controller', 'tracksGenres.Controller']);

	app.config(function ($routeProvider) {
		$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/components/musictracks/musicTracks.html',
                controller  : 'musicTracksController'
            })
            // route for the music tracks
            .when('/tracks', {
                templateUrl : 'app/components/musictracks/musicTracks.html',
                controller  : 'musicTracksController'
            })
            // route for the track's genres
            .when('/genres', {
                templateUrl : 'app/components/tracksgenres/tracksGenres.html',
                controller  : 'tracksGenresController'
            })
	})
})();