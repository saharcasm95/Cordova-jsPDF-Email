A simple ionic starter app that uses the jsPDF library to save multiple images in a pdf captured by the camera for Android!

### Description ###

User can take the pictures & save them as a pdf using the jsPDf library. The issue of the pdf not being saved in the device is carefully handled by the cordova-plugin-file which takes the raw pdf output from the jsPdf library & creates the actual pdf in the sdcard directory of the device. <br/>

Furthermore, this code also demonstrates the use of cordova-plugin-x-socialsharing which opens gmail to send the pdf as an attachment.



### Cordova Plugins used: ###
#### (ngCordova Support -  http://ngcordova.com/docs/plugins/) ####

   cordova-plugin-camera <br/>
   cordova-plugin-x-socialsharing <br/>
   cordova-plugin-file <br/>

### Libraries used: ###
   
   jsPDF - https://github.com/MrRio/jsPDF


### Getting Started: ###

Step 1: bower install

Step 2: ionic serve
