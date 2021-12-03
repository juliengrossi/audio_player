var song = new Audio();
let stopButton = document.querySelector("#stopButton");
let playButton = document.querySelector("#playButton");
let rwButton = document.querySelector("#rwButton");
let fwButton = document.querySelector("#fwButton");
let volDownButton = document.querySelector("#volDownButton");
let volUpButton = document.querySelector("#volUpButton");
let muteButton = document.querySelector("#muteButton");
let pauseInt;
let muted = false;
let vol = 6;
let songNumber = 0;

song.type = "audio/mpeg";

let songs = [
  {
    name: "Aerobix",
    path: "music/Pomo - Aerobix.mp3",
    artist: "Pomo",
    cover: "images/cover 1.png",
  },
  {
    name: "Cloud Cruise",
    path: "music/Pomo - Cloud Cruise.mp3",
    artist: "Pomo",
    cover: "images/cover 2.png",
  },
  {
    name: "Start Again",
    path: "music/Pomo - Start Again ft. Andrea Cormier.mp3",
    artist: "Pomo ft. Andrea Cormier",
    cover: "images/cover 3.png",
  },
  {
    name: "Vibrator",
    path: "music/Pomo - Vibrator.mp3",
    artist: "Pomo",
    cover: "images/cover 4.png",
  },
];

// songs = [
//   "music/Pomo - Aerobix.mp3",
//   "music/Pomo - Cloud Cruise.mp3",
//   "music/Pomo - Start Again ft. Andrea Cormier.mp3",
//   "music/Pomo - Vibrator.mp3",
// ];

song.src = songs[songNumber].path;
song.volume = vol / 10;
document.getElementById("volume").textContent = vol;
document.getElementById("track").textContent =
  songNumber + 1 + "/" + songs.length;
  
stopButton.addEventListener("mousedown", (e) => {
  song.pause();
  song.currentTime = 0;
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.remove("full");
});

playButton.addEventListener("mousedown", (e) => {
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

rwButton.addEventListener("mousedown", (e) => {
  if (songNumber > 0) {
    songNumber--;
    song.src = songs[songNumber].path;
    playSong();
  }
});

fwButton.addEventListener("mousedown", (e) => {
  if (songNumber < songs.length - 1) {
    songNumber++;
    song.src = songs[songNumber].path;
    playSong();
  }
});

volDownButton.addEventListener("mousedown", (e) => {
  if (vol > 0 && !muted) {
    vol -= 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});

volUpButton.addEventListener("mousedown", (e) => {
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
  second = parseInt(song.currentTime, 10);
  document.getElementById("remTime").textContent = formatTime(second);
  if (song.duration <= song.currentTime) {
    songNumber++;
    song.src = songs[songNumber].path;
    playSong();
  }
});

function playSong() {
  song.play();
  clearInterval(pauseInt);
  playButton.classList.add("play");
  playButton.classList.remove("pause");
  playButton.classList.add("full");
  document.getElementById("songName").textContent =
    songs[songNumber].name.toUpperCase() +
    " BY:" +
    songs[songNumber].artist.toUpperCase();
  document.getElementById("track").textContent =
    songNumber + 1 + "/" + songs.length;
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

function pressButton(button) {
  tempButton = button.id;
  document.getElementById(tempButton).classList.toggle("press");
}

function unpressButton(button) {
  tempButton = button.id;
  document.getElementById(tempButton).classList.remove("press");
}
