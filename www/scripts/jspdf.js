/*
 * Name: eventChannel.js
 * Purpose: Library to handle custom events, this will be bind to window.eventChannel
 * Example Usage:
 * --------------
 * Call through -> window.eventChannel OR eventChannel
 * --------------
 * Register Event
 * eventChannel.on('eventName', callbackFunction );
 * --------------
 * Fire Event
 * eventChannel.fire('eventName');
 * --------------
 * Unregister All Callback of a Particular Event
 * eventChannel.off('eventName');
 * */


// class details
function SaveAsPdf(){

}

// prototype functions
SaveAsPdf.prototype = {
  constructor: SaveAsPdf,

  getBase64: function(image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL("image/jpeg");
  },


  addImage:function(imageUrls){

    var doc=new jsPDF();
    for(var i in imageUrls){
      var base64="data:image/jpeg;base64,"+imageUrls[i];
      // console.log(base64);
      doc.addImage(base64, 'JPEG', 0, 0);
      doc.addPage();
    }

    var pdfOutput=doc.output("blob");

    console.log(pdfOutput);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    function fail() {
      console.log('weird!!!!!!')
    }
    function gotFS(fileSystem) {
      fileSystem.root.getFile("test.pdf", {create: true, exclusive: false}, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
      fileEntry.createWriter(gotFileWriter, fail);
    }
    function gotFileWriter(writer) {
      console.log("here i am");
      writer.write(pdfOutput);
    }


  }
};

// bind eventChannel instance to window (for global usage)
window.saveAsPdf = new SaveAsPdf();
