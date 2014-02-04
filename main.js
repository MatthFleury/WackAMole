var whacAMole = (function () {
    var height = 4,
        width = 7,
        initialize,
        li,
        liElements = [],
        previousMole,
        prepare,
        renderMole,
        render,
        stage,
        span,
        speed = 750,
        launch,
        timer

    initialize = function () {
        prepare();
        render();
        launch();
    };
	
	// prepare the elements on the grid
    prepare = function () {
        span = document.createElement('span');
        li = document.createElement('li');
        stage = document.getElementsByTagName('ul')[0];
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

	// make a mole appear randomly
    renderMole = function () {
        if (undefined !== previousMole) previousMole.className = '';
        previousMole = liElements[Math.floor((Math.random()*(height * width))+1)-1];
        previousMole.className = 'mole';
    };

    return {
        init: initialize
    };
})();

window.addEventListener('DOMContentLoaded', function () {
    whacAMole.init();
});