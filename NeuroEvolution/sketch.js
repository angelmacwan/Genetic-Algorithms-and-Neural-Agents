let circles = [];
let cId = 0;

let players = [];
let pId = 0;

let populationSize = 16;
let spawner;

let bestGens = [];
let genNumber = 0;
let highestGen = 0;

let score = 0;
let allScores = [];
let highScore = 0;

let road;

function setup() {
    const canvas = createCanvas(500, window.innerHeight - 10);
    canvas.parent("canvas");

    spawner = new Spawner(populationSize);
    road = new Road(6);
}

function draw() {
    background(0);

    road.show();
    road.update();

    for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].update();
    }

    if (frameCount % 10 == 0) spawnRandom();

    try {
        for (let i = players.length - 1; i >= 0; i--) {
            players[i].update();
        }
    } catch (error) {
        console.log(error);
    }

    spawner.update();

    score++;
    updateStats();
}

// HELPER FUNCTIONS

function updateStats() {
    document.querySelector("#gen").innerHTML = `Generation: ${genNumber}`;
    document.querySelector(
        "#score"
    ).innerHTML = `Score: ${score} <br>High Score ${highScore}`;
    document.querySelector(
        "#population"
    ).innerHTML = `Population: ${players.length}`;
    document.querySelector("#fps").innerHTML = `FPS: ${Math.ceil(frameRate())}`;
}

function spawnRandom() {
    circles.push(new FCircle(random(width), -20));
}
