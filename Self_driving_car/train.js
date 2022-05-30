const fs = require("fs");
const linesCount = require("file-lines-count");
const csv = require("csv-parser");
const tf = require("@tensorflow/tfjs-node");

const CSV_Path = "../data/SimulatorData_Track01_v1/driving_log.csv";
const Image_Path = "../data/SimulatorData_Track01_v1/IMG/";

async function* dataGenerator() {
    while (true) {
        const csvStream = fs.createReadStream(CSV_Path).pipe(
            csv({
                headers: [
                    "center",
                    "left",
                    "right",
                    "steering",
                    "throttle",
                    "brake",
                    "speed",
                ],
                mapValues: ({ value }) => value.trim(),
            })
        );

        for await (const { center, left, right, steering } of csvStream) {
            let center_img_path = Image_Path + center.split("\\").pop();
            let left_img_path = Image_Path + left.split("\\").pop();
            let right_img_path = Image_Path + right.split("\\").pop();

            const centerImageBuffer = fs.promises.readFile(center_img_path);
            const leftImageBuffer = fs.promises.readFile(left_img_path);
            const rightImageBuffer = fs.promises.readFile(right_img_path);

            const offset = 0.333;

            yield [await centerImageBuffer, Number(steering)];
            yield [await leftImageBuffer, Number(steering) + offset];
            yield [await rightImageBuffer, Number(steering) - offset];
        }
        csvStream.destroy();
    }
}

async function getModel() {
    let model = tf.sequential({
        layers: [
            tf.layers.cropping2D({
                cropping: [
                    [75, 25],
                    [0, 0],
                ],
                inputShape: [160, 320, 3],
            }),
            tf.layers.conv2d({
                filters: 16,
                kernelSize: [3, 3],
                strides: [2, 2],
                activation: "relu",
            }),
            tf.layers.maxPool2d({ poolSize: [2, 2] }),
            tf.layers.conv2d({
                filters: 32,
                kernelSize: [3, 3],
                strides: [2, 2],
                activation: "relu",
            }),
            tf.layers.maxPool2d({ poolSize: [2, 2] }),
            tf.layers.flatten(),
            tf.layers.dense({ units: 1024, activation: "relu" }),
            tf.layers.dropout({ rate: 0.25 }),
            tf.layers.dense({ units: 128, activation: "relu" }),
            tf.layers.dense({ units: 1, activation: "linear" }),
        ],
    });

    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    return model;
}

(async function () {
    const epochs = 10;
    const batchSize = 256;

    const dataset = tf.data
        .generator(dataGenerator)
        .map(([imageBuffer, steering]) => {
            const xs = tf.node.decodeJpeg(imageBuffer).div(255);
            const ys = tf.tensor1d([steering]);
            return { xs, ys };
        })
        .shuffle(batchSize)
        .batch(batchSize);

    const model = await getModel();

    const totalSamples = (await linesCount(CSV_Path)) * 3;

    await model.fitDataset(dataset, {
        epochs,
        batchesPerEpoch: Math.floor(totalSamples / batchSize),
    });

    await model.save("file://./jsModel_Track01_v1");

    console.log("======================");
    console.log("Model saved");
    console.log("======================");
})();
