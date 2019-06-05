var password = localStorage.getItem('password');
var wsServers = localStorage.getItem('wsServers');
var uri = localStorage.getItem('uri');
var authorizationUser = localStorage.getItem('authorizationUser');
var displayName = localStorage.getItem('displayName');

console.log('uri', uri);
console.log('password', password);
console.log('wsServers', wsServers);
console.log('authorizationUser', authorizationUser);
console.log('displayName', displayName);

var options = {
    media: {
      local: {
        video: document.getElementById('localVideo'),
        // audio: document.getElementById('localVideo')
      },
      remote: {
        video: false, // document.getElementById('remoteVideo'),
        // This is necessary to do an audio/video call as opposed to just a video call
        audio: document.getElementById('remoteVideo')
      }
    },
    ua: {
        uri: uri,
        wsServers: [wsServers],
        password: password,
        authorizationUser: authorizationUser,
        displayName: displayName,
    }
  };

console.log('options', options);

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