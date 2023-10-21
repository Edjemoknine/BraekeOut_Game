let canvas = document.querySelector('#game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() *
     Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

let paddleHeight = 12,
    paddleWidth = 72;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY =(canvas.height - paddleHeight -2);

let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset= 33,
    score = 0;

let brick=[];

for (let i = 0; i <columnCount; i++) {
    brick[i] = [];
    for (let r = 0; r < rowCount; r++) {

        brick[i][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener('mousemove',mouseHundler,true);

function mouseHundler(e){

    var relativeX = e.clientX - canvas.offsetLeft;

    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2 ;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(paddleX,paddleY,paddleWidth,paddleHeight,30);
    ctx.fillStyle='#333';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle='yellow';
    ctx.fill();
    ctx.closePath();
}

function drawBrick(){
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if(brick[c][r].status===1){
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight+ brickPadding)) + topOffset;

                brick[c][r].x = brickX;
                brick[c][r].y = brickY;
                
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth ,brickHeight, 30);
                ctx.fillStyle='#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function trackScore(){
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

function hitDetection(){
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b=brick[c][r];
            if(b.status===1){
                if(x > b.x && x < b.x +brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status=0;
                    score++;
                    if(score === rowCount*columnCount){
                        alert('You Win!');
                        location.reload();
                    }
                }
            }            
        }
    }
}

function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trackScore();
    drawBrick();
    drawBall();
    drawPaddle();
    hitDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy =-dy;
    }

    if(y + dy > canvas.height - ballRadius){

        if(x > paddleX  && x  < paddleX + paddleWidth  ){
            dy= -dy;
        }else{
            alert('Game Over!')
            location.reload();
        }
    }

    if(y + dy >canvas.height - ballRadius || y+ dy < ballRadius){
        dy = -dy;
    }

    // ball move

    x+= dx;
    y+= dy;

}

setInterval(init,10);