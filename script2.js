var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballX = canvas.width / 2 - ballRadius;
var ballY = canvas.height / 2 - ballRadius;
var ballSpeedX = 3;
var ballSpeedY = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickX = canvas.width / 2 - brickWidth / 2;
var brickY = canvas.height - brickHeight - 10;

var rightPressed = false;
var leftPressed = false;

let lives = document.querySelector(".lives").children[0];
let livesCount = Number.parseInt(lives.innerHTML);

let score = document.querySelector(".score").children[0];
let scorePoints = score.innerHTML;


var bricksPerRow = 8;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 30;
var brickWidthTop = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (bricksPerRow - 1))) / bricksPerRow;
var brickHeightTop = 20;
var bricks = [];


for (var c = 0; c < bricksPerRow; c++) {
    for (var r = 0; r < 2; r++) {
        var brickXTop = (c * (brickWidthTop + brickPadding)) + brickOffsetLeft;
        var brickYTop = (r * (brickHeightTop + brickPadding)) + brickOffsetTop;
        bricks.push({ x: brickXTop, y: brickYTop, width: brickWidthTop, height: brickHeightTop, color: "blue", visible: true });
    }
}
let totalCount = bricksPerRow*r;

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
    for (var i = 0; i < bricks.length; i++) {
        ctx.beginPath();
        ctx.rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
        ctx.fillStyle = bricks[i].color;
        ctx.fill();
        ctx.closePath();
    }
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
    for (var i = 0; i < bricks.length; i++) {
        if (ballX + ballRadius > bricks[i].x && ballX - ballRadius < bricks[i].x + bricks[i].width &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedY = -ballSpeedY;
            totalCount--;
            scorePoints++;
            score.innerHTML = scorePoints;
            score.style.color = "red";
            bricks[i].visible = false;
            bricks[i].x = -1000;
            bricks[i].y = -1000;
        }
        if (ballX + ballRadius > bricks[i].x && ballX - ballRadius < bricks[i].x &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedX = -ballSpeedX;
            totalCount--;
            scorePoints++;
            score.innerHTML = scorePoints;
            score.style.color = "red";
            bricks[i].visible = false;
            bricks[i].x = -1000;
            bricks[i].y = -1000;
        }
        if (ballX + ballRadius > bricks[i].x + bricks[i].width && ballX - ballRadius < bricks[i].x + bricks[i].width &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedX = -ballSpeedX;
            totalCount--;
            scorePoints++;
            score.innerHTML = scorePoints;
            score.style.color = "red";
            bricks[i].visible = false;
            bricks[i].x = -1000;
            bricks[i].y = -1000;
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBrick();
    detectCollision();
    drawBrickTop();

    if(totalCount == 0){
        cancelAnimationFrame(update);
        alert("HURRAY! You Won")
    }

        
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY + ballRadius > canvas.height) {
        livesCount--;
        if(livesCount==0){
            let playAgain = confirm('GAME OVER !\nWanna Play Again ? ');
            if(playAgain){
                window.location.reload();
            }else{
                ballSpeedX = 0;
                ballSpeedY = 0;    
            }

        }
        lives.innerHTML = livesCount;
        lives.style.color = "red";
        ballX = canvas.width / 2 - ballRadius;
        ballY = canvas.height / 2 - ballRadius;
        brickX = canvas.width / 2 - brickWidth / 2;
        brickY = canvas.height - brickHeight - 10;
    }
    if(ballY - ballRadius < 0){
            ballSpeedY = -ballSpeedY;
    }
        // check if ball collides with white brick
    if (ballY + ballRadius >= brickY && ballX + ballRadius > brickX && ballX - ballRadius < brickX + brickWidth) {
            ballSpeedY = -ballSpeedY;
            ballY = brickY - ballRadius;
    }

    if (rightPressed) {
        brickX += 6;
        if (brickX + brickWidth > canvas.width) {
            brickX = canvas.width - brickWidth;
        }
    }
    else if (leftPressed) {
        brickX -= 6;
        if (brickX < 0) {
            brickX = 0;
        }
    }
    if(totalCount>0)
    requestAnimationFrame(update);

    
}

update();