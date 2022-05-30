var io = require("socket.io")();
var tf = require("@tensorflow/tfjs-node");
var http = require("http");

var modelName = "jsModel_Track01_v1";
var SIMULATOR_PORT = 4567;
var maxSpeed = 30;

// WEB SERVER FOR FRONTEND DATA
const WEB_PORT = 8080;
const WEB_HOST = "localhost";

let isConnected = false;
let modelResponse = [];

const requestListener = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            isConnected: isConnected,
            data: modelResponse,
        })
    );
};

const server = http.createServer(requestListener);
server.listen(WEB_PORT, WEB_HOST, () => {
    console.log(`Server is running on http://${WEB_HOST}:${WEB_PORT}`);
});

// DEEPLEARNING TENSORFLOW MODEL AND CONTROLLER
tf.loadLayersModel(`file://${modelName}/model.json`).then((model) => {
    console.log("Model loaded");
    console.log("Searching for simulator...");
    io.on("connection", (socket) => {
        console.log("====================");
        console.log("=====Connected======");
        console.log("====================");
        isConnected = true;

        socket.on("telemetry", (telemetry) => {
            if (!telemetry) return;
            tf.tidy(() => {
                const imageBuffer = Buffer.from(telemetry.image, "base64");
                const imageTensor = tf.node
                    .decodeJpeg(imageBuffer)
                    .div(255)
                    .reshape([1, 160, 320, 3]);
                const steering = model
                    .predict(imageTensor)
                    .squeeze()
                    .arraySync();

                const throttle = 1 - telemetry.speed / maxSpeed;

                modelResponse = [steering, throttle];

                socket.emit("steer", {
                    steering_angle: String(steering),
                    throttle: String(throttle),
                });
            });
        });
    });

    io.listen(SIMULATOR_PORT);
});
