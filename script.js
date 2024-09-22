const apiKey = '2c7f83219dmsh45353fa5c20e10ep10a305jsn0b4b9bf52737';
const apiUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';

const audio = document.getElementById('audio');
const titleElement = document.getElementById('title');
const artistElement = document.getElementById('artist');
const coverElement = document.getElementById('cover');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentSongIndex = 0;
let songList = []; // This will be populated by the API

// Fetch music data from Deezer API
async function fetchMusic() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        });
        const data = await response.json();
        songList = data.data; // Access the song list from Deezer's response
        loadSong(currentSongIndex); // Load the first song after fetching
    } catch (error) {
        console.error('Error fetching music:', error);
    }
}

// Load and play the selected song
function loadSong(index) {
    const song = songList[index];
    titleElement.textContent = song.title;
    artistElement.textContent = song.artist.name;
    coverElement.src = song.album.cover_medium;
    audio.src = song.preview; // Deezer API provides 30-second previews
    currentSongIndex = index;
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
});

// Previous song button functionality
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songList.length) % songList.length;
    loadSong(currentSongIndex);
});

// Next song button functionality
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songList.length;
    loadSong(currentSongIndex);
});

// Fetch music from API when the page loads
fetchMusic();
