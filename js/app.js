"use strict";
// Enemies our player must avoid
var Entity = function (YOffset, sprite) {
    this.isMoving = false;
    this.YOffset = YOffset;
    this.sprite = sprite;
    this.init();
}
Entity.prototype.init = function () {
    // Each Entity child class should override this function
    console.log("Error: " + this + " has no init function");
}
Entity.prototype.update = function (dt) {
    //If the entity is moving, move the entity.
    if(this.isMoving){
        this.move(dt);
    }
}
Entity.prototype.move = function () {
    // Each Entity child class must override this function for itself, else it cannot move.
    console.log("Error: " + this + " has no move function");
}
Entity.prototype.render = function () {
    // Draw the entity on the screen, required method for game
    // X and Y are in reference to the game grid. They are multiplied by pixel width of the screen
    // subtraction from Y is to center the sprite
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - this.YOffset);
}

var Enemy = function () {
    //this centers the bugs on the Y axis by moving them BUGYOFFSET pixels up.
    var ENEMYYOFFSET = 24;
    //makes Enemy an instance of the Entity class
    Entity.call(this, ENEMYYOFFSET, "images/enemy-bug.png");
    //enemies are always moving
    this.isMoving = true;
    // Init will set the default speed and position of the enemy.
    this.init();
};

//Manually assigns Enemy's prototype to Entity and Construtor to Enemy
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Sets enemy speed and position
Enemy.prototype.init = function () {
    this.y = Math.round(Math.random() * 2) + 1;
    this.x = Math.random() * 5 - 1;
    this.speed = Math.random() * 1.8 + 1.2;
};

// Resets enemy row position, speed, and moves them off the left side
// Of screen so they can re-enter.
Enemy.prototype.reset = function () {
    this.init();
    this.x = -1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.move = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 6) {
        this.reset();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (enemyArray) {
    //All enemies that could potentially collide with the player
    this.enemyArray = enemyArray;
    //Assigns Player a random sprite
    this.randomiseSprite();
    // How many pixels a player's sprite must be moved up to be centered on y axis
    var PLAYERYOFFSET = 41;
    // makes Player an instance of Entity
    Entity.call(this, PLAYERYOFFSET, this.sprite);
};

//Manually assigns Player's prototype to Entity and Construtor to Player
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    // Call default function entity class
    Entity.prototype.update.call(this);
    // Check to see if the player has hit an enemy.
    this.checkCollisions();
};
Player.prototype.move = function () {
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
    // Mark player as no longer moving after moving.
    this.isMoving = false;
    // after moving, check to see if the player has won.
    this.checkWinCondition();
};
Player.prototype.checkWinCondition = function () {
    // Win condition. Reset player if he has reached the top row
    if (this.y === 0) {
        // Player starts again with a new sprite
        this.randomiseSprite();
        this.reset();
    }
}
Player.prototype.checkCollisions = function () {
    // Loop through all enemies
    for (var i = 0; i < this.enemyArray.length; i++) {
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
    this.isMoving = true;
    this.moveDirection = inputDirection;
};
Player.prototype.reset = function () {
    //Re-initializes the player to reset player defaults
    this.init();
}
Player.prototype.init = function(){
    //Sets the player to starting position and clears his move inputs.
    // Position on X grid
    this.x = 2;
    // Position on Y grid
    this.y = 5;
    // Current move direction is always blank on startup
    this.moveDirection = "";
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player(allEnemies);

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