(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

          var currentAlbum = Fixtures.getAlbum();
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
           * @function
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });

              SongPlayer.currentSong = song;
           };
// added lines

           /**
           * @function playSong
           * @desc Plays the currentBuzzObject and sets the property of the song Object to true
           * @param {Object} song
           */
           var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
}
// adding check8asign
           var stopSong = function(song){
             currentBuzzObject.stop();
             song.playing = null;
             }

           var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
           };

          /**
          * @function SongPlayer.play
          * @desc Public method that takes a song object parameter. If the buzz object Song is not the same as the current
          * then a new song will load and play. If the buzz object Song is the same, and if it is paused, then the song will play.
          * @param {Object} song
          */

// end of added lines
          SongPlayer.currentSong = null;

          /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
          SongPlayer.currentTime = null;
          SongPlayer.volume = 60;


          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
     if (SongPlayer.currentSong !== song) {
         setSong(song);
         playSong(song);
     } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
             playSong(song);
         }
          }
     };
     /**
     * @function SongPlayer.pause
     * @desc Public method. Takes a song object parameter. Pauses the currently playing Buzz Object
     * and sets the song's 'playing' attribute to false.
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {
       song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
 };
     SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;
       if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
       }
 };
// adding nextsong
     SongPlayer.next = function () {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;
       if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
         } else {
           var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
      }
    };

    /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 };

        SongPlayer.setVolume = function (volume) {
          if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
          }
          SongPlayer.volume = volume;
        };

// end of previous/next function

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
