(function() {
     function AlbumCtrl(Fixtures) {
       this.albumData = Fixtures.getAlbum();
      console.log($scope)
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();
