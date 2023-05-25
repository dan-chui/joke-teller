var mykey = config.API_KEY;

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const bubble = document.getElementById('speech');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Render joke in speech bubble
function renderJoke(joke) {
  bubble.textContent = joke;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: mykey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;        
      } else {
        joke = data.joke;
      }

      // Display text
      renderJoke(joke);

      // Text-to-Speech      
      tellMe(joke);

      // Disable Button
      toggleButton();
    } catch(error) {
     // Catch errors here
     console.log('Oops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);

audioElement.addEventListener('ended', toggleButton);