class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if(this.onStart) {
            this.onStart(this.timeLeft);
        }

        this.tick();
        this.interval = setInterval(this.tick, 25);
    };

    tick = () => {
        if(this.onTick) {
            this.onTick(this.timeLeft);
        }
        if(this.timeLeft <= 0){
            this.pause();
        }
        else {
            this.timeLeft = this.timeLeft - 0.02;
        }    
    };

    get timeLeft(){
        return parseFloat(this.durationInput.value)
    }

    set timeLeft(time){
        this.durationInput.value = time.toFixed(2);
    }

    pause = () => {
        if(this.onComplete) {
            this.onComplete();
        }
        clearInterval(this.interval);
    };
}
