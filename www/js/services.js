angular.module('starter')
  .factory('ImagesFactory', function($q ,$cordovaCamera, $cordovaFile) {

    if (window.cordova) {

    }

    return {
      takePhoto:takePhoto,
      test: test,
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

    function test() {

      cordova.plugins.image2pdf.convert("img/test.jpg", "test.pdf",
        function () { console.log("Done") },
        function (code) { console.log("Error code " + code) })

    }

    function writeFile(pdfOutput) {
      $cordovaFile.writeFile(cordova.file.externalRootDirectory, "test.pdf", pdfOutput, true)
        .then(function (success) {
          console.log("write success");
          // success
        }, function (error) {
          console.log("error");

          // error
        });
    }

    function createFile() {
      console.log(cordova.file.externalRootDirectory);
      $cordovaFile.createFile(cordova.file.externalRootDirectory, "test.pdf",  true)
        .then(function (success) {
          // success
        }, function (error) {
          // error
          console.log("error");
        });
    }



  });
