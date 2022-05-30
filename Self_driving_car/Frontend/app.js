let stats = document.querySelector("#stats");
const angleLimit = 2;

function drawArrow(base, vec) {
    const myColor = color("#FF7171");
    push();
    stroke(myColor);
    fill(myColor);
    strokeWeight(10);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    point(vec.x, vec.y - 25);
    rotate(vec.heading());
    let arrowSize = 20;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent("canvas");
    frameRate(5);
    background(0);
}

let d;

function draw() {
    // background(0);
    // translate(width / 2, height / 2);

    // stroke("#9FD8DF");
    // strokeWeight(2);
    // line(-width / 2, 0, width / 2, 0);
    // line(0, -height / 2, 0, height / 2);
    // noFill();
    // arc(0, 0, 250, 250, PI, 0);

    // let steering = noise(frameCount * 0.01);
    // steering = map(steering, 0, 1, -angleLimit, angleLimit);
    // rotate(steering);
    // drawArrow(createVector(0, 0), createVector(0, -100), color(255));

    // let turn = "";
    // if (steering > 0) turn = "Right";
    // else if (steering < 0) turn = "Left";
    // else turn = "Straight";

    // stats.innerHTML = `
    //                 <p>Simulator Online: ${true} </p>
    //                 <p>Steering: ${steering.toFixed(3)} </p>
    //                 <p>Turn ${turn} </p>`;

    fetch("http://localhost:8080/")
        .then((res) => res.json())
        .then((data) => {
            background(0);
            translate(width / 2, height / 2);

            stroke(0, 255, 0);
            line(-width / 2, 0, width / 2, 0);
            line(0, -height / 2, 0, height / 2);

            noFill();
            arc(0, 0, 250, 250, PI, 0);

            let steering = data.data[0];
            steering = map(steering, -1, 1, -angleLimit, angleLimit);
            rotate(steering);
            drawArrow(createVector(0, 0), createVector(0, -100), color(255));

            let turn = "";
            if (steering > 0) turn = "Right";
            else if (steering < 0) turn = "Left";
            else turn = "Straight";

            stats.innerHTML = `
                    <p>Simulator Online: ${true} </p>
                    <p>Steering: ${steering.toFixed(3)} </p>
                    <p>Turn ${turn} </p>`;
        });
}
