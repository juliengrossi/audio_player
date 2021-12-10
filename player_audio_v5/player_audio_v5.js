let song = new Audio();
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


// 10s rewind control displayed on screen.
rewindControl.addEventListener("click", (e) => {
  song.currentTime -= 10;
});


// 10s forward control displayed on screen.
forwardControl.addEventListener("click", (e) => {
  song.currentTime += 10;
});


// first button on the control bar, stop current track and reset duration.
loadButton.addEventListener("click", (e) => {
  song.pause();
  song.currentTime = 0;
  songNumber = 0;
  playButton.classList.remove("full");
  selectDiv.classList.add("show");
});


// second button on the control bar, manage buttons state when stopping a track.
stopButton.addEventListener("click", (e) => {
  song.pause();
  song.currentTime = 0;
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.remove("full");
});


// third button on the control bar, play or pause depending on current track state.
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


// forth button on the control bar, rewind 1 track or go to the last track of the playlist if current track is 1st.
rwButton.addEventListener("click", (e) => {
  if (shuffle) {
    songNumber=shuffleSong(songNumber, songs);   
  } else if (songNumber <= 0) {
    songNumber = songs.length - 1;
  } else {
    songNumber--;
  }
  playSong();
});


// fifth button on the control bar, forward 1 track or go to the playlist start if current track is last.
fwButton.addEventListener("click", (e) => {
  if (shuffle) {    
    songNumber=shuffleSong(songNumber, songs);
  } else if (songNumber < songs.length - 1) {
    songNumber++;
  } else {
    songNumber = 0;
  }
  playSong();
});


// sixth button on the control bar, first click enable shuffling when changing tracks, second click enable repeat on current track, third click disable both.
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


// seventh button on the control bar, increase sound if not maxed.
volDownButton.addEventListener("click", (e) => {
  if (vol > 0 && !muted) {
    vol -= 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});


//eighth button on the control bar, decrease sound if not at minimal level.
volUpButton.addEventListener("click", (e) => {
  if (vol < 9 && !muted) {
    vol += 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});


//ninth button on the control bar, mute track or restore sound if muted.
muteButton.addEventListener("click", (e) => {
  muteSong();
});


//listener that manage things when a track is playing.
song.addEventListener("timeupdate", (e) => {
  displayUpdate();
  autoPlay();
});


// play the current track and clear pause blincking if necessary.
function playSong() {
  song.src = songs[songNumber].path;
  song.play();
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.add("full");
}


// return minute:second informations based on seconds imput.
function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}


// make the pause button flash while pausing.
function pauseFlash() {
  playButton.classList.toggle("full");
}


// mute sound or restore previous sound level if muted.
function muteSong() {
  if (song.volume >= 0.1) {
    let vol2 = 0;
    // vol2 = 0;
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


// return a random index number from a selected array, index number can't be the same it was before.
function shuffleSong(index, array) {
  let random = Math.floor(Math.random() * array.length);
  while (index == random) {
    random = Math.floor(Math.random() * array.length);
  }
  index = random;  
  return index;
}


// initiate fetching of the selected json and hide the selection div.
function load(id) {
  init(id);
  selectDiv.classList.remove("show");
}


//update every displayed informations.
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
}


//manage whatever player should do when a song end.
function autoPlay() {
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


//fetch the selected json to an array and play track 0.
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
