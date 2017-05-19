/* The Counter in the game */
var SCORE_FACTOR = 9;

function Counter(starting_score, score_layer) {
    this.score = starting_score;
    this.apple_eaten = function () {
        this.score += SCORE_FACTOR;
        this.draw();
    }
    this.draw = function () {
        score_layer.clearRect(0, 0, 300, 300);
        score_layer.fillText("Punktestand: " + this.score, 150, 30);
    }
}