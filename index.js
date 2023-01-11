//simulation one (zero dimension gravitaional plane)

const canvasOne = document.getElementById('canvasOne');
const ctxOne = canvasOne.getContext('2d');
let balls = [];

canvasOne.width = 1200;
canvasOne.height = 750;

function Circle(_name, _x, _y, _size, _dx, _dy, _color) {
    this.name = _name
    this.x = _x
    this.y = _y
    this.size = _size
    this.dx = _dx
    this.dy = _dy
    this.color = _color
};

//                           xpos ypos size   dx    dy                                   //
let ball1 =  new Circle('b1', 250, 250, 60, -2.7,  0.6, '#ffffff');  //rgba(255, 255,   0, 1.0)');     // yellow
let ball2 =  new Circle('b2', 250, 250, 60,  2.1,  0.9, '#cccccc');  //rgba(255, 0,   255, 1.0)');     // magenta
let ball3 =  new Circle('b3', 250, 250, 60, -1.5,  1.2, '#999999');  //rgba(0,   255, 255, 1.0)');     // cyan 
let ball4 =  new Circle('b4', 250, 250, 60,  1.1, -1.5, '#666666');  //rgba(255, 0,     0, 0.66)');    // red
let ball5 =  new Circle('b5', 250, 250, 60, -0.7, -2.1, '#333333');  //rgba(0,   255,   0, 0.66)');    // green
let ball6=   new Circle('b6', 250, 250, 60,  0.5, -2.4, '#000000');  //rgba(0,   0,   255, 0.66)');    // blue

balls[0] = ball1;
balls[1] = ball2;
balls[2] = ball3;
balls[3] = ball4;
balls[4] = ball5;
balls[5] = ball6;

function drawCircle() {
    for (let i = 0; i < balls.length; i++){
        ctxOne.beginPath();
        ctxOne.arc(balls[i].x,balls[i].y,balls[i].size,0,Math.PI * 2);
        ctxOne.fillStyle = balls[i].color;
        ctxOne.fill(); 
    }
};

function update() {
    ctxOne.clearRect(0, 0, canvasOne.width, canvasOne.height);
    drawCircle();
    // changing position
    for (let i = 0; i < balls.length; i++){
        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;
    // collision detection
        if(balls[i].x + balls[i].size > canvasOne.width || balls[i].x - balls[i].size < 0) {
        balls[i].dx *= -1;
        };
        if(balls[i].y + balls[i].size > canvasOne.height || balls[i].y - balls[i].size < 0){
        balls[i].dy *= -1;
        };
    };
    requestAnimationFrame(update);
};

update();