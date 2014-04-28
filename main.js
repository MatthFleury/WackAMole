var whacAMole = (function () {
    var width = 5,
		height = 6,
        initialize,
        li,
        liElements = [],
        previousMole,
        prepare,
        renderMole,
        render,
        stage,
		setScoreEvent,
        scoreDiv,
        score,
        span,
        speed = 1000,
		speedmax = 1000,
        launch,
        timer,
		life = 5,
		gameTimeOut = 100,
		gameTimeOutDiv,
		chronos,
		gameEndScoreDiv,
		spanScore1,
		spanScore2,
		spanScore3,
		spanScore4,
		spanScore5,
		spanScoreB1,
		spanScoreB2,
		spanScoreB3,
		spanScoreB4,
		spanScoreB5,
		typeScore,
		speeddown = 10,
		gameTimer = 0,
		bonusTimer = 0,
		styleMode = 0,
		isPaused = false,
        utils = {
            id: function (id) {
                return document.getElementById(id);
            },
            getNodeAsInt: function (parent) {
                return parent.firstChild.nodeValue - 0;
            },
            setFirstChildValue: function (parentElem, value) {
                parentElem.firstChild.nodeValue = value;
            }
        };

    initialize = function () {
		prepareScore();
        prepare();
        render();
		prepareScreen();
		setScoreEvent();
    };

	begin = function () {
		document.getElementById('launcher').style.display = "none";
		//$('#gameBegin').show(1000)
		//$('#gameBegin').hide(1000)
		gamestart();
	}

	gamestart = function (mode) {
		isPaused = false;
		document.getElementById('grid').style.display = "block";
		document.getElementById('launcher').style.display = "none";
		document.getElementById('gameEnd').style.display = "none";
		document.getElementById('gameMode').style.display = "none";
		score = 0;
		gameTimer = 0;
		bonustimer =0;
		life = 5;
		speed = speedmax;
		if(mode != null)
			styleMode = mode;
		if(styleMode == 0){
			utils.setFirstChildValue(utils.id('gameTimeOut'), life);
			document.getElementById('classicStatus').style.display = "none";
			document.getElementById('hardStatus').style.display = "inline";
		}
		else{
			utils.setFirstChildValue(utils.id('gameTimeOut'), gameTimeOut);
			document.getElementById('hardStatus').style.display = "none";
			document.getElementById('classicStatus').style.display = "inline";
		}
		utils.setFirstChildValue(scoreDiv, score);
		launch(); 
	}
	
	prepareScore = function() {
		sessionStorage.removeItem("couleur");
		//Score normal
		if( localStorage.getItem("score1") == null )
			localStorage.setItem("score1","5");
		if( localStorage.getItem("score2") == null )
			localStorage.setItem("score2","4");
		if( localStorage.getItem("score3") == null )
			localStorage.setItem("score3","3");
		if( localStorage.getItem("score4") == null )
			localStorage.setItem("score4","2");
		if( localStorage.getItem("score5") == null )
			localStorage.setItem("score5","1");

		//Score survive
		if( localStorage.getItem("scoreS1") == null )
			localStorage.setItem("scoreS1","5");
		if( localStorage.getItem("scoreS2") == null )
			localStorage.setItem("scoreS2","4");
		if( localStorage.getItem("scoreS3") == null )
			localStorage.setItem("scoreS3","3");
		if( localStorage.getItem("scoreS4") == null )
			localStorage.setItem("scoreS4","2");
		if( localStorage.getItem("scoreS5") == null )
			localStorage.setItem("scoreS5","1");
	}

	// prepare the elements on the grid
    prepare = function () {
        span = document.createElement('span');
        li = document.createElement('li');
        stage = document.getElementsByTagName('ul')[0];
    };
	
	// make the score appears
    prepareScreen = function () {
        scoreDiv = utils.id('score');
        score = utils.getNodeAsInt(scoreDiv);
        gameTimeOutDiv = utils.id('gameTimeOut');
		utils.setFirstChildValue(gameTimeOutDiv, gameTimeOut);
		gameEndScoreDiv = utils.id('scoreEnd');
		spanScore1 = utils.id('score1');
		spanScore2 = utils.id('score2');
		spanScore3 = utils.id('score3');
		spanScore4 = utils.id('score4');
		spanScore5 = utils.id('score5');
		spanScoreB1 = utils.id('scoreB1');
		spanScoreB2 = utils.id('scoreB2');
		spanScoreB3 = utils.id('scoreB3');
		spanScoreB4 = utils.id('scoreB4');
		spanScoreB5 = utils.id('scoreB5');
    };
	
	// create the render of the elements
    render = function () {
        for (var i = 0; i < (height * width); i++) {
            var cloneLi = li.cloneNode(false),
                cloneSpan = span.cloneNode(false);

            cloneLi.appendChild(cloneSpan);
            stage.appendChild(cloneLi);
            liElements.push(cloneLi);
        }
    };
	
	// launch the game
    launch = function () {
        timer = setInterval(renderMole, speed); 
		if(styleMode == 1)
			chronos = setInterval(chrono, 1000);
    };
	
	// function to update the score on each click
    setScoreEvent = function () {
        stage.addEventListener('click', function(e) {
            if (e.target && 'span' === e.target.nodeName.toLowerCase()) {
                if ( ('mole' === e.target.parentNode.className) || ('bonusmole' === e.target.parentNode.className) || ('malusmole' === e.target.parentNode.className) ) {
                    if('mole' === e.target.parentNode.className)
						score += 1;
					else if('bonusmole' === e.target.parentNode.className)
						score += 10;
					else if('malusmole' === e.target.parentNode.className){
						if(styleMode == 0){
							life--;
							gameTimeOutDiv = utils.id('gameTimeOut');
							utils.setFirstChildValue(gameTimeOutDiv, life);
						}
						if(score >= 10){
							score -= 10;
							}
						else
							score = 0;
						if(life == 0)
							gameEnd();
					}
                    utils.setFirstChildValue(scoreDiv, score);
                    e.target.parentNode.className = 'deadmole';
					if (speed > (speedmax-((Math.floor(score/10))*speeddown))) {
						clearInterval(timer);
						speed -= speeddown;
						timer = setInterval(renderMole, speed);
                    }
                }
            }
        }, false);
    };

	// function to update the best scores
	calculateBestScore = function (){
		if(styleMode == 0)
			typeScore = "scoreS";
		else
			typeScore = "score";
		
		if(score >= localStorage.getItem(typeScore+"5")){
			if(score >= localStorage.getItem(typeScore+"4")){
				if(score >= localStorage.getItem(typeScore+"3")){
					if(score >= localStorage.getItem(typeScore+"2")){
						if(score >= localStorage.getItem(typeScore+"1")){
							localStorage.setItem(typeScore+"5" , localStorage.getItem(typeScore+"4"));
							localStorage.setItem(typeScore+"4" , localStorage.getItem(typeScore+"3"));
							localStorage.setItem(typeScore+"3" , localStorage.getItem(typeScore+"2"));
							localStorage.setItem(typeScore+"2" , localStorage.getItem(typeScore+"1"));
							localStorage.setItem(typeScore+"1" , score);
						}
						else{
							localStorage.setItem(typeScore+"5" , localStorage.getItem(typeScore+"4"));
							localStorage.setItem(typeScore+"4" , localStorage.getItem(typeScore+"3"));
							localStorage.setItem(typeScore+"3" , localStorage.getItem(typeScore+"2"));
							localStorage.setItem(typeScore+"2" , score);
						}
					}
					else{
						localStorage.setItem(typeScore+"5" , localStorage.getItem(typeScore+"4"));
						localStorage.setItem(typeScore+"4" , localStorage.getItem(typeScore+"3"));
						localStorage.setItem(typeScore+"3" , score);
					}
				}
				else{
					localStorage.setItem(typeScore+"5" , localStorage.getItem(typeScore+"4"));
					localStorage.setItem(typeScore+"4" , score);
				}
			}
			else
				localStorage.setItem(typeScore+"5" , score);
		}
	}

	/*sound = function () {
		document.getElementById("boing").play();
	}*/

	pause = function (){
		if(!isPaused)
			isPaused = true;
		else
			isPaused = false;
	}

	chrono = function (){
		if( !isPaused ){
			if(gameTimer%20 == 0 && bonusTimer != 2 && gameTimer != 0)
				bonusWave();
			else if(bonusTimer == 2){
				hideAllMole();
				bonusTimer = 0;
				gameTimer++;
			}
			else
				gameTimer++;

			utils.setFirstChildValue(gameTimeOutDiv, gameTimeOut-gameTimer);
		}
		if(gameTimeOut-gameTimer == 0)
			gameEnd();
	}
	// make a mole appear randomly
    renderMole = function () {
		if(!isPaused && bonusTimer == 0){
			if (undefined !== previousMole) hideAllMole();
			if(styleMode==1)
				randomMole=Math.random()*3;
			else
				randomMole=1;
			for (var i = 0; i < randomMole; i++) {
				previousMole = liElements[Math.floor((Math.random()*(height * width))+1)-1];
				if(Math.floor((Math.random()*100)+1)%10 === 0)
					previousMole.className = 'bonusmole';
				else if(Math.floor((Math.random()*100)+1)%10 === 0)
					previousMole.className = 'malusmole';
				else{
					previousMole.className = 'mole';
				}
			}
		}
    };
	
	//Launch the bonus wave
	gameEnd = function () {
			clearInterval(timer);
			clearInterval(chronos);
			utils.setFirstChildValue(gameEndScoreDiv, score);
			document.getElementById('gameEnd').style.display = "block";
			document.getElementById('grid').style.display = "none";
			calculateBestScore();
			utils.setFirstChildValue(spanScore1, localStorage.getItem(typeScore+"1"));
			utils.setFirstChildValue(spanScore2, localStorage.getItem(typeScore+"2"));
			utils.setFirstChildValue(spanScore3, localStorage.getItem(typeScore+"3"));
			utils.setFirstChildValue(spanScore4, localStorage.getItem(typeScore+"4"));
			utils.setFirstChildValue(spanScore5, localStorage.getItem(typeScore+"5"));
	}
	
	//Launch the bonus wave
	bonusWave = function () {
		if(bonusTimer == 0)
			renderAllMole();
		bonusTimer++;
	}
	
	
	//All mole appear for bonus wave
    renderAllMole = function () {
		if(!isPaused){
			for (var i = 0; i < (height * width); i++) {
				previousMole = liElements[i];
				
				if(Math.floor((Math.random()*100)+1)%10 === 0)
					previousMole.className = 'malusmole';
				else
					previousMole.className = 'mole';
			}
			
			//Only one bonus mole during bonus wave
			previousMole = liElements[Math.floor((Math.random()*(height * width))+1)-1];
			previousMole.className = 'bonusmole';
		}
    };
	
	//Hide all mole at the end of bonus wave
    hideAllMole = function () {
		if(!isPaused){
			for (var i = 0; i < (height * width); i++) {
			previousMole = liElements[i];
				if(styleMode == 0){
					if(previousMole.className == 'mole' || previousMole.className == 'bonusmole'){
						life--;
						gameTimeOutDiv = utils.id('gameTimeOut');
						utils.setFirstChildValue(gameTimeOutDiv, life);
						if(life == 0)
							gameEnd();
					}
				}
				previousMole.className = '';
			}
		}
    };
	
	
	// function to display the scoreboard
	scoreBoard = function (e){
		document.getElementById('grid').style.display = "none";
		document.getElementById('launcher').style.display = "none";
		document.getElementById('gameEnd').style.display = "none";
		document.getElementById('scoreBoardArt').style.display = "block";
		if(e == 1){
			//document.getElementById('classicMode').className="mybutton2 back";
			//document.getElementById('survivalMode').className="mybutton back";
			utils.setFirstChildValue(spanScoreB1, localStorage.getItem("score1"));
			utils.setFirstChildValue(spanScoreB2, localStorage.getItem("score2"));
			utils.setFirstChildValue(spanScoreB3, localStorage.getItem("score3"));
			utils.setFirstChildValue(spanScoreB4, localStorage.getItem("score4"));
			utils.setFirstChildValue(spanScoreB5, localStorage.getItem("score5"));
			if(document.getElementById('classicMode').className=="mybutton back"){
				document.getElementById('classicMode').className="mybutton2 back";
				document.getElementById('survivalMode').className="mybutton back";
			}
			else if(document.getElementById('classicMode').className=="mybutton2 back"){
				document.getElementById('classicMode').className="mybutton back";
				document.getElementById('survivalMode').className="mybutton2 back";
			}
				
		}else{
			//document.getElementById('survivalMode').className="mybutton2 back";
			//document.getElementById('classicMode').className="mybutton back";
			utils.setFirstChildValue(spanScoreB1, localStorage.getItem("scoreS1"));
			utils.setFirstChildValue(spanScoreB2, localStorage.getItem("scoreS2"));
			utils.setFirstChildValue(spanScoreB3, localStorage.getItem("scoreS3"));
			utils.setFirstChildValue(spanScoreB4, localStorage.getItem("scoreS4"));
			utils.setFirstChildValue(spanScoreB5, localStorage.getItem("scoreS5"));
			if(document.getElementById('survivalMode').className=="mybutton back"){
				document.getElementById('survivalMode').className="mybutton2 back";
				document.getElementById('classicMode').className="mybutton back";
			}
			else if(document.getElementById('survivalMode').className=="mybutton2 back"){
				document.getElementById('survivalMode').className="mybutton back";
				document.getElementById('classicMode').className="mybutton2 back";
			}
		}
	}

	// function to display the instructions
	instructionScreen = function (){
		document.getElementById('grid').style.display = "none";
		document.getElementById('launcher').style.display = "none";
		document.getElementById('gameEnd').style.display = "none";
		document.getElementById('scoreBoardArt').style.display = "none";
		document.getElementById('instructionScreen').style.display = "block";
	}
	
	gameMode = function (){
		document.getElementById('grid').style.display = "none";
		document.getElementById('launcher').style.display = "none";
		document.getElementById('gameEnd').style.display = "none";
		document.getElementById('scoreBoardArt').style.display = "none";
		document.getElementById('gameMode').style.display = "block";
	}

	// function to get back to title screen
	back = function (e){
		if(e == 0)
			document.getElementById('gameEnd').style.display = "none";
		else if(e == 1){
			clearInterval(timer);
			clearInterval(chronos);
			document.getElementById('grid').style.display = "none";
		}
		else if(e == 2)
			document.getElementById('scoreBoardArt').style.display = "none";
		else if(e == 3)
			document.getElementById('instructionScreen').style.display = "none";
		else if(e == 4)
			document.getElementById('gameMode').style.display = "none";

		document.getElementById('launcher').style.display = "block";
	}

    return {
        init: initialize
    };
})();

window.addEventListener('DOMContentLoaded', function () {
    whacAMole.init();
});