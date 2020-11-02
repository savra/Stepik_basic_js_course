function setup() {
    createCanvas(800, 500);
}

let x = 0;
let y = 100;
let gravity = 0.1;
let yV = 0;


let height = 70;
let count = 10;

let coordinatesY = [];

for (let i = 0; i < count; i++) {
    coordinatesY[i] = randomInteger(30, 400);
}

function draw() {
    background(200, 200, 200);
    drawBird();

    for (let i = 0; i < count; i++) {
        drawRect(x - i * 100, coordinatesY[i]);
    }
}

function drawRect(xi, yi) {
    rectMode(CORNERS);
    stroke(250, 100, 0);
    strokeWeight(2);
    fill(250, 100, 0);

    rect(790 - xi, 0, 800 - xi, yi);

    rect(790 - xi, yi + 70, 800 - xi, 500);
}

function drawBird() {
    stroke(250, 100, 0);
    strokeWeight(3);
    fill(0, 0, 255);
    ellipse(400, y, 10 * 2);

    x += 1;

    if (yV < 0) {
        yV += gravity * 10;
    }
    if (yV >= 0) {
        yV += gravity;
    }

    y += yV;
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function keyPressed() {
    yV = -10;
}