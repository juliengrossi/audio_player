var song = new Audio();
let loadButton = document.querySelector("#loadButton");
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
let songs = [];
let playlists = [
  {
    id: 0,
    path: "pomo.json",
    artist: "Pomo",
  },
  {
    id: 1,
    path: "ben.json",
    artist: "benson music",
  },
];
let playlist = playlists[0];

async function init(playlist) {
  songs = await fetch(playlist.path).then((response) => {
    return response.json();
  });
  song.src = songs[songNumber].path;
  song.volume = vol / 10;
  document.getElementById("volume").textContent = vol;
  document.getElementById("track").textContent =
    songNumber + 1 + "/" + songs.length;
  
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
    if (songNumber <= 0) {
      songNumber = songs.length - 1;
    } else {
      songNumber--;
    }
    playSong();
  });

  fwButton.addEventListener("click", (e) => {
    if (songNumber < songs.length - 1) {
      songNumber++;
    } else {
      songNumber = 0;
    }
    playSong();
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

  function displayUpdate() {
    let total = formatTime(parseInt(song.duration, 10));
    let remain = formatTime(parseInt(song.duration - song.currentTime, 10));
    document.getElementById("remTime").textContent =
      "T:" + total + "\n" + "R:" + remain;
    document.getElementById("songName").textContent =
      songs[songNumber].name.toUpperCase() +
      " BY:" +
      songs[songNumber].artist.toUpperCase();
    document.getElementById("track").textContent =
      songNumber + 1 + "/" + songs.length;
    if (song.duration <= song.currentTime && songNumber < songs.length - 1) {
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
}

function pressButton(button) {
  tempButton = button.id;
  document.getElementById(tempButton).classList.toggle("press");
}

function unpressButton(button) {
  tempButton = button.id;
  document.getElementById(tempButton).classList.remove("press");
}

init(playlist);
// let index_playlist = 0;
// loadButton.addEventListener("click", (e) => {
//   init(index_playlist);
//   index_playlist++;
//   if (index_playlist == playlists.length) {
//     index_playlist = 0;
//   }
// });
