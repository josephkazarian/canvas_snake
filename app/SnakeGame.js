var game = (function () {
    var privateContext; //main Canvas
    var privateCanvas; //main Canvas Context
    var privateScoreCanvas; //Score layer Canvas
    var privateScoreContext; //score 
    /* Game Constants */
    var GAME_WIDTH;
    var GAME_HEIGHT;
    var RASTER_SIZE = 10; // i.e. size of snake elements and apples
    var snake;
    var apple;
    var counter;
    var playing = false; //False when lost
    /* Variables and constants to control framerate */
    var FPS = 10; /* change this to change framerate in the game */
    var now;
    var then = Date.now();
    var interval = 1000 / FPS;
    var delta;
    // Draws the canvas
    function privateDraw() {
        if (playing) window.requestAnimationFrame(privateDraw);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            then = now - (delta % interval);
            if (!snake.update()) lost();
        }
    }

    function lost() {
        playing = false;
        lostScreen();
    }
    //Captures the pressed key
    function captureKeystrokes() {
        privateCanvas.setAttribute('tabindex', '0');
        privateCanvas.focus();
        privateCanvas.addEventListener("keydown", keyPressed, false);
    }
    //Handles the key pressed
    function keyPressed(keyEvent) {
        var keyCode = keyEvent.keyCode;
        if ((keyCode == 32 || keyCode == 27) && !playing) { //If Space pressed and game is not started
            privateStartGame();
        }
        else {
            snake.keyhandler(keyCode);
        }
    }
    // Setzt den Canvas und dessen Context als Variablen
    function privateSetContext(canvas, score_layer) {
        privateCanvas = canvas;
        privateScoreCanvas = score_layer;
        privateContext = canvas.getContext("2d");
        privateScoreContext = privateScoreCanvas.getContext("2d");
    }

    function privateStartGame() {
        playing = true;
        privateContext.clearRect(0, 0, 300, 300);
        window.requestAnimationFrame(privateDraw);
        apple = new Apple(privateContext, RASTER_SIZE, GAME_WIDTH, GAME_HEIGHT);
        counter = new Counter(0, privateScoreContext);
        counter.draw();
        snake = new Snake(privateContext, apple, RASTER_SIZE, 3, counter);
    }
    //Sets the font style for the Start screen and the score counter
    function setScoreLayerStyle() {
        privateScoreContext.font = "20px Comic Sans MS";
        privateScoreContext.fillStyle = "white";
        privateScoreContext.textAlign = "center";
    }
    //Shows "Press Space to start
    function startScreen() {
        privateScoreContext.clearRect(0, 0, 300, 300);
        privateScoreContext.fillText("Press Space To Start", 150, 150);
    }

    function lostScreen() {
        privateScoreContext.clearRect(0, 0, 300, 300);
        privateScoreContext.fillText("Game Over. Press Esc to restart.", 150, 150);
    }

    function publicInit(canvas, score_layer) {
        GAME_HEIGHT = canvas.height;
        GAME_WIDTH = canvas.width;
        privateSetContext(canvas, score_layer);
        setScoreLayerStyle();
        captureKeystrokes();
        startScreen();
    }
    return {
        init: publicInit
    };
})();