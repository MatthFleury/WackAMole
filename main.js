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
        speed = 750,
		speedmax = 750,
        launch,
        timer,
		speeddown = 75	,
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
        prepare();
        render();
		prepareScreen();
		setScoreEvent();
    };
	
	gamestart = function () {
		document.getElementById('grid').style.display = "block";
		document.getElementById('launcher').style.display = "none";
		launch(); 
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
					else if('malusmole' === e.target.parentNode.className)
						if(score >= 10)
							score -= 10;
						else
							score = 0;
                    utils.setFirstChildValue(scoreDiv, score);
                    e.target.parentNode.className = '';
					if (speed > (speedmax-((Math.floor(score/10))*speeddown))) {
						clearInterval(timer);
						speed -= speeddown;
						timer = setInterval(renderMole, speed);
                    }
                }
            }
        }, false);
    };

	// make a mole appear randomly
    renderMole = function () {
        if (undefined !== previousMole) previousMole.className = '';
        previousMole = liElements[Math.floor((Math.random()*(height * width))+1)-1];

		if(Math.floor((Math.random()*100)+1)%10 === 0)
			previousMole.className = 'bonusmole';
		else if(Math.floor((Math.random()*100)+1)%10 === 0)
			previousMole.className = 'malusmole';
		else
			previousMole.className = 'mole';
    };

    return {
        init: initialize
    };
})();

window.addEventListener('DOMContentLoaded', function () {
    whacAMole.init();
});