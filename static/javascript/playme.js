

let btns = document.getElementsByName("btns");
let mediasource = document.getElementsByName('mediasource');
let mainPlay = document.getElementById('mainPlay');
let myProgressBar = document.getElementById('myProgressBar');
let starttime = document.getElementById('timestart')
let timeend = document.getElementById('timeend');
let imgsrc = document.getElementsByName("imgsrc")
let titlesrc = document.getElementsByName("titlesrc")
let artistsrc = document.getElementsByName("artistsrc")

let playimgid = document.getElementById("playimgid");
let titleid = document.getElementById("titleid");
let artistid = document.getElementById("artistid");

// fetching song list 
let songlist = []
let songIndex = 0;
for (let item = 0; item < btns.length; item++) {
    newfilepath = mediasource[item].getAttribute('src');
    songlist[item] = newfilepath;
}
let audioElement = new Audio(songlist[songIndex]);
console.log(audioElement)

console.log('songlist------>', songlist)
// fetching img list 
let imagelist = []
let imageIndex = 0;
for (let img = 0; img < btns.length; img++) {
    filepath = imgsrc[img].getAttribute('src');
    imagelist[img] = filepath;
}

// fetching title list 
let titlelist = []
let titleIndex = 0;
for (let t = 0; t < btns.length; t++) {
    tname = titlesrc[t].innerText;
    titlelist[t] = tname;
}
console.log('titlelist------>', titlelist)
// fetching artist list 
let artistlist = []
let artistIndex = 0;
for (let t = 0; t < btns.length; t++) {
    aname = artistsrc[t].innerText;
    artistlist[t] = aname;
}





// setting up time 

function minuteToMMSS(minute) {
    var m = String(Math.trunc(minute)).padStart(2, '0');
    var s = String(Math.abs(Math.round((minute - m) * 60))).padStart(2, '0');
    return m + ':' + s;
}




// button listen funtion
function ButtonListenFunc() {

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", () => {
            // newfilepath = mediasource[i].getAttribute('src');
            if (audioElement.played || audioElement.paused) {
                audioElement.pause();
                songIndex = i;
                audioElement.src = songlist[songIndex];
                audioElement.play();
                mainPlay.classList.remove('fa-play');
                mainPlay.classList.add('fa-pause');
                playimgid.src = imagelist[i];
                titleid.innerText = titlelist[i];
                artistid.innerText = artistlist[i];

            }

        });
    }
}

$(document).ready(ButtonListenFunc());





// MainPlay
mainPlay.addEventListener('click', () => {

    timeend.innerHTML = minuteToMMSS(audioElement.duration / 60);
    if (audioElement.paused || audioElement.currentTime <= 0) {
        console.log("audioelement in mainPlay: ", audioElement)
        console.log('btns:', btns);

        audioElement.play();

        mainPlay.classList.remove('fa-play');
        mainPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        mainPlay.classList.remove('fa-pause');
        mainPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})



// for next button 
let next = document.getElementById('next');
next.addEventListener('click', () => {
    if (RP == true) {
        songIndex = RandomIndex();
    }

    if (songIndex >= songlist.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.pause();
    // audioElement.remove();
    // audioElement = new Audio(songlist[songIndex])
    audioElement.src = songlist[songIndex];
    audioElement.play();
    timeend.innerHTML = minuteToMMSS(audioElement.duration / 60);
    mainPlay.classList.add('fa-pause-circle');
    mainPlay.classList.remove('fa-play-circle');
    playimgid.src = imagelist[songIndex];
    titleid.innerText = titlelist[songIndex];



})




// for prev button 
let previous = document.getElementById('previous');
previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }

    audioElement.pause();

    audioElement.src = songlist[songIndex];
    audioElement.play();
    playimgid.src = imagelist[songIndex];
    titleid.innerText = titlelist[songIndex];



})







// Progress Bar 

audioElement.addEventListener('timeupdate', () => {
    // Updating progessbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    starttime.innerHTML = minuteToMMSS(audioElement.currentTime / 60);
    timeend.innerHTML = minuteToMMSS(audioElement.duration / 60);
    if (audioElement.currentTime >= audioElement.duration) {
        next.click();
    }

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})





//Random Play Funtion

let RP = false;

function RandomIndex() {
    songIndex = Math.floor(Math.random() * songlist.length);
    return songIndex;
}


let randomPlay = document.getElementById("randomPlay");
randomPlay.addEventListener('click', () => {

    if (randomPlay.style.color == 'blue') {
        randomPlay.style = "color:#999";
        RP = true;
    }
    else {
        randomPlay.style = "color:blue";
    }
})







