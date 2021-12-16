const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

const tickingSound = new Audio('sounds/Clock-ticking.mp3');
const endOfTimerSound = new Audio('sounds/soft-bell.wav');

const playTickingSound = () => {
  tickingSound.play();
};
const playEndOfTimerSound = () =>{
  endOfTimerSound.play();
}
function stopTickingSound(){
  tickingSound.pause();
};

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset', 
    perimeter * timeRemaining /duration - perimeter
    );
    playTickingSound();
    
  },
  onComplete() {
    stopTickingSound();
    playEndOfTimerSound()
  },
  onPause(){
    stopTickingSound();
  }
});
