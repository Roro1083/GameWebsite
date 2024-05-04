/* This code is adapted from the Snake Game implementation by Pleiterson.
Original code repository: https://github.com/Pleiterson/snake-game-javascript
License: MIT License (included in repository)*/

let canvas = document.getElementById("caterpillar"); // Create game platform
let context = canvas.getContext("2d");
let box = 32;

let caterpillar = []; // Create caterpillar array of coordinates that will be painted
caterpillar[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

// Generate random coordinates for flower 
let flower  = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBackground() {
    context.fillStyle = 'rgb(204, 255, 204)';
    context.fillRect(0,0,16 * box, 16 * box); // desenha o retângulo usando x e y e a largura e altura setadas
}

function createCaterpillar() {
    for (i = 0; i < caterpillar.length; i++) {
        context.fillStyle = "green";
        context.fillRect(caterpillar[i].x, caterpillar[i].y, box, box);
    }
}

function createFlower() {
    context.fillStyle = "pink";
    context.fillRect(flower.x, flower.y, box, box);
}

document.addEventListener('keydown', update); // quando um evento acontece, detecta e chama uma função

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Starts game over if player loses
function resetGame() {
    // Reset caterpillar position and direction
    caterpillar = [{
        x: 8 * box,
        y: 8 * box
    }];

    direction = "right";

    // Generate new random coordinates for flower
    flower = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };

    // Restart game interval
    game = setInterval(startGame, 100);
}

function startGame() {

    // If caterpillar goes off board, let it continue back in
    if (caterpillar[0].x > 15 * box && direction == "right") caterpillar[0].x = 0;
    if (caterpillar[0].x < 0 && direction == 'left') caterpillar[0].x = 16 * box;
    if (caterpillar[0].y > 15 * box && direction == "down") caterpillar[0].y = 0;
    if (caterpillar[0].y < 0 && direction == 'up') caterpillar[0].y = 16 * box;

    // If caterpillar hits itself, game over
    for (i = 1; i < caterpillar.length; i++) {
        if (caterpillar[0].x == caterpillar[i].x && caterpillar[0].y == caterpillar[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Set up environment
    createBackground();
    createCaterpillar();
    createFlower();

    let caterpillarX = caterpillar[0].x;
    let caterpillarY = caterpillar[0].y;

    // Move caterpillar in appropriate direction given pressed button
    if( direction == "right") caterpillarX += box;
    if (direction == "left") caterpillarX -= box;
    if (direction == "up") caterpillarY -= box;
    if (direction == "down") caterpillarY += box;

    // Detects caterpillar collision with flower
    if (caterpillarX != flower .x || caterpillarY != flower .y) {
        caterpillar.pop(); // pop tira o último elemento da lista
    } else {
        flower.x = Math.floor(Math.random() * 15 + 1) * box;
        flower.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Grow caterpillar
    let newHead = {
        x: caterpillarX,
        y: caterpillarY
    };

    // Adds the first square of snake for no shift
    caterpillar.unshift(newHead); 
}

let game = setInterval(startGame, 100);