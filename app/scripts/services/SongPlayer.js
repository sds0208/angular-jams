(function() {
    function SongPlayer($rootScope, Fixtures) {

    /**
    * @desc SongPlayer Service; makes properties and methods public to the rest of the application
    * @type {Object}
    */
        var SongPlayer = {};
    /**
    *@desc Store current album info
    *@type {Object}
    */
        var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
        var currentBuzzObject = null;

    /**
    * @function stopSong
    * @desc Stop the current Buzz object; set the playing propert of the song object to null
    * @param {Object} song
    */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
              }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function()  {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };
    /**
    * @function playSong
    * @desc Play the current Buzz object; set the playing propert of the song object to true
    * @param {Object} song
    */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

    /**
    * @function getSongIndex
    * @desc Get the index of a song
    * @param {Object} song
    */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.getSongIndex = function(song)  {
            return currentAlbum.songs.indexOf(song);
        };
    /**
    * @desc Currently selected song
    * @type {Object}
    */
        SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
        SongPlayer.currentTime = null;

    /**
    * @desc Playback volume.  Default is 80;
    * @type {Number}
    */

        SongPlayer.volume = 80;
    /**
    * @function SongPlayer.play
    * @desc Check the play or pause status of a song that is selected to be played; set the currently playing song to the one selected; play the song
    * @param {Object} song
    */



        SongPlayer.play = function(song)  {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                  setSong(song);
                  playSong(song);
                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Pause the current buzz object; set the song playing status to false
        * @param {Object} song
        */
            SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
            };
          /**
          * @function SongPlayer.previous
          * @desc Move to the previous song on the album
          */

            SongPlayer.previous = function()  {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex--;

                if (currentSongIndex < 0) {
                    stopSong(song);
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };

        /**
        * @function SongPlayer.next
        * @desc Move to the next song on the album
        */

              SongPlayer.next = function()  {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex++;

                if (currentSongIndex > currentAlbum.songs.length-1) {
                    stopSong(song);
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };

        /**
        * @function SongPlayer.setCurrentTime
        * @desc Set the time of the currently playing song
        * @param {Number} time
        */
            SongPlayer.setCurrentTime = function(time)  {
                if (currentBuzzObject)  {
                    currentBuzzObject.setTime(time);
                }
            };

        /**
        * @function SongPlayer.setVolume
        * @desc Set the volume of the currently playing song
        * @param {Number} volume
        */

            SongPlayer.setVolume = function(volume) {
                if (currentBuzzObject)  {
                  currentBuzzObject.setVolume(volume);
                }
            };


            return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
