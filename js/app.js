// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initialize position for each enemy
    this.x = 0;

    this.randomize();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x > canvas.width) {
        this.x = -140;
        this.randomize();
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Method to randomize the enemy's position and speed
Enemy.prototype.randomize = function() {
    var yPositions = [60, 143, 226];
    var yIdx = Math.floor(Math.random() * 3);
    var baseSpeedFactor = 150; //pixel per second

    this.y = yPositions[yIdx];

    // Initialize random speed between 1x to 3x
    this.speed = (Math.floor(Math.random() * 3) + 1) * baseSpeedFactor; 
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initialize();
};

Player.prototype.update = function() {
    this.xDelta = 0;
    this.yDelta = 0;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(inputKey) {
    switch(inputKey) {
        case 'left':
            this.xDelta = -101;
            break;
        case 'up':
            this.yDelta = -83;
            break;
        case 'right':
            this.xDelta = 101;
            break;
        case 'down':
            this.yDelta = 83;
            break;
        default:
            return;
    }
    
    this.x = (this.x + this.xDelta) >= 505 || (this.x + this.xDelta) < 0 ? this.x : this.x + this.xDelta;
    this.y = (this.y + this.yDelta) >= 473 || (this.y + this.yDelta) < -25 ? this.y : this.y + this.yDelta;
}

Player.prototype.initialize = function() {
    this.x = 2 * 101;
    this.y = (5 * 83) - 25;
    this.xDelta = 0;
    this.yDelta = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0; i < 4; i++){
    allEnemies.push(new Enemy());
}


// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
