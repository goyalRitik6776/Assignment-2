var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballX = canvas.width / 2 - ballRadius;
var ballY = canvas.height / 2 - ballRadius;
var ballSpeedX = 4;
var ballSpeedY = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickX = canvas.width / 2 - brickWidth / 2;
var brickY = canvas.height - brickHeight - 10;

var rightPressed = false;
var leftPressed = false;

var brickX_top = canvas.width / 2 - brickWidth / 2;
var brickY_top = 50;
var brickWidth_top = 80;
var brickHeight_top = 20;

var brickVisible_top = true;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawBrick() {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawBrickTop() {
    ctx.beginPath();
    ctx.rect(brickX_top, brickY_top, brickWidth_top, brickHeight_top);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function detectCollision() {
    if (ballX + ballRadius > brickX && ballX - ballRadius < brickX + brickWidth &&
        ballY + ballRadius > brickY && ballY - ballRadius < brickY + brickHeight) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX + ballRadius > brickX && ballX - ballRadius < brickX &&
        ballY + ballRadius > brickY && ballY - ballRadius < brickY + brickHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballRadius > brickX + brickWidth && ballX - ballRadius < brickX + brickWidth &&
        ballY + ballRadius > brickY && ballY - ballRadius < brickY + brickHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if(brickVisible_top){
        if (ballX + ballRadius > brickX_top && ballX - ballRadius < brickX_top + brickWidth_top &&
            ballY + ballRadius > brickY_top && ballY - ballRadius < brickY_top + brickHeight_top) {
            ballSpeedY = -ballSpeedY;
            brickVisible_top = false;
        }
    }

}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBrick();
    detectCollision();
    drawBrickTop();
    
    if(!brickVisible_top){
        brickX_top = -1000;
        brickY_top = -1000;
    }
        
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
        ballY = canvas.height - ballRadius;
    }
    if(ballY - ballRadius < 0){
        ballSpeedY = -ballSpeedY;

    }
    if (rightPressed) {
        brickX += 5;
        if (brickX + brickWidth > canvas.width) {
            brickX = canvas.width - brickWidth;
        }
    }
    else if (leftPressed) {
        brickX -= 5;
        if (brickX < 0) {
            brickX = 0;
        }
    }

    requestAnimationFrame(update);
}

update();