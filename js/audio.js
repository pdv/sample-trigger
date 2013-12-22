window.onload = init;
var context;
var bufferLoader;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    'sounds/kick.wav',
    finishedLoading
    );

  var kicker = document.getElementById("kick-trigger");
  kicker.onClick = bufferLoader.load();
}

function finishedLoading(buffer) {
  // Create two sources and play them both together.
  var source = context.createBufferSource();
  source1.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}




// BufferLoader class

function BufferLoader(context, url, callback) {
  this.context = context;
  this.url = url;
  this.onload = callback;
  this.buffer;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  
}

BufferLoader.prototype.load = function() {

  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", this.url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.buffer = buffer;
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();

  if(request.status == 0)
  	dump(req.responseText);
}
