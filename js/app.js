// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy';

    this.moveDirection = "";
};
Player.prototype.update = function (dt) {
    // always reset move direction on update
    switch(this.movedirection){
        case "left":
            break;
        case "up":
            break;
        case "right":
            break;
        case "down":
            break;
    }
    this.moveDirection = "";
};
Player.prototype.handleInput = function (inputKey) {
    //records input to player directional movement
    switch (inputKey) {
        case 37:
            this.moveDirection = "left";
            break;
        case 38:
            this.moveDirection = "up";
            break;
        case 39:
            this.moveDirection = "right";
            break;
        case 40:
            this.moveDirection = "down";
            break;
    }
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
