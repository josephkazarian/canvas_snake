/* Start the Snake game from here! */
window.onload = function () {
    var canvas = document.querySelector("#canvas");
    var score_layer = document.querySelector("#score_layer");
    game.init(canvas, score_layer);
}