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
let muted=false;
let vol = 5;
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
  stopButton.setAttribute("class", "button control stopButtonClick");
  playButton.setAttribute("class", "button control playButton");
  pauseButton.setAttribute("class", "button control pauseButton");
  song.pause();
  song.currentTime = 0;
  clearInterval(pauseInt);
});
stopButton.addEventListener("mouseup", (e) => {
  stopButton.setAttribute("class", "button control stopButton");
});

playButton.addEventListener("click", (e) => {
  playSong();
});

pauseButton.addEventListener("mousedown", (e) => {
  if (!song.paused) {
    song.pause();
    playButton.setAttribute("class", "button control playButton");
    pauseInt = setInterval(() => {
      pauseFlash();
    }, 500);
  }
});

rwButton.addEventListener("mousedown", (e) => {
  if (songNumber > 0) {
    rwButton.setAttribute("class", "button control rwButtonClick");
    songNumber--;
    song.src = songs[songNumber];
    playSong();
  }
});
rwButton.addEventListener("mouseup", (e) => {
  rwButton.setAttribute("class", "button control rwButton");
});

fwButton.addEventListener("mousedown", (e) => {
  if (songNumber < songs.length - 1) {
    fwButton.setAttribute("class", "button control fwButtonClick");
    songNumber++;
    song.src = songs[songNumber];
    playSong();
  }
});
fwButton.addEventListener("mouseup", (e) => {
  fwButton.setAttribute("class", "button control fwButton");
});

volDownButton.addEventListener("mousedown", (e) => {
  volDownButton.setAttribute("class", "button control volDownButtonClick");
  if (vol > 0&& !muted) {
    vol -= 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});
volDownButton.addEventListener("mouseup", (e) => {
  volDownButton.setAttribute("class", "button control volDownButton");
});

volUpButton.addEventListener("mousedown", (e) => {
  volUpButton.setAttribute("class", "button control volUpButtonClick");
  if (vol < 9&& !muted) {
    vol += 1;
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
  }
});
volUpButton.addEventListener("mouseup", (e) => {
  volUpButton.setAttribute("class", "button control volUpButton");
});

muteButton.addEventListener("click", (e) => {
  if (song.volume >= 0.1) {
    let vol2=0;
    vol2 = 0;
    song.volume = vol2 / 10;
    document.getElementById("volume").textContent = "M";
    muteButton.setAttribute("class", "button control muteButtonClick");
    muted=true;
  } else {    
    song.volume = vol / 10;
    document.getElementById("volume").textContent = vol;
    muteButton.setAttribute("class", "button control muteButton");
    muted=false;
  }
});

song.addEventListener("timeupdate", (e) => {
  second = parseInt(song.currentTime, 10);
  document.getElementById("remTime").textContent = formatTime(second);
});

function playSong() {
  playButton.setAttribute("class", "button control playButtonClick");
  pauseButton.setAttribute("class", "button control pauseButton");
  song.play();
  clearInterval(pauseInt);
  document.getElementById("songName").textContent =
  "PATH: "+songs[songNumber].toUpperCase()+" TRACK:"+(songNumber+1)+"/"+songs.length;
}

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function pauseFlash() {
  pauseButton.classList.toggle("pauseButtonClick");
}
