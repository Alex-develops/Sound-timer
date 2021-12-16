class Timer {
    constructor (durationInput, startButton, pauseButton, callbacks){  //callbacks argument is optional
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
            this.onPause = callbacks.onPause;
        }
        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }

    start = () => {
        if (this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50); //if we want to access this info in the method below, we assign it to an instance variable by adding "this"

    };

    pause = () =>{
        clearInterval(this.interval);
        if(this.onPause) {
            this.onPause();
        }
    };
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.05; //automatically invoke timeRemaining without () because of the get method,
            //we trick others that we are retrieving a property of the class, as if it is instance variable
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
        };
    get timeRemaining () {
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){
        return this.durationInput.value = time.toFixed(2);
    }
}