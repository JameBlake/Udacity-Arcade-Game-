// Creating an Enemy Constructor and an array to hold all the enemies.
let allEnemies= [];

function Enemy(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    // Pushing all the enemies into the empty array.
    allEnemies.push(this);
};

// All the enemy variables with different positions and different speeds.

const eBug1= new Enemy(0, 220, 60);
const eBug2= new Enemy(-100, 130, 100);
const eBug3= new Enemy(-400, 40, 280);
const eBug4= new Enemy(-250, 130, 90);
const eBug5= new Enemy(-200, 40, 140);
const eBug6= new Enemy(-500, 220, 200);
const eBug7= new Enemy(-50, 130, 170);
const eBug8= new Enemy(-300, 40, 150);
const eBug9= new Enemy(-80, 220, 200);
const eBug10= new Enemy(0, 130, 190);

// Updates the enemies' positions and monitors for collisions between player and enemy.

Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    if ((player.x < this.x + 40) && (player.x + 40 > this.x) && (player.y < this.y + 40) && (40 + player.y > this.y)) {
        player.x = 200;
        player.y = 400;
        // Removes a life for each collision.
        player.handleLives();
    }
};

// Renders the enemies and causes the enemies to loop through the map.

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      if(this.x > 550){
        this.x -= 700;
    }
};

function Player(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png';
        this.lives = 3;
}

// Our character.

let player = new Player(200, 400);

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This listens for key presses and sends the keys to the
// Player.handleInput() method.

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Moving our character with key presses.

Player.prototype.handleInput = function (key){

// Moving our charcter right.
if ((key==='right') && (this.x<=300)){
    this.x+=100;
    }

// Moving our charcter left.
if ((key==='left') && (this.x>=100)){
    this.x -= 100;
    }

// // Moving our character down.

if ((key==='down') && (this.y <=310)){
    this.y += 90;
    }

// // Moving our character up.

if ((key==='up') && (this.y >=40)){
    this.y -= 90;
    }
};

// If the character hits the water. The game is won.
//-50 is end game y value.

Player.prototype.update = function(dt) {
    if (this.y=== -50){
        gameWon();
    }
};

// When a collision occures, we should remove a heart.

const lives = document.getElementById('lives');

Player.prototype.removeHeart = function() {
    lives.removeChild(lives.lastElementChild);
};

Player.prototype.handleLives = function() {
    if (this.lives > 0) {
        this.lives --;
             this.removeHeart();
         } else {
             gameOverPopUp();
         }
}

// When the game has ended, either by winning or losing, the hearts should be replaced.

function resetHearts() {
    lives.innerHTML = '';

    const addNewHeartOne= document.createElement('img');
    addNewHeartOne.setAttribute('src', "images/Heart.png");

    const addNewHeartTwo= document.createElement('img');
    addNewHeartTwo.setAttribute('src', "images/Heart.png");

    const addNewHeartThree= document.createElement('img');
    addNewHeartThree.setAttribute('src', "images/Heart.png");

    lives.appendChild(addNewHeartOne);
    lives.appendChild(addNewHeartTwo);
    lives.appendChild(addNewHeartThree);

    player.lives = 3;
};

// When the character hit's the water. This function is called to reset the characters position to the beginning.

Player.prototype.resetThePlayer = function() {
    this.x = 200;
    this.y = 400;
}

const popUp = document.getElementById('beatTheGamePopUp');

// If the game is won, our beatTheGame modal pops up.

function gameWon(){
    popUp.style.display= 'block';
}

// Our play again button on our beatTheGamePopUp.

const playButton = document.getElementById('playAgain');

playButton.addEventListener('click', function(){
    player.resetThePlayer();
    popUp.style.display= '';
    resetHearts();
});

// If all lives are lost, our gameOver modal pops out.

function gameOverPopUp(){
    const gameOverPopUp = document.getElementById('gameOver');
    gameOverPopUp.style.display= 'block';
}

// Button on our Game Over Modal to restart the game.

const tryAgainButton = document.getElementById('tryAgain');

tryAgainButton.addEventListener('click', function(){
    const gameOverPopUp = document.getElementById('gameOver');
    gameOverPopUp.style.display= '';
    player.resetThePlayer();
    resetHearts();
});