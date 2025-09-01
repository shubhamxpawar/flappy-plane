const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.2;
const bounceFactor = 0.4; 

let plane = new Image();
let x = 20;
let y = (canvas.height / 2) - 20;
let velocityY = 0;
let velocityX = 5;

// State management
let gameState = 'ready'; // 'ready' or 'playing'

const imageCanvas = document.createElement('canvas');
const imageCtx = imageCanvas.getContext('2d');

plane.src = 'aeroplane.svg';

plane.onload = () => {
    imageCanvas.width = 500;
    imageCanvas.height = 500;
    imageCtx.drawImage(plane, 0, 0, imageCanvas.width, imageCanvas.height);
    // Start the single game loop
    gameLoop();
};

document.addEventListener('keydown', (event) => {
    if (gameState === 'ready') {
        // Change state and reset velocity for the game to start
        gameState = 'playing';
        velocityY = 0;
    }

    if (event.code === 'Space' || event.key === 'ArrowUp') {
        event.preventDefault(); 
        velocityY = -3; 
    }
});

let readyTime = 0; // Use a counter for the bobbing animation

function gameLoop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'ready') {
        // Bobbing animation for the ready state
        const bobSpeed = 0.01;
        const bobRange = 5;
        y = canvas.height / 2 + Math.sin(timestamp * bobSpeed) * bobRange - 20;
        ctx.drawImage(imageCanvas, x, y, 40, 25);
    } else if (gameState === 'playing') {
        // Main game animation
        if(y < 0) y = 0;

        velocityY += gravity;
        y += velocityY;
        
        if (y + 25 > canvas.height) {
            gameState = 'ready'
        }

        ctx.drawImage(imageCanvas, x, y, 40, 25);
    }
    
    requestAnimationFrame(gameLoop);
}