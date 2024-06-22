const { ipcRenderer } = require('electron');

let audioPlayer = document.getElementById('audio-player');
let currentTrackIndex = 0;
let tracks = [];

function handleFileSelect(event) {
    tracks = Array.from(event.target.files);
    if (tracks.length > 0) {
        playTrack(0);
    }
}

function playTrack(index) {
    if (tracks.length > 0) {
        const track = tracks[index];
        audioPlayer.src = URL.createObjectURL(track);
        audioPlayer.play();
        document.getElementById('track-name').textContent = track.name;
        currentTrackIndex = index;
        document.getElementById('play-pause-button').textContent = 'Pause';
    }
}

document.getElementById('music-selector').addEventListener('change', handleFileSelect);

document.getElementById('play-pause-button').addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById('play-pause-button').textContent = 'Pause';
    } else {
        audioPlayer.pause();
        document.getElementById('play-pause-button').textContent = 'Play';
    }
});

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
});

document.getElementById('shuffle-button').addEventListener('click', () => {
    if (tracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        playTrack(randomIndex);
    }
});

async function saveMusicList() {
    await ipcRenderer.invoke('save-music-list', tracks);
}

async function loadMusicList() {
    tracks = await ipcRenderer.invoke('load-music-list');
    if (tracks.length > 0) {
        playTrack(0);
    }
}

window.addEventListener('beforeunload', saveMusicList);
document.addEventListener('DOMContentLoaded', loadMusicList);
