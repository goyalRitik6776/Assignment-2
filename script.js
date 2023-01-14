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

var ballCollision = false;
// var bricks = [
//     {x: canvas.width / 4 - 75 / 2, y: 50, width: 75, height: 20, color: "green", visible: true},
//     {x: canvas.width / 4 * 3 - 75 / 2, y: 75, width: 75, height: 20, color: "yellow", visible: true},
//     {x: canvas.width / 4 - 75 / 2, y: 100, width: 75, height: 20, color: "orange", visible: true},
//     {x: canvas.width / 4 * 3 - 75 / 2, y: 125, width: 75, height: 20, color: "purple", visible: true}
// ];
var bricksPerRow = 8;
    var brickPadding = 10;
    var brickOffsetTop = 50;
    var brickOffsetLeft = 30;
    var brickWidthTop = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (bricksPerRow - 1))) / bricksPerRow;
    var brickHeightTop = 20;
    var bricks = [];

    for (var c = 0; c < bricksPerRow; c++) {
        for (var r = 0; r < 3; r++) {
            var brickXTop = (c * (brickWidthTop + brickPadding)) + brickOffsetLeft;
            var brickYTop = (r * (brickHeightTop + brickPadding)) + brickOffsetTop;
            bricks.push({ x: brickXTop, y: brickYTop, width: brickWidthTop, height: brickHeightTop, color: "blue", visible: true });
        }
    }

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    // createCanvas(400,400);
}
function drawBrick() {
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
// function drawBrickTop() {
//     ctx.beginPath();
//     ctx.rect(brickX_top, brickY_top, brickWidth_top, brickHeight_top);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.closePath();
// }
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
    ballCollision = false;
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
    // if(brickVisible_top){
    //     if (ballX + ballRadius > brickX_top && ballX - ballRadius < brickX_top + brickWidth_top &&
    //         ballY + ballRadius > brickY_top && ballY - ballRadius < brickY_top + brickHeight_top) {
    //         ballSpeedY = -ballSpeedY;
    //         brickVisible_top = false;
    //     }

    // }

    for (var i = 0; i < bricks.length; i++) {
        if (ballX + ballRadius > bricks[i].x && ballX - ballRadius < bricks[i].x + bricks[i].width &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedY = -ballSpeedY;
            bricks[i].visible = false;
            bricks[i].x = -1000;
            bricks[i].y = -1000;
        }
        if (ballX + ballRadius > bricks[i].x && ballX - ballRadius < bricks[i].x &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedX = -ballSpeedX;
            bricks[i].visible = false;
            bricks[i].x = -1000;
            bricks[i].y = -1000;
        }
        if (ballX + ballRadius > bricks[i].x + bricks[i].width && ballX - ballRadius < bricks[i].x + bricks[i].width &&
            ballY + ballRadius > bricks[i].y && ballY - ballRadius < bricks[i].y + bricks[i].height) {
            ballSpeedX = -ballSpeedX;
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
    
    // if(brickVisible_top){
    //     // brickX_top = -1000;
    //     // brickY_top = -1000;
    // }
        
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    //     ballSpeedY = -ballSpeedY;
    // }
    if (ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
        ballY = canvas.height - ballRadius;
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