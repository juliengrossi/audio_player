var song = new Audio();
let stopButton = document.querySelector("#stopButton");
let playButton = document.querySelector("#playButton");
let pauseButton = document.querySelector("#pauseButton");
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
songs = [
  "./music/Pomo - Aerobix.mp3",
  "./music/Pomo - Cloud Cruise.mp3",
  "./music/Pomo - Start Again ft. Andrea Cormier.mp3",
  "./music/Pomo - Vibrator.mp3",
];

song.src = songs[songNumber];
song.volume = vol / 10;
document.getElementById("volume").textContent = vol;

stopButton.addEventListener("mousedown", (e) => {
  song.pause();
  song.currentTime = 0;
  clearInterval(pauseInt);
  pauseButton.classList.remove("full");
  playButton.classList.remove("full");
});

playButton.addEventListener("mousedown", (e) => {
  playSong();
});

pauseButton.addEventListener("mousedown", (e) => {
  if (!song.paused) {
    playButton.classList.remove("full");
    song.pause();
    pauseInt = setInterval(() => {
      pauseFlash();
    }, 500);
  }
});

rwButton.addEventListener("mousedown", (e) => {
  if (songNumber > 0) {
    songNumber--;
    song.src = songs[songNumber];
    playSong();
  }
});

fwButton.addEventListener("mousedown", (e) => {
  if (songNumber < songs.length - 1) {
    songNumber++;
    song.src = songs[songNumber];
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

addButton.addEventListener("click", (e) => {
  if (document.getElementById("newSongPath").value) {
    for (let i = 0; i < songs.length; i++) {
      if (document.getElementById("newSongPath").value == songs[i]) {
        console.log("huhu");
        document.getElementById("newSongPath").value = "";
        document.getElementById("newSongPath").placeholder =
          "Path can't be added twice";
      } else {        
        songs.push(document.getElementById("newSongPath").value);
        document.getElementById("newSongPath").value = "";
        document.getElementById("newSongPath").placeholder = "Path added";
      }
    }
  } else {
    document.getElementById("newSongPath").placeholder = "Invalid path";
  }
});

removeButton.addEventListener("click", (e) => {
  for (let i = 0; i < songs.length; i++) {
    if (document.getElementById("newSongPath").value == songs[i]) {
      songs.splice(i, 1);
      document.getElementById("newSongPath").value = "";
      document.getElementById("newSongPath").placeholder = "Path removed";
    } else {
      document.getElementById("newSongPath").placeholder = "Invalid path";
    }
  }
});

wipeButton.addEventListener("click", (e) => {
  songs = [
    "./music/Pomo - Aerobix.mp3",
    "./music/Pomo - Cloud Cruise.mp3",
    "./music/Pomo - Start Again ft. Andrea Cormier.mp3",
    "./music/Pomo - Vibrator.mp3",
  ];
  document.getElementById("newSongPath").value = "";
  document.getElementById("newSongPath").placeholder = "playlist wiped";
});

song.addEventListener("timeupdate", (e) => {
  second = parseInt(song.currentTime, 10);
  document.getElementById("remTime").textContent = formatTime(second);
  if (song.duration <= song.currentTime) {
    songNumber++;
    song.src = songs[songNumber];
    playSong();
  }
});

function playSong() {
  song.play();
  clearInterval(pauseInt);
  playButton.classList.add("full");
  pauseButton.classList.remove("full");
  document.getElementById("songName").textContent =
    "PATH: " +
    songs[songNumber].toUpperCase() +
    " TRACK:" +
    (songNumber + 1) +
    "/" +
    songs.length;
}

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function pauseFlash() {
  pauseButton.classList.toggle("full");
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
