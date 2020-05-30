const records = [
  {
    id: "r3",
    artist: "BLUETRAIN aka STEVE O'SULLIVAN",
    title: "Sapphire Dubs Vol 1",
    image: "images/records/Bluetrain.jpg",
    tracks: [
      {
        trackId: "Bluetrain-01",
        trackTitle: "Midnight Creeper",
        audio: "audio/Bluetrain-01.mp3",
      },
      {
        trackId: "Bluetrain-02",
        trackTitle: "Where's Burt?",
        audio: "audio/Bluetrain-02.mp3",
      },
    ],
  },
  {
    id: "r1",
    artist: "APHEX TWIN",
    title: "Selected Ambient Works 85-92",
    image: "images/records/AphexTwin.jpg",
    tracks: [
      {
        trackId: "AphexTwin-01",
        trackTitle: "Ptolemy",
        audio: "audio/AphexTwin-01.mp3",
      },
      {
        trackId: "AphexTwin-02",
        trackTitle: "Heliosphan",
        audio: "audio/AphexTwin-02.mp3",
      },
      {
        trackId: "AphexTwin-03",
        trackTitle: "We Are The Music Makers",
        audio: "audio/AphexTwin-03.mp3",
      },
    ],
  },
  {
    id: "r2",
    artist: "Tony ALLEN / JEFF MILLS",
    title: "Tomorrow Comes The Harvest",
    image: "images/records/TonyAllen.jpg",
    tracks: [
      {
        trackId: "TonyAllen-01",
        trackTitle: "Locked & Loaded",
        audio: "audio/TonyAllen-01.mp3",
      },
      {
        trackId: "TonyAllen-02",
        trackTitle: "On The Run",
        audio: "audio/TonyAllen-02.mp3",
      },
    ],
  },
];
const audio = document.querySelector("#audio");
const record = document.querySelector(".record");
const arm = document.querySelector(".arm");
const playPause = document.querySelector(".play-pause");
const playPauseIcon = document.querySelector(".play-pause-icon");
const slider = document.querySelector(".slider");
const playlist = document.querySelector(".playlist");
const resetPitchButton = document.querySelector(".reset-pitch");
const playAll = document.querySelector(".playall");
const volume = document.querySelector(".volume");
const progressBar = document.querySelector(".progress-bar");

let playlistArr = [];
let nowPlaying = {};

const createRecordList = () => {
  records.map((elem) => {
    const tracks = elem.tracks;
    const generatedTracklist = document.createDocumentFragment();
    tracks.map((track, index) => {
      const trackLi = document.createElement("li");
      trackLi.innerHTML = `${track.trackTitle}<button class="play">&#9654;</button>`;
      generatedTracklist.appendChild(trackLi);
      generatedTracklist
        .querySelectorAll(".play")
        [index].addEventListener("click", () => {
          clearPlaylist();
          addToPlaylist(`${elem.image}`, `${track.audio}`, track.trackTitle);
          console.log("add to playlist called from play");
          displayPlaylist();
          playAudio();
        });
    });

    const generatedRecordItem = document.createElement("li");
    generatedRecordItem.classList.add("records-item");
    generatedRecordItem.classList.add(`${elem.id}`);
    generatedRecordItem.innerHTML = `<div class="cover">
    <img
      src=${elem.image}
      alt=${elem.title}
      class="cover-img"
    />
  </div>
  <div class="description">
    <div class="artist">${elem.artist}</div>
    <div class="title">${elem.title}</div>
    <ol class="tracklist">
    </ol>
    <button class="playall">
      Play All
    </button>
  </div>`;

    document.querySelector(".records-list").appendChild(generatedRecordItem);
    document
      .querySelector(`.${elem.id} .tracklist`)
      .appendChild(generatedTracklist);
    generatedRecordItem
      .querySelector(".playall")
      .addEventListener("click", () => {
        clearPlaylist();
        elem.tracks.map((record) => {
          addToPlaylist(
            elem.image,
            record.audio,
            record.trackTitle,
            record.trackId
          );
          console.log("add to playlist called from playall");
        });
        displayPlaylist();
        playAudio();
      });
  });
};

////end createRecordList

const displayPlaylist = () => {
  playlist.innerHTML = "";
  playlistArr.map((item) => {
    const newLi = document.createElement("li");
    newLi.innerText = item.title;
    playlist.appendChild(newLi);
  });
};
const addToPlaylist = (cover, track, title, id) => {
  playlistArr.push({ cover, track, title, id });
};
const clearPlaylist = () => {
  playlistArr.length = 0;
  playlist.innerHTML = "";
};
const isPlaying = () => {
  return (
    audio.currentTime > 0 &&
    !audio.paused &&
    !audio.ended &&
    audio.readyState > 2
  );
};

const handlePlayPause = () => {
  isPlaying() ? pauseAudio() : playAudio();
};

const playAudio = () => {
  if (playlistArr.length) {
    nowPlaying = { ...playlistArr[0] };
    record.src = nowPlaying.cover;
    audio.src = nowPlaying.track;
    record.classList.add("rotate");
    playPauseIcon.classList.add("playing");
    let isArmRotated = arm.classList.contains("move-arm");
    if (!isArmRotated) {
      arm.classList.add("move-arm");
      setTimeout(() => {
        audio.play();
      }, 1400);
    } else audio.play();
    arm.classList.add("move-arm");
  } else return;
};
const updateProgressBar = () => {
  progressBar.value = isPlaying() ? audio.currentTime / audio.duration : 0;
};
const pauseAudio = () => {
  pauseTurntable();
  audio.pause();
};

const pauseTurntable = () => {
  record.classList.remove("rotate");
  playPauseIcon.classList.remove("playing");
  arm.classList.remove("move-arm");
};

const adjustPitch = (event) => {
  let val = event.target.value;
  audio.playbackRate = (1 + val / 100).toFixed(1);
};

const resetPitch = () => {
  slider.value = 0;
  audio.playbackRate = 1;
};
const deleteFromPlaylistArr = (itemToDelete) => {
  playlistArr = playlistArr.filter((rec) => rec.id !== itemToDelete.id);
};

const seek = (event) => {
  let ratio = event.offsetX / event.srcElement.clientWidth;
  audio.currentTime = ratio * audio.duration;
  progressBar.value = ratio / 100;
};

const onRecordEnd = () => {
  progressBar.value = 0;
  deleteFromPlaylistArr(nowPlaying);
  displayPlaylist();
  pauseTurntable();
  if (playlistArr.length) {
    playAudio();
  }
};

const initSetup = () => {
  progressBar.addEventListener("click", seek);
  playPause.addEventListener("click", handlePlayPause);
  slider.addEventListener("change", adjustPitch);
  slider.addEventListener("resetPitchEvent", adjustPitch);
  resetPitchButton.addEventListener("click", resetPitch);
  audio.addEventListener("ended", onRecordEnd);
  audio.addEventListener("timeupdate", updateProgressBar);
  resetPitch();
  createRecordList();
};

initSetup();
