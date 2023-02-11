const startGame = document.querySelector('#startGame')
const gameOverScore = document.querySelector('#gameOverScore');
const playAgain = document.querySelector('.button');
const endGameCard = document.querySelector('.end-game');
const score = document.querySelector('#score');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let startingPlayerColor = undefined;
canvas.width = innerWidth;
canvas.height = innerHeight;
startGame.style.backgroundColor = `hsl(${Math.random()*360},50%,50%)`;
startingPlayerColorHue = Math.random()*360;
function preGame() {
    startingPlayerColorHue = Math.random()*360;

    startGame.style.backgroundColor = `hsl(${startingPlayerColorHue},50%,50%)`;
    playAgain.style.backgroundColor = `hsl(${startingPlayerColorHue},50%,50%)`;
};
setInterval(preGame,1250);


// -------------------------- Player ------------------------------------------------

class Player {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    };
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = this.color;
        context.fill();
    };
};

// --------------------------Projectile-------------------------------------------


class Projectile {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = this.color;
        context.fill();
    };
    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
};

// --------------------------Enemy--------


class Enemy {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    };
    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = `hsl(${this.color}, ${this.radius * 1.7}%, 50%)`;
        context.fill();
    };
    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
};

// --------------------------Particle--------


class Particle {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1
    };
    draw() {
        context.save();
        context.globalAlpha
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = `hsl(${this.color}, 50%, 50%)`;
        context.fill();
        context.restore();
    };
    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    };
};

// ------------------------Initial Constants and definitions-------

const x = canvas.width /2;
const y = canvas.height /2;

let player = new Player(x, y, 20, `white`);
let projectiles = [];
let points = 0;
let enemies = [];
let particles = [];
let waveCounter = 0;

function init() {
    points = 0;
    score.textContent = points;
    player = new Player(x, y, 20, `hsl(${startingPlayerColorHue},50%,50%)`);
    projectiles = [];
    enemies = [];
    particles = [];
    waveCounter = 0;
    level = 0
};

// -----------------------------------------Spawn enemies ---------------------------------------
function spawnEnemies(){
        const radius = Math.random() * (40 - 10) + 10;
        let x = null;
        let y = null;
        if(Math.random() > 0.5) {
            x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius;
        };
        const rHUE = Math.random() * 360;
        ;
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        enemies.push(new Enemy(x, y, radius, rHUE, velocity))
                
    };


// ---------------------------------------------------------Animation--------------------------------------


function animate() {
    animationId = requestAnimationFrame(animate);
    // -----------------------------------------------------------------------red hot score keeping------------
    score.style.color = `hsl(${100-(6*projectiles.length)}, 100%, ${100-(5*projectiles.length)}%)`;
    // -----------------clear canvas--------------------
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(200,20,25*projectiles.length, 20);
    player.draw();
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update();
        };
    });
    projectiles.forEach((projectile, index) => {
        projectile.update();
        // removal of off-screen projectiles
        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
            setTimeout(() => {
                projectiles.splice(index, 1);
            },0);
        };
    });
    enemies.forEach((enemy, index) => {
        enemy.update();
        const distance = Math.hypot(player.x - enemy.x , player.y - enemy.y);
        // -------------------------------------------End Game-----------------------------------------
        if(distance - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
            playAgain.classList.toggle('hide');
            gameOverScore.classList.toggle('hide');
            endGameCard.style.display = 'flex';
            endGameCard.style.backgroundColor = `hsla(${enemy.color}, 50%, 50%, 0.75)`;
        }
        // ----------------------------------when projectiles touch enemy---------------------------------
        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x , projectile.y - enemy.y);
            
            if(distance - enemy.radius - projectile.radius < 1) {
                // -----------------------------------------------------score increase---------------
                points += Math.round(100*(2/enemy.radius));
                score.textContent = points;
                gameOverScore.innerHTML = `SCORE:<br> ${points}`;
                // ------------------------------------------------------explosions-----------------------
                for (let i = 0; i < enemy.radius; i++) {
                    particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {x:(Math.random()-0.5)* Math.random() * 3, y:(Math.random()-0.5)*Math.random() * 3}))
                };
                // ----------------------shrinking removing enemies------------------------------------------
                if(enemy.radius - 10 > 10) {
                    gsap.to(enemy,{
                        radius: enemy.radius - 10
                    });
                    projectiles.splice(projectileIndex, 1);
                } else {
                    setTimeout(() => {
                        enemies.splice(index, 1);
                        projectiles.splice(projectileIndex, 1);
                    },0);
                };
            };
        });
    });
};
addEventListener('click', (event)=>{
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x:8* Math.cos(angle),
        y:8* Math.sin(angle)
    };
    projectiles.push(new Projectile(x, y, 5, `hsl(${startingPlayerColorHue}, 100%, ${100-(7*projectiles.length)}%)`, velocity));
    console.log(100-(7*projectiles.length));
});

startGame.addEventListener('click', ()=>{
    init();
    animate();
    setInterval(spawnEnemies, 2000);
    startGame.style.display = 'none';
});

playAgain.addEventListener('click', ()=>{
    init();
    animate();
    endGameCard.style.display = 'none';
    startGame.style.display = 'none';
    playAgain.classList.toggle('hide');
    gameOverScore.classList.toggle('hide');
});
