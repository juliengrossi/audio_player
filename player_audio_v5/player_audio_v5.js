var song = new Audio();
let selectDiv = document.querySelector("#playlistSelection");
let loadButton = document.querySelector("#loadButton");
let stopButton = document.querySelector("#stopButton");
let playButton = document.querySelector("#playButton");
let rwButton = document.querySelector("#rwButton");
let fwButton = document.querySelector("#fwButton");
let shuffleButton = document.querySelector("#shuffleButton");
let volDownButton = document.querySelector("#volDownButton");
let volUpButton = document.querySelector("#volUpButton");
let muteButton = document.querySelector("#muteButton");
let forwardControl = document.querySelector("#forwardControl");
let rewindControl = document.querySelector("#rewindControl");
let shuffle = false;
let repeat = false;
let pauseInt;
let muted = false;
let vol = 6;
let songNumber = 0;
song.type = "audio/mpeg";
let songs = [];
let playlists = [
  {
    id: 0,
    path: "pomo.json",
    artist: "Pomo",
  },
  {
    id: 1,
    path: "knife.json",
    artist: "Knife party",
  },
  {
    id: 2,
    path: "ben.json",
    artist: "benson music",
  },
];

rewindControl.addEventListener("click", (e) => {
  song.currentTime -= 10;
});

forwardControl.addEventListener("click", (e) => {
  song.currentTime += 10;
});

loadButton.addEventListener("click", (e) => {
  song.pause();
  song.currentTime = 0;
  songNumber = 0;
  playButton.classList.remove("full");
  selectDiv.classList.add("show");
});

stopButton.addEventListener("click", (e) => {
  song.pause();
  song.currentTime = 0;
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.remove("full");
});

playButton.addEventListener("click", (e) => {
  if (!song.paused) {
    playButton.classList.remove("full");
    playButton.classList.remove("play");
    playButton.classList.add("pause");
    song.pause();
    pauseInt = setInterval(() => {
      pauseFlash();
    }, 500);
  } else {
    playSong();
  }
});

rwButton.addEventListener("click", (e) => {
  if (shuffle) {
    shuffleSong();
  } else if (songNumber <= 0) {
    songNumber = songs.length - 1;
  } else {
    songNumber--;
  }
  playSong();
});

fwButton.addEventListener("click", (e) => {
  if (shuffle) {
    shuffleSong();
  } else if (songNumber < songs.length - 1) {
    songNumber++;
  } else {
    songNumber = 0;
  }
  playSong();
});

shuffleButton.addEventListener("click", (e) => {
  if (shuffle == false && repeat == false) {
    shuffleButton.classList.add("full");
    shuffle = true;
  } else if (shuffle) {
    shuffleButton.classList.remove("shuffle");
    shuffleButton.classList.add("repeat");
    shuffle = false;
    repeat = true;
  } else if (repeat) {
    shuffleButton.classList.add("shuffle");
    shuffleButton.classList.remove("repeat");
    shuffleButton.classList.remove("full");
    repeat = false;
  }
});

volDownButton.addEventListener("click", (e) => {
  if (vol > 0 && !muted) {
    vol -= 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});

volUpButton.addEventListener("click", (e) => {
  if (vol < 9 && !muted) {
    vol += 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});

muteButton.addEventListener("click", (e) => {
  muteSong();
});

song.addEventListener("timeupdate", (e) => {
  displayUpdate();
});

function playSong() {
  song.src = songs[songNumber].path;
  song.play();
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.add("full");
}

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function pauseFlash() {
  playButton.classList.toggle("full");
}

function muteSong() {
  if (song.volume >= 0.1) {
    let vol2 = 0;
    vol2 = 0;
    song.volume = vol2 / 10;
    document.getElementById("volume").textContent = "M";
    muteButton.classList.toggle("full");
    muted = true;
  } else {
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
    muteButton.classList.remove("full");
    muted = false;
  }
}

function shuffleSong() {
  let random = Math.floor(Math.random() * songs.length);
  while (songNumber == random) {
    random = Math.floor(Math.random() * songs.length);
  }
  songNumber = random;
}

function load(id) {
  init(id);
  selectDiv.classList.remove("show");
}

function displayUpdate() {
  let total = formatTime(parseInt(song.duration, 10));
  let elapsed = formatTime(parseInt(song.currentTime, 10));
  if (isNaN(elapsed.slice(3)) || isNaN(total.slice(3))) {
    document.getElementById("totalTime").textContent = "--:--";
    document.getElementById("remTime").textContent = "--:--";
  } else {
    document.getElementById("totalTime").textContent = total;
    document.getElementById("remTime").textContent = elapsed;
  }
  document.getElementById("songName").textContent =
    songs[songNumber].name.toUpperCase() +
    " BY:" +
    songs[songNumber].artist.toUpperCase();
  document.getElementById("track").textContent =
    songNumber + 1 + "/" + songs.length;
  if (song.duration <= song.currentTime && repeat) {
    song.currentTime = 0;
    song.play();
  } else if (
    song.duration <= song.currentTime &&
    songNumber < songs.length - 1
  ) {
    songNumber++;
    playSong();
  } else if (
    song.duration <= song.currentTime &&
    songNumber == songs.length - 1
  ) {
    song.pause();
    song.currentTime = 0;
    songNumber = 0;
    playButton.classList.remove("full");
  }
}

async function init(index) {
  songs = await fetch(playlists[index].path).then((response) => {
    return response.json();
  });
  song.src = songs[songNumber].path;
  song.volume = vol / 10;
  document.getElementById("volume").textContent = vol;
  document.getElementById("track").textContent =
    songNumber + 1 + "/" + songs.length;
  playSong();
}
