const btnDescriptions = [
  { file: 'sound1.mp3', hue: 120 },
  { file: 'sound2.mp3', hue: 0 },
  { file: 'sound3.mp3', hue: 60 },
  { file: 'sound4.mp3', hue: 240 },
];

class Button {
  constructor(description, el) {
    this.el = el;
    this.hue = description.hue;
    this.sound = loadSound(description.file);
    this.paint(25);
  }

  paint(level) {
    const background = `hsl(${this.hue}, 100%, ${level}%)`;
    this.el.style.backgroundColor = background;
  }

  async press(volume = 1.0) {
    return new Promise(async (pressResolve) => {
      this.paint(50);
      await this.playSound(volume);
      this.paint(25);
      pressResolve();
    });
  }

  async playSound(volume) {
    return new Promise((playResolve) => {
      this.sound.volume = volume;
      this.sound.onended = playResolve;
      this.sound.play();
    });
  }
}

class Game {
  buttons;
  allowPlayer;
  sequence;
  playerPlaybackPos;
  mistakeSound;

  constructor() {
    this.buttons = new Map();
    this.allowPlayer = false;
    this.sequence = [];
    this.playerPlaybackPos = 0;
    this.mistakeSound = loadSound('error.mp3');

    document.querySelectorAll('.game-button').forEach((el, i) => {
      if (i < btnDescriptions.length) {
        this.buttons.set(el.id, new Button(btnDescriptions[i], el));
      }
    });

    const playerNameEl = document.querySelector('.player-name');
    playerNameEl.textContent = this.getPlayerName();
  }

  async pressButton(button) {
    if (this.allowPlayer) {
      this.allowPlayer = false;
      await this.buttons.get(button.id).press(1.0);

      if (this.sequence[this.playerPlaybackPos].el.id === button.id) {
        this.playerPlaybackPos++;
        if (this.playerPlaybackPos === this.sequence.length) {
          this.playerPlaybackPos = 0;
          this.addButton();
          this.updateScore(this.sequence.length - 1);
          await this.playSequence();
        }
        this.allowPlayer = true;
      } else {
        this.saveScore(this.sequence.length - 1);
        this.mistakeSound.play();
        await this.buttonDance(2);
      }
    }
  }

  async reset() {
    this.allowPlayer = false;
    this.playerPlaybackPos = 0;
    this.sequence = [];
    this.updateScore('--');
    await this.buttonDance(1);
    this.addButton();
    await this.playSequence();
    this.allowPlayer = true;
  }

  getPlayerName() {
    return localStorage.getItem('userName') ?? 'Mystery player';
  }

  async playSequence() {
    await delay(500);
    for (const btn of this.sequence) {
      await btn.press(1.0);
      await delay(100);
    }
  }

  addButton() {
    const btn = this.getRandomButton();
    this.sequence.push(btn);
  }

  updateScore(score) {
    const scoreEl = document.querySelector('#score');
    scoreEl.textContent = score;
  }

  async buttonDance(laps = 1) {
    for (let step = 0; step < laps; step++) {
      for (const btn of this.buttons.values()) {
        await btn.press(0.0);
      }
    }
  }

  getRandomButton() {
    let buttons = Array.from(this.buttons.values());
    return buttons[Math.floor(Math.random() * this.buttons.size)];
  }

  saveScore(score) {
    const userName = this.getPlayerName();
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = this.updateScores(userName, score, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  updateScores(userName, score, scores) {
    const date = new Date().toLocaleDateString();
    const newScore = { name: userName, score: score, date: date };

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
      if (score > prevScore.score) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    return scores;
  }
}

const game = new Game();

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

function loadSound(filename) {
  return new Audio('assets/' + filename);
}

// Simulate chat messages that will come over WebSocket
setInterval(() => {
  const score = Math.floor(Math.random() * 3000);
  const chatText = document.querySelector('#player-messages');
  chatText.innerHTML =
    `<div class="event"><span class="player-event">Eich</span> scored ${score}</div>` +
    chatText.innerHTML;
}, 5000);

// Adding and Removing User From Itinerary
document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('addUserButton');
  const removeButton = document.getElementById('removeUserButton');
  const list = document.getElementById('userList');

  function addUsernameToList() {
      const username = localStorage.getItem('userName');

      if(username) {
          const span = document.createElement('span');
          span.textContent = username;
          span.id = 'user-' + username; // Unique ID for the span

          if(list.hasChildNodes()) {
              list.appendChild(document.createTextNode(', '));
          }

          list.appendChild(span);
      } else {
          alert('Username not found in local storage.');
      }
  }

  function removeUsernameFromList() {
      const username = localStorage.getItem('userName');

      if(username) {
          const spanId = 'user-' + username;
          const span = document.getElementById(spanId);

          if(span) {
              // Remove the span and its preceding separator, if present
              const previousSibling = span.previousSibling;
              if(previousSibling && previousSibling.nodeType === Node.TEXT_NODE) {
                  list.removeChild(previousSibling);
              }

              list.removeChild(span);
          } else {
              alert('You have not joined this itinerary');
          }
      } else {
          alert('Username not found in local storage.');
      }
  }

  addButton.addEventListener('click', addUsernameToList);
  removeButton.addEventListener('click', removeUsernameFromList);
});

