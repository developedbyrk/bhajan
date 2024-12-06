// Toggle Player Visibility
// const togglePlayerBtn = document.getElementById("togglePlayerBtn");
const playerContainer = document.getElementById("player-container");

// togglePlayerBtn.addEventListener("click", () => {
//   playerContainer.classList.toggle("hidden");
//   togglePlayerBtn.textContent = playerContainer.classList.contains("hidden")
//     ? "Show Player"
//     : "Hide Player";
// });

// Playlist Tracks
const playlist = [
  {
    title: "Racha Hai Srishti Ko Jis Prabhu Ne",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Jis%20Srishti%20ko%20Prabhu%20Ne%20Banaya%20Hai.mp3",
  },
  {
    title: "Ram Nam Ke Hire Moti",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Ram%20Nam%20Ke%20Hire%20Moti.mp3",
  },
  {
    title: "Mujhe Tumne Malik Bahut Diya Hai",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Mujhe%20Tumne%20Malik%20Bahut%20De%20Diya%20hai.mp3",
  },
  {
    title: "Karpur Gauram Karunavtaram",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Karpur%20Gauram%20Karunavtaram.mp3",
  },
  {
    title: "Bhole Girijapati Hu Tamhari Sharan",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Bhole%20Girijapati%20hu%20Tamhari%20Sharan.mp3",
  },
  {
    title: "Hey Shiv Pita Parmatma",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Hey%20Shiv%20Pita%20Parmatma.mp3",
  },
  {
    title: "Ram Rachit Shambu Stuti",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Ram%20Rachit%20Shambu%20Stuti.mp3",
  },
  {
    title: "Satyam Shivam Sundaram",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Satyam%20Shivam%20Sundaram.mp3",
  },
  {
    title: "Shri Hanuman Chalisa",
    url: "https://raw.githubusercontent.com/developedbyrk/bhajan/main/Shri%20Hanuman%20Chalisa.mp3",
  },
];

let currentIndex = 0;
let isPlaying = false;
let isRepeat = false;

const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const repeatBtn = document.getElementById("repeatBtn");
const playlistBtn = document.getElementById("playlistBtn");
const playlistDialog = document.getElementById("playlistDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const playlistElement = document.getElementById("playlist");
const progressBar = document.getElementById("progressBar");
const currentSongTitle = document.getElementById("currentSongTitle");

// Update Current Song Title
function updateCurrentSongTitle() {
    currentSongTitle.textContent = `Track ${currentIndex + 1} - ${playlist[currentIndex].title}`;
}

// Play or Pause Audio
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        playAudio();
    }
});

audioPlayer.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Pause icon
});

audioPlayer.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Play icon
});

// Play Next Audio
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    playAudio();
});

// Play Previous Audio
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playAudio();
});

// Repeat Toggle
repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.querySelector("i").style.color = isRepeat ? "#740e1e" : "#fff"; // Change color for active/inactive
});

audioPlayer.addEventListener("ended", () => {
    if (isRepeat) {
        playAudio();
    } else {
        nextBtn.click();
    }
});

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    }
});

// Seek Audio Position
progressBar.addEventListener("input", () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});

// Play Audio
function playAudio() {
    // Only change the source if it's not the same as the current one
    if (audioPlayer.src !== playlist[currentIndex].url) {
        audioPlayer.src = playlist[currentIndex].url;
        audioPlayer.load();  // Load the new audio source
    }
    audioPlayer.play(); // Resume or play from current position
    updateCurrentSongTitle();
}

// Initialize Playlist
playlist.forEach((track, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Track ${index + 1} - ${track.title}`;
    listItem.addEventListener("click", () => {
        currentIndex = index;
        playAudio();
    });
    playlistElement.appendChild(listItem);
});

// Show Playlist Dialog
playlistBtn.addEventListener("click", () => {
    playlistDialog.classList.remove("hidden");
});

// Close Playlist Dialog
closeDialogBtn.addEventListener("click", () => {
    playlistDialog.classList.add("hidden");
});

// Initialize the Player
function initializePlayer() {
    audioPlayer.src = playlist[currentIndex].url; // Set the first track
    updateCurrentSongTitle(); // Update the displayed title
}

initializePlayer();
