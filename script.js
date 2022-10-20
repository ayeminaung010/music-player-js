const playListContainer = document.querySelector('.playListContainer');
const audioTag = document.querySelector('audio');
const currentProgressBar= document.querySelector('.currentProgressBar');

const tracks = [
    {
        trackId: "./music/music1.mp3" , title: "Kygo - Happy Now ft Sandro Cavazza "
    },
    {
        trackId: "./music/music2.mp3" , title: "Limahl - Never Ending Story "
    },
    {
        trackId: "./music/music3.mp3" , title: "Numb Little Bug - Em Beihold _Xooos cover_"
    },
    {
        trackId: "./music/music4.mp3" , title: "Thar Gyi Doh Aye Say "
    },
    {
        trackId: "./music/music5.mp3" , title: "Br lo nay tay lal"
    }
]

//create playlists and play
for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement('div');
    trackTag.addEventListener('click',function(){
        const trackSrc =  tracks[i].trackId;
        audioTag.src = trackSrc;
        audioTag.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
    })
    trackTag.classList.add('trackItem');
    const title = (i+1).toString()+". " + tracks[i].title ;
    trackTag.textContent += title ;
    playListContainer.append(trackTag);

}

let duration = 0;
let durationText;
// load audio tag data 
audioTag.addEventListener('loadeddata',() =>{
     duration = Math.floor(audioTag.duration );
    durationText = createMinuteSeconds(duration);
    
})


// update prograss bar 
const updateCurrentProgress = (currentTime) =>{
    const currentProgressWidth =  (500/duration) * currentTime;
    currentProgressBar.style.width = currentProgressWidth.toString() + 'px';
  
}

// time text update 
audioTag.addEventListener('timeupdate',function () {
    const currentAndtotalTime = document.querySelector('.currentAndtotalTime');
    const currentTime = audioTag.currentTime;
     const currentTimeText = createMinuteSeconds(currentTime);
     currentAndtotalTime.textContent = currentTimeText + '/' + durationText;
     updateCurrentProgress(currentTime);
})

// create minuteText and secondsText 
const createMinuteSeconds = (total) =>{
    const minutes = Math.floor(total/60);
    const seconds = Math.floor(total%60);

    const minuteText = minutes < 10 ? '0'+ minutes.toString() : minutes;
    const secondsText = seconds < 10 ? '0'+ seconds.toString() : seconds;
    return minuteText + ':' + secondsText;
}

const backBtn = document.querySelector('.backBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const playBtn = document.querySelector('.playBtn');
const nextBtn = document.querySelector('.nextBtn');

let currentPlayId = 0;
// play btn 
playBtn.addEventListener('click',function(){
    const currentTime = audioTag.currentTime;
    if(currentTime === 0){
        trackPlay();
        this.style.display = 'none';
        pauseBtn.style.display = 'block';
    }else{
        audioTag.play();
        this.style.display = 'none';
        pauseBtn.style.display = 'block';
    }
    
})

// pause btn 
pauseBtn.addEventListener('click',function(){
    audioTag.pause();
    this.style.display = 'none';
    playBtn.style.display = 'block';
})

// next btn 
nextBtn.addEventListener('click',function(){
    if(currentPlayId === tracks.length-1){
        return;
    }else{
        currentPlayId += 1;
        trackPlay();
    }
})
// back btn 
backBtn.addEventListener('click',function(){
    if(currentPlayId === 0){
        return;
    }
    currentPlayId -= 1;
    trackPlay();
})

const trackPlay = () =>{
    const trackSrc =  tracks[currentPlayId].trackId;
    audioTag.src = trackSrc;
    audioTag.play();
}