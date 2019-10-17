import Background from '../js/background.js'
import Bird from '../js/bird.js'
import Pipe from '../js/pipe.js' 


class Game{
    constructor(wrapper){
        this.points=0;
        this.wrapper=wrapper;
        this.background=null;
        this.bird = null; 
        this.pipe =[];
        this.gameInterval = null;
        this.gameStatus=null;
        this.createPlayBtn();
        this.initilizeGame();
            
    }
    moveBirdUp(){
        document.addEventListener ('keydown', (event)=>{
            if(event.keyCode == 32 ){
                this.bird.goUp();
            }
        });
    }
    movePipes(){
        for(var i=0;i<this.pipe.length;i++){
            this.pipe[i].move();
        }
    }
    removePipe(){
        for(var i=0;i<this.pipe.length;i++){
            if(this.pipe[i].destroyPipe()){
                this.pipe.splice(i,1);
                this.points++;
                this.updateScore();
            }
            
        }
    }
    // Creating Background and Bird 
    initilizeGame(){
        this.background = new Background(this.wrapper);
        this.bird = new Bird(this.background.skyWrapper,2,60); 
    }
    checkTwoCollision(pipe){
        //Bird
        let x=this.bird.birdX;
        let y=this.bird.birdY;
        let ht=parseInt(this.bird.birdHt);
        let wd=parseInt(this.bird.birdWd);
        //console.log(x,y,ht,wd);


        //topPipe
        let topPipe = pipe.pipeTop;
        let bottomPipe = pipe.pipeBottom;

        //TopPipe x1,y1,w1,h1
        let x1=parseInt(topPipe.style.left);
        let y1=parseInt(topPipe.style.top);
        let h1=parseInt(topPipe.style.height);
        let w1=parseInt(topPipe.style.width);
        //console.log(x1,y1,h1,w1);
        
        //BottomPipe x2,y2,h2,w2
        let x2=parseInt(bottomPipe.style.left);
        let y2=parseInt(bottomPipe.style.top);
        let h2=parseInt(bottomPipe.style.height);
        let w2=parseInt(bottomPipe.style.width);
        //console.log(x2,y2,h2,w2);
        
        if((x<(x1+w1)&&(x+wd)>x1)&&(y<(y1+h1)&&(y+ht)>y1)){
            console.log("Collision");
            this.bird.gameOver=true;
            this.checkGameOver();   
        }//collision with TopPipe 
        if((x<(x2+w2)&&(x+wd)>x2)&&(y<(y2+h2)&&(y+ht)>y2)){
            console.log("Collision");
            this.bird.gameOver=true;   
            this.checkGameOver();
        }//collision with BottomPipe

    }
    checkCollision(){
        for(var i=0;i<this.pipe.length;i++){
            this.checkTwoCollision(this.pipe[i]);
        }
                
    }
    updateScore(){
        this.background.point= this.points;
        this.background.updatePoints();
    }
    //Checking GameOver 
    checkGameOver(){
        if(this.bird.gameOver){
            document.removeEventListener('keydown',()=>{
                if(event.keyCode == 32){
                    //do nothing
                }
            });
            this.bird.deadBird();
            this.background.playGame=false;
            clearTimeout(this.gameInterval);
            this.background.updateScoreCardStyle();

            //Game Status Bar
            this.styleGameOverBtn();
    
        } 
    }
    createPlayBtn(){
        let startGame = document.createElement('button');

        startGame.style.border='3px solid #DFAF2B';
        startGame.style.fontSize ='22px';
        startGame.style.fontWeight='bolder';
        startGame.style.opacity='0.7';
        startGame.style.lineHeight='50px';
        startGame.style.width='30%';
        startGame.style.zIndex='2';
        startGame.style.backgroundColor = '#019031';
        startGame.style.position='absolute';
        startGame.style.marginLeft='25%';
        startGame.style.marginTop='5%';
        startGame.style.color='#ffffff';
        startGame.style.borderRadius='5%';
        startGame.innerHTML = 'Start Game';
        
        startGame.addEventListener('click',()=>{
            startGame.style.display='none';
            this.playGame();
            this.moveBirdUp();
        });
        this.gameStatus = this.wrapper.appendChild(startGame);
    }
    styleGameOverBtn(){
        this.gameStatus.style.transition='all 2s';
        this.gameStatus.style.backgroundColor='#B83227';
        this.gameStatus.style.border='none';
        this.gameStatus.style.marginLeft='7%';
        this.gameStatus.style.display='block';
        this.gameStatus.style.opacity='1';
        this.gameStatus.style.marginTop='5%';
        this.gameStatus.style.lineHeight='75px';
        this.gameStatus.style.borderRadius='0px';
        this.gameStatus.innerHTML = 'GAME OVER';
    }
    //Game Play
    playGame(){
        let counter =0;
        let oneSecCounter=0;
        let time=0;
        let pipeSpeed=150;
        this.gameInterval = setInterval(()=>{
            this.background.moveBg();
            this.bird.goDown(this.background.skyWrapper.clientHeight);
            this.checkGameOver();
            counter++;
            if(counter == 145){
                this.pipe.push(new Pipe(this.background.bgWrapper,this.background.skyWrapper.clientHeight));
                counter=0;
            }
            this.movePipes();
                if(this.pipe.length != 0){
                    this.removePipe();
                    //this.updateScore();
                    this.checkCollision();
                }
                //console.log(this.points);
                oneSecCounter +=16.66667;
                if(oneSecCounter >= 1000){
                    oneSecCounter=0;
                    this.background.incrementSeconds();
                }
        },1000/60);
    }

}
export default Game