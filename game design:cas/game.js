let speed = 20;
let score = 0;
const pointDisplay = document.getElementById('point');
const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
let obstaclexx = 390;
let obstacleX = obstaclexx;
let moveObstacleInterval; 
let add;
let jumps = "jump1";
let jumpspeed = 500;
let duckrun = new Audio('brinquedo-barulhento-25439.mp3');
let duckquack = new Audio('075176_duck-quack-40345.mp3');
let levelup = new Audio('ping-82822.mp3');

duckrun.volume = 0.1;
duckquack.volume = 0.5;
levelup.volume = 0.25;

// Combined keydown event listener
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.key === 'Enter') {
        gameStart();
        player.classList.add("run");
    }
    if (event.key === ' ' || event.key === 'Spacebar') {
        duckrun.pause();
        jump();
        duckrun.play();
    }
});

function gameStart() {
    if (!moveObstacleInterval) {
        startMovingObstacle();
        startPoints();
        checkCollision();
        duckrun.play();
    }
}

// Level checking interval
var checklevel = setInterval(function() {
    if (score == 20 || score == 30 || score == 50 || score == 100) {
        levelup.play();
    }
}, 1000); // Check every second
function startMovingObstacle() {

    if (moveObstacleInterval) {
        clearInterval(moveObstacleInterval); // Clear existing interval
    }

    moveObstacleInterval = setInterval(function() {
        obstacle.style.left = obstacleX + "px";
        obstacleX -= 5;

        if (obstacleX <= -20) {
            changeheight();
            obstacleX = obstaclexx;
        }
    }, speed);
}
function startPoints(){
    add = setInterval(function addPoint() {
        score += 1;
        pointDisplay.textContent = score;
    },500)
}

function jump(){
    if (!player.classList.contains("jump1") ||!player.classList.contains("jump2") ) { // Prevent duplicate class additions
        player.classList.add(jumps);


        // Optionally, remove the class after the animation duration
        setTimeout(() => {
            player.classList.remove(jumps);
        }, jumpspeed); // Assuming the animation duration is 500ms
    }
}
function checkCollision() {
    var checkDead = setInterval(function(){
        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (obstacleRect.left < playerRect.right && 
            obstacleRect.right > playerRect.left &&
            obstacleRect.top < playerRect.bottom &&
            obstacleRect.bottom > playerRect.top) {
                clearInterval(moveObstacleInterval);
                clearInterval(add);
                clearInterval(checkDead);
                gameOver();
                duckrun.pause()

            
        }

        // Scoring logic
        if (!obstacle.classList.contains("scored") && obstacleRect.right < playerRect.left) {
            obstacle.classList.add("scored");
            score++;
            pointDisplay.textContent = score;
        } else if (obstacle.classList.contains("scored") && obstacleRect.left > playerRect.right) {
            obstacle.classList.remove("scored");
        }
    },10)
}


function gameOver() {
    document.getElementById('gameOverMessage').textContent = "Game Over! Your score: " + score;
    document.getElementById('gameOverOverlay').style.display = 'flex';
    player.classList.remove("run");
    duckrun.pause()
    duckquack.play()
    clearInterval(checkDead);
    clearInterval(moveObstacleInterval);
    clearInterval(add); // Assuming 'add' is your interval for scoring

}

function restartGame() {
    
    // Reset game state, score, etc.
    score = 0;
    pointDisplay.textContent = score;
    obstacleX = obstaclexx;
    player.classList.remove("jump", "run"); // Reset player's classes
    
    // Hide game over overlay
    document.getElementById('gameOverOverlay').style.display = 'none';
    
    // Restart obstacle movement and collision checking
    startMovingObstacle();
    checkCollision();
}

function changeheight(){
    let min = 0;
    let max = 5;
    let minn = 0;
    let maxx = 2;
    var Position =(Math.floor(Math.random() * (max - min + 1)) + min)
    var topp =(Math.floor(Math.random() * (maxx - minn + 1)) + minn)
    const heights =["Spikes.png","spritesheet.png","spritesheetcopy.png","Spikescopy3.png","spritesheetcopy2.png","spritesheetcopy3.png"]
    const tops =["Spikes.png","spritesheet.png","spritesheetcopy.png"]
    let height = heights[Position];
    let top = tops[topp];
    if(score>=100){
        jumpspeed = 300;
        speed= 10;
        obstacle.src= height;
        startMovingObstacle()
    }
    if(score>=50){
        speed = 15;
        obstacle.src= height;
        startMovingObstacle();
    }else if(score>=30){
        obstacle.src= height;

    }else if(score>=20){
        obstacle.style.top = top
    }else if(score<=20){
        speed =20;
        jumps="jump1";
        startMovingObstacle();
    }
}

