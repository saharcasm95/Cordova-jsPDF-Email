// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



angular.module('starter', ['ionic', 'ngCordova'])

  .run(function($ionicPlatform) {



    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('MainController', function ($scope, $timeout, ImagesFactory, $cordovaPrinter) {
    $scope.imageUrls=[];
    $scope.imageLength=0;

    var date=Date.now();
    console.log(date);


    $scope.takePhoto=function () {
      document.addEventListener("deviceready", function () {
        ImagesFactory.createFile(date);
      }, false);


      document.addEventListener("deviceready", function () {
        ImagesFactory.takePhoto().then(function (response) {
          $scope.imageUrls.push(response);
          $scope.imageLength=$scope.imageUrls.length;
        });
      }, false);

    };

    $scope.saveImage=function () {
      $timeout(function() {
        var pdfOutput=saveAsPdf.addImage($scope.imageUrls);
        document.addEventListener("deviceready", function () {
          ImagesFactory.writeFile(pdfOutput, date);
        }, false);
        $scope.imageLength=0;
        $scope.imageUrls=[];
        date=Date.now();
      });
    };
  });

