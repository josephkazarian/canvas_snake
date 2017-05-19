/* A SnakeElement in the game */
//Snake Color
var SNAKEELEMENT_COLOR = "lightblue";
var BORDER_COLOR = "red";

function SnakeElement(x, y, ctx, size) {
    var snakeelement_height = size;
    var snakeelement_width = size;
    this.xpos = x;
    this.ypos = y;
    //Draws the snake object
    this.showRect = function () {
            ctx.fillStyle = SNAKEELEMENT_COLOR;
            //Remove in the final Version
            //ctx.strokeStyle = BORDER_COLOR;
            //  ctx.strokeRect(this.xpos,this.ypos,snakeelement_width,snakeelement_height); //Just for Developing time
            ctx.fillRect(this.xpos, this.ypos, snakeelement_width, snakeelement_height);
            ctx.stroke();
        }
        //Deletes the snake object from the canvas
    this.hideRect = function () {
        ctx.clearRect(this.xpos, this.ypos, snakeelement_width, snakeelement_height);
    }
}