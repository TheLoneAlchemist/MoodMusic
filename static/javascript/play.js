
let filepath =document.getElementById('mediasource').getAttribute('src')
// console.log("file: ", filepath);

document.getElementById("playimgid").src = document.getElementById("imgsrc").src;


let audioElement = new Audio(filepath);
let mainPlay = document.getElementById('mainPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');


function minuteToMMSS(minute) {
    var m = String(Math.trunc(minute)).padStart(2, '0');
    var s = String(Math.abs(Math.round((minute - m) * 60))).padStart(2, '0');
    return m + ':' + s;
}



mainPlay.addEventListener('click', ()=>{
    document.getElementById('timeend').innerHTML =minuteToMMSS(audioElement.duration/60)

    if(audioElement.paused || audioElement.currentTime<=0){
        console.log("audioelement in mainPlay: ",audioElement)
        audioElement.play();
        
        mainPlay.classList.remove('fa-play');
        mainPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        mainPlay.classList.remove('fa-pause');
        mainPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})



audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
    document.getElementById('timestart').innerHTML = minuteToMMSS(audioElement.currentTime/60)

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
    
})




// let next = document.getElementById('next');
// next.addEventListener('click', () => {
//     console.log(songlist)
//     audioElement.pause();
//     audioElement.pause();
//     audioElement = new Audio(songlist[i+1])
//     mainPlay.click();

// })

// let prev = document.getElementById('previous');
// next.addEventListener('click', () => {
//     console.log("clicked")
// })


