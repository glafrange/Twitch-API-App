const url = 'https://wind-bow.glitch.me/twitch-api/';

function getStreamData(url, streamName) {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + '/channels/' + streamName);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

async function displayData() {
  const streamData = JSON.parse(await getStreamData(url, 'esl_csgo'));
  console.log(streamData.status !== false);
  console.log(streamData.status);
}

displayData();