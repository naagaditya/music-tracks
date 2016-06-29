(function () {
    var musicTracksModel = angular.module('MusicTracks.Model',['musicTracks.Service']);
    musicTracksModel.factory('MusicTracksModel', function (musicTracksService, $q) {
        var currentData = '';
        function MusicTracksModel () {
            this.musicTracksById = {};
        }
        MusicTracksModel.prototype = (function() {
        	function getAllMusicTracks () {
        		var promise = musicTracksService.getAllTracks(),
        			deferred = $q.defer(),
        			self = this;
    			promise.then(function (response) {
                    response.data.forEach(function (musicTrack) {
                        self.musicTracksById[musicTrack.id] = musicTrack;
                    });
    				deferred.resolve('success');
    			}, function (error) {
    				deferred.reject(error);
    			});
    			return deferred.promise;
        	}

            function editMusicTrack (id, track) {
                var promise = musicTracksService.editTrack(id, track),
                    deferred = $q.defer(),
                    self = this;
                promise.then(function (response) {
                    var musicTrack = response.data;
                    self.musicTracksById[musicTrack.id] = musicTrack;
                    deferred.resolve('success');
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }

            function addMusicTrack (track) {
                var promise = musicTracksService.addTrack(track),
                    deferred = $q.defer(),
                    self = this;
                promise.then(function (response) {
                    var musicTrack = response.data;
                    self.musicTracksById[musicTrack.id] = musicTrack;
                    deferred.resolve('success');
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }

        	return {
        		getAllMusicTracks: getAllMusicTracks,
                editMusicTrack: editMusicTrack,
                addMusicTrack: addMusicTrack
        	};
        })();
        var manipulator = {
                getNewInstance: function () {
                    var ci = new MusicTracksModel();
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