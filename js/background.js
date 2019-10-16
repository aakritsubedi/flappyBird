import Bird from '../js/bird.js'
import Game from '../js/game.js'

class Background{
    constructor(wrapper){
        this.wrapper = wrapper;
        //DOM Content
        this.skyWrapper=null;
        this.bgWrapper=null;
        this.baseWrapper=null;
        this.bgWrapperOffsetLeft=null;

        //Movement Factor
        this.skyFactor = 1;
        this.baseFactor = 2;

        this.bird=null;
        this.point=null;
        this.seconds=0;
        this.scoreBoard=null;
        this.playGame=false;

        this.createScoreBoard();
        this.createBackground();
        
    }
    createBackground(){
        let gameWrapper = document.createElement('div');
        //styling gameWrapper
        gameWrapper.style.width='600px';
        gameWrapper.style.height=(512+112)+'px';
        gameWrapper.style.margin='0 auto';
        gameWrapper.style.overflow='hidden';
        gameWrapper.style.position='relative';
        gameWrapper.style.borderLeft='5px solid #EAF0F1';
        gameWrapper.style.borderRight='5px solid #EAF0F1';



        let backgroundContainer = document.createElement('div');
        //styling backGroundContainer
        backgroundContainer.style.height= '512px';
        backgroundContainer.style.backgroundRepeat='repeat-x';
        backgroundContainer.style.backgroundImage = 'url(\' images/background-day.png\')';

        let base = document.createElement('div');
        //Styling Base
        base.style.backgroundImage='url(\' images/base.png\')';
        base.style.height= '112px';
        base.style.overflow='hidden';
        base.style.backgroundRepeat='repeat-x';
        
        this.bgWrapper=this.wrapper.appendChild(gameWrapper);
        this.bgWrapperOffsetLeft = this.bgWrapper.offsetLeft;
        this.skyWrapper = this.bgWrapper.appendChild(backgroundContainer);
        this.baseWrapper= this.bgWrapper.appendChild(base);   
        
        //createScoreBoard
    }
    moveBg(){
        if(this.skyFactor>=500){
            this.skyWrapper.style.backgroundPosition='0px 0px';
            this.baseWrapper.style.backgroundPosition='0px 0px';
            this.skyFactor=1;
            this.baseFactor=1;
        }
        this.skyWrapper.style.backgroundPosition =`${this.skyFactor+=1}px,0px`;
        this.baseWrapper.style.backgroundPosition =`${this.baseFactor+=2}px,0px`;
    }
    updatePoints(){
        let points = document.getElementById('score');
        points.innerHTML = this.point;
    }
    updateScoreCardStyle(){
        this.scoreBoard.style.transition='all 1s';
        this.scoreBoard.style.width='50%';
        this.scoreBoard.style.height='250px';
        this.scoreBoard.style.padding='30px';
        this.scoreBoard.style.zIndex='1';
        this.scoreBoard.style.marginLeft='0px';

        let playAgain = document.createElement('button');
        playAgain.style.lineHeight='45px';
        playAgain.style.padding='2px 15px';
        playAgain.style.color='#ffffff';
        playAgain.style.backgroundColor='#26ae60';
        playAgain.style.border='none';
        playAgain.style.fontWeight='bold';
        playAgain.style.borderRadius='5px';
        playAgain.innerHTML='Play Again';
        playAgain.addEventListener('click',()=>{
            location.reload();
        }); 

        let status=document.getElementById('game-status');
        status.innerHTML = "~~~ GAME OVER ~~~<br/>";
        status.style.lineHeight='45px';
        status.style.color='red';
        status.style.fontWeight='bolder';
        status.style.fontSize='22px';
        status.style.borderBottom='3px double #F3B431';
        status.appendChild(playAgain);
        
    }
    //Count total time survived
    incrementSeconds() {
        this.seconds += 1;
        document.getElementById('survival-time').innerHTML = this.seconds +'sec';
    }
    createScoreBoard(){
        let scoreBoardDiv = document.createElement('div');
        
        scoreBoardDiv.style.height='auto';
        scoreBoardDiv.style.width='250px';
        scoreBoardDiv.style.position='fixed';
        scoreBoardDiv.style.backgroundColor='#4C4B4B';
        scoreBoardDiv.style.marginLeft='-3px';
        scoreBoardDiv.style.borderTopRightRadius='25px';
        scoreBoardDiv.style.borderBottomRightRadius='25px';
        scoreBoardDiv.style.borderRight='5px solid #F5C469'; 
        scoreBoardDiv.style.top='30%';
        scoreBoardDiv.style.padding='10px';
        scoreBoardDiv.style.transition='all 0.5s';
        scoreBoardDiv.style.color='#ffffff';
        scoreBoardDiv.style.textAlign='center';
        
        let score = document.createElement('span');
        score.style.lineHeight='45px';
        score.style.borderBottom='0.5px solid #EAF0F1';
        score.style.display='block';
        score.style.fontWeight='bold';
        score.style.fontSize='18px';
        score.innerHTML="Score: <span id='score'>00</span>";

        let survivalTime = document.createElement('span');
        survivalTime.style.lineHeight='45px';
        survivalTime.style.borderBottom='0.5px solid #EAF0F1';
        survivalTime.style.display='block';
        survivalTime.style.fontWeight='bold';
        survivalTime.style.fontSize='18px';
        survivalTime.innerHTML="Survival Time: <span id='survival-time'>00sec</span>";

        let status = document.createElement('span');
        status.setAttribute('id','game-status');

        scoreBoardDiv.appendChild(status);
        scoreBoardDiv.appendChild(score);
        scoreBoardDiv.appendChild(survivalTime);
        
        this.scoreBoard=this.wrapper.appendChild(scoreBoardDiv);
    }
    
}
export default Background