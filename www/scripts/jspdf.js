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
    return doc.output("blob");
  }
};

// bind eventChannel instance to window (for global usage)
window.saveAsPdf = new SaveAsPdf();
