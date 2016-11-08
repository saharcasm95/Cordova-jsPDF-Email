angular.module('starter')
  .factory('ImagesFactory', function($q ,$cordovaCamera) {

    if (window.cordova) {
      var optionsCamera = {
        quality: 70,
        // destinationType: Camera.DestinationType.DATA_URL,
        // sourceType: Camera.PictureSourceType.CAMERA,
        targetWidth: 800,
        targetHeight: 800,
        saveToPhotoAlbum: true,
        correctOrientation: true
      }
    }

    return {
      takePhoto:takePhoto,
      test: test
    };

    function takePhoto() {
      var defer = $q.defer();
      if (window.cordova) {
        $cordovaCamera.getPicture(optionsCamera).then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.reject(err);
        });
      }
      else {
        console.log("Error");
        defer.reject();
      }
      return defer.promise;
    }

function test() {

  cordova.plugins.image2pdf.convert("img/test.jpg", "test.pdf",
    function () { console.log("Done") },
    function (code) { console.log("Error code " + code) })

}


  });
