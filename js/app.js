// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images\
    this.sprite = 'images/enemy-bug.png';
    // Init will set the default speed and position of the enemy.
    this.init();
};

// Sets enemy speed and position
Enemy.prototype.init = function () {
    this.y = Math.round(Math.random() * 2) + 1;
    this.x = Math.random() * 5 - 1;
    this.speed = Math.random() * .06 + .04;
};

// Resets enemy row position, speed, and moves them off the left side
// Of screen so they can re-enter.
Enemy.prototype.reset = function () {
    this.init();
    this.x = -1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 6) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    // X and Y are in reference to the game grid. They are multiplied by pixel width of the screen
    // subtraction from Y is to center the sprite
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 24);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, enemyArray) {
    //All enemies that could potentially collide with the player
    this.enemyArray = enemyArray;
    //X position on the game grid
    this.x = x;
    //Y position on the game grid
    this.y = y;
    this.randomiseSprite();
    this.moveDirection = "";
};
Player.prototype.update = function (dt) {

    // Win condition. Reset player if he has reached the top row
    if (this.y === 0) {
        this.randomiseSprite();
        this.reset();
    }

    // Checks how the player has moved, then updates their position accordingly
    switch (this.moveDirection) {
        case "left":
            if (this.x) {
                this.x--;
            }
            break;
        case "up":
            if (this.y) {
                this.y--;
            }
            break;
        case "right":
            if (this.x < 4) {
                this.x++;
            }
            break;
        case "down":
            if (this.y < 5) {
                this.y++;
            }
            break;
    }

    // always reset move direction on update
    this.moveDirection = "";

    // Check to see if the player has run into any enemies
    this.checkCollisions();
};
Player.prototype.checkCollisions = function () {
    // Loop through all enemies
    for (i = 0; i < this.enemyArray.length; i++) {
        //Enemy must be on the same row
        if (this.y === this.enemyArray[i].y) {
            //Enemy must be close on the X axis.
            if ((this.x - this.enemyArray[i].x) > -.3 && (this.x - this.enemyArray[i].x) < .3) {
                // Player is returned to start if enemy is too close.
                player.reset();
            }
        }
    }
}
Player.prototype.randomiseSprite = function () {
    //generate a random number num where: 0 <= num < 5
    var randomInt = Math.floor(Math.random() * 4.999999);
    //assign a random sprite to the player based on the random draw.
    switch (randomInt) {
        case 0:
            this.sprite = 'images/char-boy.png';
            break;
        case 1:
            this.sprite = 'images/char-cat-girl.png';
            break;
        case 2:
            this.sprite = 'images/char-horn-girl.png';
            break;
        case 3:
            this.sprite = 'images/char-pink-girl.png';
            break;
        case 4:
            this.sprite = 'images/char-princess-girl.png';
            break;
    }
}
Player.prototype.handleInput = function (inputDirection) {
    //records input direction to player moveDirection
    this.moveDirection = inputDirection;
};
Player.prototype.render = function () {
    // X and Y are in reference to the game grid. They are multiplied by pixel width of the screen
    // subtraction from Y is to center the sprite
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 41);
};
Player.prototype.reset = function () {
    //Resets the player to starting position and clears his move inputs.
    this.x = 2;
    this.y = 5;
    this.moveDirection = "";
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
player = new Player(2, 5, allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // This sends a string as the parameter such as 'right'
    player.handleInput(allowedKeys[e.keyCode]);
});
