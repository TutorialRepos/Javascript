const  video = document.querySelector('.player__video')

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const volume = document.querySelector('.volume')
const speed = document.querySelector('.speed')
const progressContainer = document.querySelector('.progress')
const progress = document.querySelector('.progress__filled')
const skipBack = document.querySelector('.skip-back')
const skipFor = document.querySelector('.skip-for')

play.addEventListener('click', playPause);
video.addEventListener('click', playPause);

volume.addEventListener('change', changeVolume);
speed.addEventListener('change', changeSpeed);

skipBack.addEventListener('click', skipVideo)
skipFor.addEventListener('click', skipVideo)

video.addEventListener('timeupdate', progressBar)

progressContainer.addEventListener('click', test)
progressContainer.addEventListener('mousemove', (e) => mousedown && test(e))
progressContainer.addEventListener('mousedown', ()=> mousedown = true)
progressContainer.addEventListener('mouseup', ()=> mousedown = false)

let mousedown = false;
function test(e){
  const change = (e.offsetX / progressContainer.offsetWidth) * video.duration;
  console.log(change)
  video.currentTime = change;
}

function progressBar(){
  let progressRate = (video.currentTime/video.duration) * 100;
  progress.style.flexBasis = `${progressRate}%`;
}

function changeSpeed(){
  video.playbackRate = this.value;
}

function changeVolume(){
  video.volume = this.value;
}

function playVideo(){
  play.innerHTML = "❚❚"
  video.play()
}

function pauseVideo(){
  play.innerHTML = "►"
  video.pause()
}

function playPause(){
  (video.paused) ? playVideo():pauseVideo();
}

function skipVideo(){
  video.currentTime += parseFloat(this.dataset.skip);
}