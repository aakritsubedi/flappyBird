class Bird{
    constructor(wrapper,gravityFactor,jumpFactor){
        this.wrapper = wrapper;
        this.bird=null;
        this.birdX = 35;
        this.birdY = 200;
        this.birdHt= null;
        this.birdWd=null;
        
        this.gravityFactor = gravityFactor;
        this.jumpFactor = jumpFactor;

        this.gameOver = false;
        this.createBird();
    }
    createBird(){
        let birdDiv = document.createElement('div');
        this.birdHt=birdDiv.style.height = '24px';
        this.birdWd=birdDiv.style.width = '34px';
        birdDiv.style.position='absolute';
        birdDiv.style.left=this.birdX+'px';
        birdDiv.style.top=this.birdY+'px';
        birdDiv.style.zIndex='3';
        birdDiv.style.backgroundImage='url(\' images/bluebird-upflap.png \')';

        this.bird= this.wrapper.appendChild(birdDiv);
        this.goDown();
    }
    goDown(baseLevel){
       this.birdY += this.gravityFactor;
       this.bird.style.transform = 'rotate(10deg)';
       this.bird.style.transition = 'transform 0.2s';
       if(this.birdY >= baseLevel){
            //GameOver Condition
            this.deadBird();
            this.gameOver = true;
            this.birdY=baseLevel;
            
       }
       this.bird.style.top = this.birdY+'px';
    }
    goUp(){
        this.birdY -= this.jumpFactor;   
        this.bird.style.transform = 'rotate(-50deg)';
       if(this.birdY <= 0){
            //GameOver Condition
            this.deadBird();
            this.gameOver = true;
            this.birdY=20; 
       }
       this.bird.style.top = this.birdY+'px';
    }
    deadBird(){
        this.bird.style.transform='rotate(90deg)';
        this.bird.style.top='500px';
        this.bird.style.transition='all 3s';
        this.bird.style.backgroundImage = 'url(\' images/redbird-upflap.png \')';
    }


}
export default Bird