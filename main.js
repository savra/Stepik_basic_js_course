let windowHeight = 500;
let windowWidth = 800;
let highScore = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    highScore = localStorage.getItem('birdScore');
}

let x = 0;
let y = 100;
let gravity = 0.3;
let yV = 0;
let score = 0;

const HEIGHT = 200;
const WIDTH = 10;

let coordinatesY = [randomInteger(30, 500 - 70 - HEIGHT)];
let coordinatesX = [0];
let gameInProgress = 1;

function draw() {
    if (gameInProgress) {
        checkScreen();
        checkBird();
        background(200, 200, 200);
        drawBird();
        if (x % 100 == 0) {
            coordinatesX.push(x - 100 * coordinatesX.length);
            coordinatesY.push(randomInteger(30, 500 - 70 - HEIGHT));
        }

        for (let i = 0; i < coordinatesX.length; i++) {
            drawRect(coordinatesX[i], coordinatesY[i]);
        }
        stroke(100, 100, 100);
        strokeWeight(0);
        fill(0, 0, 0);
        text(score, 10, 10);
        if (highScore != null) {
            text(highScore, 10, 50);
        }
    }

    if(!gameInProgress) {
        stroke(100, 100, 100);
        strokeWeight(0);
        fill(0, 0, 0);
        text('Game end, press R', windowHeight / 2, windowHeight / 2);

        if (highScore == null) {
            highScore = score;
        }

        if (score > highScore) {
            highScore = score;
        }

        localStorage.setItem('birdScore', highScore);
    }
}

function checkBird() {
    let maxNumber = 0;

    for (let i = 0; i < coordinatesX.length; i++) {
        if (coordinatesX[i] >= 410) {
            maxNumber = i + 1;
        }
        if (coordinatesX[i] <= 410 && coordinatesX[i] >= 380) {
            if (y - 10 < coordinatesX[i]) {
                gameInProgress = 0;
            }

            if (y + 10 > coordinatesX[i] + HEIGHT) {
                gameInProgress = 0;
            }
        }
    }
    score = maxNumber;
}

function drawRect(xi, yi) {
    rectMode(CORNERS);
    stroke(250, 100, 0);
    strokeWeight(2);
    fill(250, 100, 0);

    rect(800 - WIDTH - xi, 0, 800 - xi, yi);

    rect(800 - WIDTH - xi, yi + HEIGHT, 800 - xi, 500);
}

function drawBird() {
    stroke(250, 100, 0);
    strokeWeight(3);
    fill(0, 0, 255);
    ellipse(400, y, 10 * 2);

    x += 1;

    for (let i = 0; i < coordinatesX.length; i++) {
        coordinatesX[i] += 1;
    }

    yV += gravity;
    y += yV;
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function keyPressed() {
    if (keyCode === 32) {
        yV = -10;
    }

    if (keyCode === 82) {
        window.location.reload();
    }
}

function checkScreen() {
    if (y >= 500) {
        gameInProgress = 0;
    }

    if (y <= 0) {
        gameInProgress = 0;
    }
}