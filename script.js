const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");

const songs = [
  { name: "song1", title: "Monica", artist: "Sublahshini, Anirudh Ravichander - Coolie(2025) " },
  { name: "song2", title: "Why This Kolaveri Di", artist: "Dhanush - 3 (2012) " },
  { name: "song3", title: "Poyiraa Mama", artist: "Dhanush - Kubera(2024) " },
  { name: "song4", title: " Neeve", artist: "G.V. Prakash Kumar -Darling(2010)  " },
  { name: "song5", title: "Singarala", artist: "Dalapathi(1991)" },
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `songs/${song.name}.mp3`;
}

loadSong(songs[songIndex]);

function playSong() {
  audio.play();
  playBtn.innerText = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) playSong();
  else pauseSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
