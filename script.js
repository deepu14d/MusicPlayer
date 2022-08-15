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

// function loadTrack(songIndex){
//     clearInterval(updateTimer);
//     reset();

//     music.src = songs[songIndex].music;
//     music.load();

//     track_art.style.backgroundImage = "url(" + songs[songIndex].img + ")";
//     track_name.textContent = songs[songIndex].name;
//     track_artist.textContent = songs[songIndex].artist;
//     now_playing.textContent = "Playing music " + (songIndex + 1) + " of " + songs.length;

//     updateTimer = setInterval(setUpdate, 1000);

//     music.addEventListener('ended', nextTrack);
//     random_bg_color();
// }

// function random_bg_color(){
//     let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
//     let a;

//     function populate(a){
//         for(let i=0; i<6; i++){
//             let x = Math.round(Math.random() * 14);
//             let y = hex[x];
//             a += y;
//         }
//         return a;
//     }
//     let Color1 = populate('#');
//     let Color2 = populate('#');
//     var angle = 'to right';

//     let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
//     document.body.style.background = gradient;
// }