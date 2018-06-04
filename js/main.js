const url = 'https://wind-bow.glitch.me/twitch-api/';

const streams = {
  'eslCS' : { 'name' : "esl_csgo" },
  'eslSC' : { 'name' : "esl_sc2" },
  'FCC' : { 'name' : "freecodecamp" },
  'testChannel' : { 'name' : 'test_channel' }
};
const streamKeys = Object.keys(streams);



function getStreamData(url, type, streamName) {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + type + streamName);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

async function storeStreamData() {
  for(let i=0; i<streamKeys.length; i++) {
    const stream = streams[streamKeys[i]];
    stream.response = JSON.parse(await getStreamData(url, "channels/", stream.name));
    stream.response.isOnline = JSON.parse(await getStreamData(url, "streams/", stream.name)).stream == null ? false : true;
  }
  displayStreamData();
}

function displayStreamData() {
  const streamsEl = document.querySelector('.streamList');
  for(let i=0; i < streamKeys.length; i++) {
    let stream = streams[streamKeys[i]];
    streamsEl.innerHTML += "<div class='bg border border-dark row " + (stream.response.isOnline ? 'bg-success' : 'bg-danger') + "' id='" + streamKeys[i] + "'><img src=" + stream.response.logo + ">" + "<h4>" + "<a href='https://twitch.tv/" + stream.name + "'/>" + stream.name + "</a>" + " : " + "</h4>" + "<p>" + stream.response.status + "</p></div>";
  }
}

function filterAll() {
  const streamEls = document.querySelectorAll('.streamList div');
  streamEls.forEach(streamEl => {
    if (streamEl.className.indexOf('hide') !== -1) {
      streamEl.className = streamEl.className.replace(' hide', "");
    }
  });
}

function filterOnline() {
  const streamEls = document.querySelectorAll('.streamList div');
  streamEls.forEach(streamEl => {
    if (streamEl.className.indexOf("bg-success") === -1) {
      if(streamEl.className.indexOf('hide') == -1) {
        streamEl.className += ' hide';
      }
    } else {
      streamEl.className = streamEl.className.replace(' hide', "");
    }
  });
}

function filterOffline() {
  const streamEls = document.querySelectorAll('.streamList div');
  streamEls.forEach(streamEl => {
    if (streamEl.className.indexOf("bg-danger") === -1) {
      if (streamEl.className.indexOf('hide') == -1) {
        streamEl.className += ' hide';
      }
    } else {
      streamEl.className = streamEl.className.replace(' hide', "");
    }
  });
}

storeStreamData();