// Profile Modal 
document.addEventListener('DOMContentLoaded', (event) => {
  var pmodal = document.getElementById("pModal");
  var btn = document.getElementById("profile");
  var span = document.getElementsByClassName("pclose-button")[0];

  btn.onclick = function() {pmodal.style.display = "block";}
  span.onclick = function() {pmodal.style.display = "none";}
  window.onclick = function(event) {
      if (event.target == pmodal) {pmodal.style.display = "none";}}
  });

function pname1() {
  const userName = localStorage.getItem('userName');
  if (userName) {
    const userNameDisplays = document.querySelectorAll('.pname');
    userNameDisplays.forEach((element) => {
      element.textContent = userName;
    });
  } else {
    console.log('userName not found in localStorage.');
  }
}

// Call the function to display the userName when the page loads
document.addEventListener('DOMContentLoaded', pname1);

// Add To Itinerary Modal 
document.addEventListener('DOMContentLoaded', (event) => {
  var imodal = document.getElementById("iModal");
  var btn = document.getElementById("addToI");
  var span = document.getElementsByClassName("close-button")[0];

  btn.onclick = function() {imodal.style.display = "block";}
  span.onclick = function() {imodal.style.display = "none";}
  window.onclick = function(event) {
      if (event.target == imodal) {imodal.style.display = "none";}}
});

// Create New Itinerary Modal 
document.addEventListener('DOMContentLoaded', (event) => {
  var imodal = document.getElementById("niModal");
  var btn = document.getElementById("newI");
  var span = document.getElementsByClassName("nclose-button")[0];

  btn.onclick = function() {imodal.style.display = "block";}
  span.onclick = function() {imodal.style.display = "none";}
  window.onclick = function(event) {
      if (event.target == imodal) {imodal.style.display = "none";}}
});

// Currency Conversion Rate Websocket Simulator
function currConv(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function updateRandomNumber() {
  const curconSpan = document.getElementById('curcon');
  curconSpan.textContent = currConv(3.53, 3.74);
}

setInterval(updateRandomNumber, 1000); // Update every 1 second

async function loadItins() {
  let itins = [];
  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/itins');
    itins = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem('itins', JSON.stringify(itins));
  } catch {
    // If there was an error then just use the last saved scores
    const itinsText = localStorage.getItem('itins');
    if (itinsText) {
      itins = JSON.parse(itinsText);
    }
  }

  displayItins(itins);
}

function displayItins(itins) {
  const tableBodyEl = document.querySelector('#itin');

  if (itins.length) {
    // Update the DOM with the itins
    for (const [i, itin] of itins.entries()) {
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const travsTdEl = document.createElement('td');
      const countriesTdEl = document.createElement('td');

      positionTdEl.textContent = i + 1;
      nameTdEl.textContent = itin.name;
      travsTdEl.textContent = itin.travs;
      countriesTdEl.textContent = itin.countries;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(travsTdEl);
      rowEl.appendChild(countriesTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>No itineraries yet - start making one above!</td></tr>';
  }
}

loadItins();

function createI() {
  const iName = document.querySelector("#newItinerary");
  const iTravs = document.querySelector("#newItinerary");
  const iCouns = document.querySelector("#newItinerary");
  localStorage.setItem("newIName", iName.value);
  localStorage.setItem("newITravs", iTravs.value);
  localStorage.setItem("newICouns", iCouns.value);
  window.location.href = "itinerary.html";
}

async function saveItin(itin) {
  const iName = document.querySelector("#newItinerary");
  const iTravs = document.querySelector("#newItinerary");
  const iCouns = document.querySelector("#newItinerary");

  try {
    const response = await fetch('/api/itin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newItin),
    });

    // Store what the service gave us as the high scores
    const scores = await response.json();
    localStorage.setItem('scores', JSON.stringify(scores));
  } catch {
    // If there was an error then just track scores locally
    this.updateScoresLocal(newScore);
  }
}

function displayQuote(data) {
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      const containerEl = document.querySelector('#quote');

      const quoteEl = document.createElement('p');
      quoteEl.classList.add('quote');
      const authorEl = document.createElement('p');
      authorEl.classList.add('author');

      quoteEl.textContent = data.content;
      authorEl.textContent = data.author;

      containerEl.appendChild(quoteEl);
      containerEl.appendChild(authorEl);
    });
}

displayQuote();
