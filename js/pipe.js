
function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}
class Pipe{
    constructor(wrapper,skyHeight){
        this.gameWrapper = wrapper;
        this.skyHeight = skyHeight;
        this.inBetweenGap = 125;
        this.pipeTop=null;
        this.pipeBottom=null;
        this.pipeLeft=600;


        this.createPipe();
    }
    createPipe(){
        let topPipe = document.createElement('div');
        let pipeWidth =52;
        //styling TopPipe
        topPipe.style.position='absolute';
        topPipe.style.backgroundImage = 'url(\' images/pipe-green.png \')';
        topPipe.style.transform='rotate(180deg)';
        topPipe.style.left='600px';
        topPipe.style.width=pipeWidth+'px';
        let bottomPipe = document.createElement('div');
        //styling bottomPipe
        bottomPipe.style.position='absolute';
        bottomPipe.style.backgroundImage = 'url(\' images/pipe-green.png \')';
        bottomPipe.style.left='600px';
        
        bottomPipe.style.width=pipeWidth+'px';

        this.pipeTop = this.gameWrapper.appendChild(topPipe);
        this.pipeBottom = this.gameWrapper.appendChild(bottomPipe);
        this.setRandomHt();
    }

    setRandomHt(){
        var randomHt=randomNo(50,300);
        this.pipeTop.style.height = randomHt+'px';
        this.pipeTop.style.top='0px';
        this.pipeBottom.style.height = this.skyHeight -randomHt - this.inBetweenGap+'px';
        this.pipeBottom.style.top = randomHt + this.inBetweenGap +'px';
    }
    move(){
        this.pipeLeft -=2;
        this.movePipe();
    }
    movePipe() {
        this.pipeTop.style.left = this.pipeLeft + 'px';
        this.pipeBottom.style.left = this.pipeLeft + 'px';
    }
    destroyPipe(){ 
        if(this.pipeLeft <= -20){
            this.gameWrapper.removeChild(this.pipeTop);
            this.gameWrapper.removeChild(this.pipeBottom);
            return true;
        }
        else{
            return false;
        }
    }
}
export default Pipe