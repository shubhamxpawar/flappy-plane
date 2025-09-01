const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.25;
const bounceFactor = 0.4; 

let plane = new Image();
let x = 10;
let y = 0;
let velocityY = 0;
let velocityX = 5;

const imageCanvas = document.createElement('canvas');
const imageCtx = imageCanvas.getContext('2d');

plane.src = 'aeroplane.svg';

plane.onload = () => {
    imageCanvas.width = 500;
    imageCanvas.height = 500;
    imageCtx.drawImage(plane, 0, 0, imageCanvas.width, imageCanvas.height);
    animate();
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.key === 'ArrowUp') {
        // Prevent the default browser action (e.g., scrolling)
        event.preventDefault(); 
        
        // Give the plane an upward "thrust" by setting a negative vertical velocity
        velocityY = -3; // Adjust this value to change the jump height
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(y < 0) y = 0;

    velocityY += gravity;
    y += velocityY;

    if (y + 25 > canvas.height) {
      y = 0
      velocityY = 0
    }

    ctx.drawImage(imageCanvas, x, y, 40, 25);

    requestAnimationFrame(animate);
}