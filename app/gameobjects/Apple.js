/* An Apple in the game */
var APPLE_COLOR = "red";
var size = 10;

function Apple(ctx, canvas_size) {
    var apple_height = size;
    var apple_width = size;
    this.xpos;
    this.ypos;
    //Draws the object
    this.new_random_apple = function (listOfSnakeElements, dist) {
        this.random_coordinations();
        if (listOfSnakeElements != null) {
            for (var i = 0; i < listOfSnakeElements.length; i++) {
                if (dist(listOfSnakeElements[i].xpos, listOfSnakeElements[i].ypos, this.xpos, this.ypos) == 0) {
                    this.appledeclined();
                    this.random_coordinations();
                    i = 0;
                }
            }
        }
        this.drawApple();
        return [this.xpos, this.ypos];
    }
    this.random_coordinations = function () {
        this.xpos = this.random_number();
        this.ypos = this.random_number();
    }
    this.random_number = function () {
        var number = Math.floor(Math.random() * 290);
        return number + (size - (number % size));
    }
    this.drawApple = function () {
        ctx.fillStyle = APPLE_COLOR;
        ctx.fillRect(this.xpos, this.ypos, apple_width, apple_height);
        ctx.stroke();
    }
    this.appledeclined = function (applelement) {
        ctx.fillStyle = "lightblue";
        ctx.fillRect(this.xpos, this.ypos, apple_width, apple_height);
        ctx.stroke();
    }
}