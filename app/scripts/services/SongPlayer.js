(function() {
    function SongPlayer() {

    /**
    * @desc SongPlayer Service; makes properties and methods public to the rest of the application
    * @type {Object}
    */
        var SongPlayer = {};

    /**
    * @desc Currently selected song
    * @type {Object}
    */
        var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
        var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
              }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
    * @function SongPlayer.play
    * @desc Check the play or pause status of a song that is selected to be played; set the currently playing song to the one selected; play the song
    * @param {Object} song
    */
        SongPlayer.play = function(song)  {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);

              } else if (currentSong === song) {
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
                currentBuzzObject.pause();
                song.playing = false;
            };

            return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
