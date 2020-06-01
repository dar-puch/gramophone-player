import regeneratorRuntime from "regenerator-runtime";
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

const fetchRecords = async () => {
  try {
    const response = await fetch("./data.json");
    const json = await response.json();
    return json.records;
  } catch (e) {
    console.log("fetch failed", e.message);
  }
};

let playlistArr = [];
let nowPlaying = {};

const createRecordListWithData = async () => {
  const records = await fetchRecords();
  createRecordList(records);
};

const createRecordList = (records) => {
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
          playAudio();
          displayPlaylist();
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
    <div class="blue">${elem.title}</div>
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
        });
        playAudio();
        displayPlaylist();
      });
  });
};

////end createRecordList

const displayPlaylist = () => {
  playlist.innerHTML = "";
  playlistArr.map((item) => {
    const newLi = document.createElement("li");
    newLi.innerText = item.title;
    if (item.id === nowPlaying.id) {
      newLi.classList.add("blue");
    }
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
  pauseTurntable();
  if (playlistArr.length) {
    playAudio();
  }
  displayPlaylist();
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
  createRecordListWithData();
};

initSetup();
