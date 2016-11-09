angular.module('starter')
  .factory('ImagesFactory', function($q ,$cordovaCamera, $cordovaFile) {

    if (window.cordova) {

    }

    return {
      takePhoto:takePhoto,
      writeFile: writeFile,
      createFile:createFile
    };

    function takePhoto() {

      var defer = $q.defer();
      if (window.cordova) {
        var optionsCamera = {
          quality: 70,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          targetWidth: 800,
          targetHeight: 800,
          saveToPhotoAlbum: true,
          correctOrientation: true
        };

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

    function writeFile(pdfOutput, nameString) {
      var namePDF=nameString+".pdf";
      $cordovaFile.writeFile(cordova.file.externalRootDirectory, namePDF, pdfOutput, true)
        .then(function (success) {
          console.log("write success");
          // success
        }, function (error) {
          console.log("error");

          // error
        });
    }

    function createFile(nameString) {
      var namePDF=nameString+".pdf";
      console.log(cordova.file.externalRootDirectory);
      $cordovaFile.createFile(cordova.file.externalRootDirectory, namePDF,  true)
        .then(function (success) {
          // success
        }, function (error) {
          // error
          console.log("error");
        });
    }



  });
