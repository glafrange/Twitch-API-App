const url = 'https://wind-bow.glitch.me/twitch-api/channels/';

const streams = {
  'eslCS' : { 'name' : "esl_csgo" },
  'eslSC' : { 'name' : "esl_sc2" },
  'FCC' : { 'name' : "freecodecamp" },
  'testChannel' : { 'name' : 'test_channel' }
};

const streamList = Object.keys(streams);

function getStreamData(url, streamName) {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + streamName);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

async function storeData() {
  for(let i=0; i<streamList.length; i++) {
    const stream = streams[streamList[i]];
    stream.response = JSON.parse(await getStreamData(url, stream.name));
    console.log(stream.response);
  }
  displayStreamData();
}

function displayStreamData() {
  const streamsEl = document.querySelector('.streamList');
  for(let i=0; i < streamList.length; i++) {
    let stream = streams[streamList[i]];
    streamsEl.innerHTML += "<div class='bg bg-success border border-dark row'><img src=" + stream.response.logo + ">" + "<p>" + "<a href='https://twitch.tv/" + stream.name + "'/>" + stream.name + "</a>" + " : " + stream.response.status + "</p></div>";
  }
}

storeData();
