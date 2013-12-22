var context;
window.onload = init;
var kickBuffer;

function init() {

  // Fix up prefixing
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  } catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  loadSound('sounds/kick.wav');
  var kicker = document.getElementById("kick-trigger");
  kicker.onclick = function() {playSound(kickBuffer);}
}


function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(
      request.response, 
      function(buffer) { kickBuffer = buffer; },
      onError
    )
  }

  request.send();
}

function onError() {
  alert('Something went wrong');
}

function playSound(buffer) {
  if (!buffer) return;
  console.log("yep");
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}