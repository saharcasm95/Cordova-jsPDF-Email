angular.module('starter')
  .factory('ImagesFactory', function($q ,$cordovaCamera, $cordovaFile, $cordovaEmailComposer,$cordovaSocialSharing) {

    if (window.cordova) {

    }

    return {
      takePhoto:takePhoto,
      writeFile: writeFile,
      createFile:createFile,
      emailPdf: emailPdf
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

      $cordovaFile.createFile(cordova.file.externalRootDirectory, namePDF,  true)
        .then(function (success) {
          // success
        }, function (error) {
          // error
          console.log("error");
        });
    }
    function emailPdf(nameString) {
      var namePDF=cordova.file.externalRootDirectory+nameString+".pdf";
      console.log("here",namePDF)

      msg = "here's you attachments";
      subject = "Attachments";
      to = 'sahar.pyaari@gmail.com';
      cc =  'nooresahar95@gmail.com';
      bcc =  ['k122140@nu.edu.pk'];

      if (window.cordova ) {
        console.log("maillllllllllllling");
        $cordovaSocialSharing
          .shareViaEmail(msg, subject,to, cc,bcc
            ,namePDF)
          .then(function (result) {

          }, function (err) {
            alert(err);
            console.log(err);
          });
      } else {
        console.warn('Unsupported platform');
      }

        //
        // $cordovaSocialSharing
        //   .shareViaEmail("sadas", "asdads"
        //     ,"sadss@assdd.com")
        //   .then(function (result) {
        //
        //   }, function (err) {
        //     alert(err);
        //     console.log("socail sharing::",err);
        //   });
      // } else {
      //   console.warn('Unsupported platform');
      // }

      // $cordovaEmailComposer.open(email).then(null, function (response) {
      //   console.log("here i am");
      //   // user cancelled email
      // });

    }



  });
