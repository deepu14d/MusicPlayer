const music = document.querySelector("audio");
const image = document.querySelector("img");
const play = document.getElementById('play');
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById('prev');
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current-time");
const progress_div = document.getElementById("progress-div");

const songs = [{
    name: "song-1",
    title: "I'm dangerous",
    artist: "The EverLove"
},
{
    name: "song-2",
    title: "Scars",
    artist: "Neffex"
},
{
    name: "song-3",
    title: "Tune jo na kaha",
    artist: "Mohit Chauhan"
}]

let isPlaying = false; 

// for Pause
const playMusic = () => {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    image.classList.add("animation");
}

// for Playing again
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    image.classList.remove("animation");
}

play.addEventListener('click', function() {
    if(isPlaying){
        pauseMusic();
    } else {
        playMusic();
    }
})

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    image.src = "images/" + songs.name + ".jpg";
}

// loadSong(songs[2]);
songIndex = 2;

music.addEventListener("timeupdate", (e) => {
    //update progress bar
    const currentTime = e.target.currentTime; 
    const duration = e.target.duration; 
    let progressWidth = (currentTime / duration) * 100;
    progress.style.width = `${progressWidth}%`;

    //update music duration
    let minu_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration % 60);
    if (sec_duration < 10) { //if sec is less than 10 then add 0 before it
            sec_duration = `0${sec_duration}`;
        }
    let totl_duration = `0${minu_duration}: ${sec_duration}`;
    if(duration) {
    total_duration.textContent = `${totl_duration}`;
    }

    // current duration update
    let minu_currentTime = Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) { //if sec is less than 10 then add 0 before it
            sec_currentTime = `0${sec_currentTime}`;
        }
    let totl_currentTime = `0${minu_currentTime}: ${sec_currentTime}`;
    current_time.textContent = `${totl_currentTime}`;
});

progress_div.addEventListener("click", (event) => {
    let progressWidth = progress_div.clientWidth; //getting width of progress bar
    let clickedOffsetX = event.offsetX; //getting offset x value
    let total_duration = music.duration; //getting song total duration

    music.currentTime = (clickedOffsetX / progressWidth) * total_duration;
    playMusic();
});

music.addEventListener('ended', function() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
})

next.addEventListener('click', function() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
})
prev.addEventListener('click', function() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
})

let volume_slider = document.querySelector('.volume_slider');
function setVolume(){
    music.volume = volume_slider.value / 100;
}