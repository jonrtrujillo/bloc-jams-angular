(function() {
     function AlbumCtrl($scope) {
       $scope.albumData = albumPicasso;
      console.log($scope)
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
