/* The snake in the game */
function Snake(ctx, apple, block_size, initial_size, counter) {
    //Current x and y position
    this.x_axis = ((initial_size * block_size) - block_size);
    this.y_axis = 0;
    this.current_apple;
    //Movement direction
    this.movement_dir = 0;  // 0 -> right
                            // 1 -> down
                            // 2 -> left
                            // 3 -> up
    //Movement Queue
    this.movement_queue = [];
    //List of the blocks where the snake is
    var listOfSnakeElements = [];
    //Initializing the snake with *initial_size* blocks
    for (var i = 0; i < initial_size; i++) {
        var newelement = new SnakeElement(i * 10, 0, ctx, block_size);
        listOfSnakeElements.push(newelement);
        newelement.showRect();
    }
    //Creating the first apple
    this.current_apple = apple.new_random_apple();
    //Current apple position
    this.apple_xpos = this.current_apple[0];
    this.apple_ypos = this.current_apple[1];
    //moves the Snake
    this.update = function () {
            this.update_coordinations();
            if (!this.death()) return false;
            var nelement = new SnakeElement(this.x_axis, this.y_axis, ctx, block_size);
            nelement.showRect();
            listOfSnakeElements.push(nelement);
            if (!this.check_eaten()) {
                var delement = listOfSnakeElements.shift();
                delement.hideRect();
            }
            else {
                this.current_apple = apple.new_random_apple(listOfSnakeElements,this.dist);
                counter.apple_eaten();
                
                    this.apple_xpos = this.current_apple[0];
                    this.apple_ypos = this.current_apple[1];
                }
            
            return true;
        }
        //Calculates the next coordinations based on Direction
    this.update_coordinations = function () {
            if (this.movement_queue.length != 0) this.movement_dir = this.movement_queue.shift();
            switch (this.movement_dir) {
            case 0:
                {
                    this.x_axis += block_size
                };
                break; //Direction right
            case 1:
                {
                    this.y_axis += block_size
                };
                break; //Direction down
            case 2:
                {
                    this.x_axis -= block_size
                };
                break; //Direction left
            case 3:
                {
                    this.y_axis -= block_size
                };
                break; //Direction up
            }
        }
        //Checks if the game is over
    this.death = function () {
            //Check if the snake hit a border
            if (this.x_axis < 0 || this.y_axis < 0 || this.x_axis >= 300 || this.y_axis >= 300) {
                
                return false;
            }
            //Check if the snake ate itself
            for (var i = 0; i < listOfSnakeElements.length; i++) {
                if (this.dist(listOfSnakeElements[i].xpos, listOfSnakeElements[i].ypos, this.x_axis, this.y_axis) == 0) {
                    return false;
                }
            }
            return true;
        }
        //Check if an apple the apple has been eaten
    this.check_eaten = function () {
            if (this.dist(this.x_axis, this.y_axis, this.apple_xpos, this.apple_ypos) == 0) return true;
        }
        //Calculates the distance between a snakeElement and the current coordinations
    this.dist = function (x1, y1, x2, y2) {
            return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
        }
        //Recieves a pressed key
    this.keyhandler = function (keyCode) {
        switch (keyCode) {
        case 39:
            {
                if (this.movement_dir != 2) this.movement_queue.push(0); //this.movement_dir = 0
            };
            break; //Handles right arrow
        case 40:
            {
                if (this.movement_dir != 3) this.movement_queue.push(1); // this.movement_dir = 1
            };
            break; //Handles down arrow
        case 37:
            {
                if (this.movement_dir != 0) this.movement_queue.push(2); // this.movement_dir = 2
            };
            break; //Handles left arrow
        case 38:
            {
                if (this.movement_dir != 1) this.movement_queue.push(3); // this.movement_dir = 3
            };
            break; //Handles up arrow 
        }
    }
}