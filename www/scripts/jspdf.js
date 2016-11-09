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

  addInPdf: function (base64Prefix) {
    return function (doc, imageUrls, extension, x, y) {
      for(var i in imageUrls){
        var base64=base64Prefix+imageUrls[i];
        doc.addImage(base64, extension, x, y);
        if (i==imageUrls.length-1) break;
        doc.addPage();
      }
    }
  },


  addImages: function(imageUrls){

    var doc=new jsPDF();
    var sendImagesToPdf=this.addInPdf("data:image/jpeg;base64,"); //closure
    sendImagesToPdf(doc, imageUrls, 'JPEG', 0, 0);
    return doc.output("blob");
  }
};

// bind eventChannel instance to window (for global usage)
window.saveAsPdf = new SaveAsPdf();
