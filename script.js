var options = {
    media: {
      local: {
        video: document.getElementById('localVideo')
      },
      remote: {
        video: document.getElementById('remoteVideo'),
        // This is necessary to do an audio/video call as opposed to just a video call
        audio: document.getElementById('remoteVideo')
      }
    },
    ua: {}
  };

var simple = new SIP.Web.Simple(options);

var endButton = document.getElementById('endCall');
endButton.addEventListener("click", function () {
    simple.hangup();
    alert("Call Ended");
}, false);

simple.on('ringing', function() {
    simple.answer();
});

//makes the call
simple.call('welcome@onsip.com');