const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;


let balls = [];

let ballOne =   new Circle('b1', canvas.width/2, canvas.height/2, 45, -.94, -.25, 'rgba(255, 255, 0, 0.66)');
let ballTwo =   new Circle('b2', canvas.width/2, canvas.height/2, 25, .43, .2,    'rgba(255, 0, 255, 0.66)');
let ballThree = new Circle('b3', canvas.width/2, canvas.height/2, 30, .44, -.64,  'rgba(0, 255, 255, 0.66)');
let ballFour =  new Circle('b4', canvas.width/2, canvas.height/2, 50, .45, -.23,  'rgba(255, 0, 0, 0.66)');
let ballFive =  new Circle('b5', canvas.width/2, canvas.height/2, 15, -.94, .21,   'rgba(0, 255, 0, 0.66)');
let ballSix =   new Circle('b6', canvas.width/2, canvas.height/2, 30, -1, 2,      'rgba(0, 0, 255, 0.66)');



const mediaQuery = window.matchMedia('(min-width: 600px');
if (mediaQuery.matches){
    canvas.width = 300
    canvas.height = 300  
    for (let i = 0; i < balls.length;) {
        balls[i].length = 20
    }
};

function Circle(_name, _x, _y, _size, _dx, _dy, _color) {
    this.name = _name
    this.x = _x
    this.y = _y
    this.size = _size
    this.dx = _dx
    this.dy = _dy
    this.color = _color
};

balls[0] = ballOne;
balls[1] = ballTwo;
balls[2] = ballThree;
balls[3] = ballFour;
balls[4] = ballFive;
balls[5] = ballSix
console.log(balls)

function drawCircle() {
    
    for (let i = 0; i < balls.length; i++){
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,balls[i].size,0,Math.PI * 2);
        ctx.fillStyle = balls[i].color;
        ctx.fill(); 
    }
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();

    // changing position
    for (let i = 0; i < balls.length; i++){
        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;

    // collision detection
        if(balls[i].x + balls[i].size > canvas.width || balls[i].x - balls[i].size < 0) {
        balls[i].dx *= -1;
        };
        if(balls[i].y + balls[i].size > canvas.height || balls[i].y - balls[i].size < 0){
        balls[i].dy *= -1;
        };
    };
    requestAnimationFrame(update);
};

update();


// // fillRect()
// ctx.fillStyle = 'blue';
// ctx.fillRect(20,20,150,100);
// // strokeRect()
// ctx.strokeStyle = 'green';
// ctx.lineWidth = 4;
// ctx.strokeRect(100,200,150,100)
// // clearRect()
// ctx.clearRect(25,25,140,90);
// // fillText()
// ctx.font = '30px Arial';
// ctx.fillStyle = 'yellow';
// ctx.fillText('Hello World', 400, 50);
// // strokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText('Hello World', 400, 100);
// Paths
// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(150,50);
// //ctx.stroke();
// ctx.lineTo(100,150);
// //ctx.stroke();
// // ctx.lineTo(50,50);
// ctx.closePath();
// ctx.fillStyle = 'pink'
// ctx.fill();
// Animation 1
// const circle = {
//     x: 200,
//     y: 200,
//     size: 10,
//     dx: 3,
//     dy: 2
// };