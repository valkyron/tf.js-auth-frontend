// import * as tf from '@tensorflow/tfjs';
const fs = require('fs');
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var lastX, lastY;
var shapeResult = document.getElementById("shapeResult");

async function loadModel() {
// const modelData = 'data:application/octet-stream;base64,...'; // Replace with your base64-encoded model data

// // Decode the base64 data into an ArrayBuffer
// const decodedData = Uint8Array.from(atob(modelData.split(',')[1]), c => c.charCodeAt(0)).buffer;

    // Read the base64-encoded model data from a file
    const modelData = fs.readFileSync('model.txt', 'utf-8');

    // Decode the base64 data into an ArrayBuffer
    const decodedData = Uint8Array.from(atob(modelData.split(',')[1]), c => c.charCodeAt(0)).buffer;

    // Load the model using the decoded data
    tf.loadLayersModel(tf.io.browserFiles([{
    name: 'model',
    data: decodedData
    }])).then(model => {
    // Model loaded successfully, do inference here
    }).catch(err => {
    console.error('Failed to load model:', err);
    });

    // const model = await tf.loadLayersModel('drawing_classification.h5');
    return model;
  }

canvas.addEventListener("mousedown", function (e) {
    isDrawing = true;
    lastX = e.clientX - canvas.offsetLeft;
    lastY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("mousemove", function (e) {
    if (isDrawing) {
        var x = e.clientX - canvas.offsetLeft;
        var y = e.clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener("mouseup", function (e) {
    isDrawing = false;
    detectShape();
});

function clearCanvas() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

async function detectShape() {
    var canvas = document.getElementById('canvas');
    // const imgData = canvas.toDataURL('image/png');
    // const tensor = tf.browser.fromPixels(imgData);

    // Get the image data from the canvas
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Convert the image data to a Float32Array
    const data = new Float32Array(imageData.data);

    // Create a tensor from the data
    const tensor = tf.tensor(data, [canvas.height, canvas.width, 4]);

    // Load the model
    const model = await loadModel();

    // Make a prediction using the model
    const prediction = model.predict(tensor);
    console.log(prediction);
    // // Get the predicted shape
    // const shape = prediction.argMax().dataSync();
    // let mat = cv.matFromArray(imgData.height, imgData.width, cv.CV_8UC4, imgData.data);
    // console.log(mat)
    // Load the model
    // Preprocess the image
    // const tensor = tf.browser.fromPixels(imagedata).toFloat().expandDims();


    // const model = await tf.loadLayersModel('path/to/model.json');

    // // Get the canvas element
    // const canvas = document.getElementById('canvas');

    // // Get the canvas data
    // const imgData = canvas.toDataURL('image/png');

    // // Create a tensor from the canvas data
    // const tensor = tf.browser.fromPixels(canvas);

    // // Make a prediction using the model
    // const prediction = model.predict(tensor);

    // // Get the predicted shape
    // const shape = prediction.argMax().dataSync();

    // // Display the predicted shape
    // if (shape === 0) {
    // console.log('The shape is a square');
    // } else if (shape === 1) {
    // console.log('The shape is a circle');
    // } else if (shape === 2) {
    // console.log('The shape is a triangle');
    // }

    // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // var data = imageData.data;

    // var pixelCount = 0;
    // var redCount = 0;
    // var greenCount = 0;
    // var blueCount = 0;

    // for (var i = 0; i < data.length; i += 4) {
    //     if (data[i + 3] > 0) {
    //         pixelCount++;
    //         redCount += data[i];
    //         greenCount += data[i + 1];
    //         blueCount += data[i + 2];
    //     }
    // }

    // var redAverage = redCount / pixelCount;
    // var greenAverage = greenCount / pixelCount;
    // var blueAverage = blueCount / pixelCount;

    // var color = "rgb(" + Math.round(redAverage) + "," + Math.round(greenAverage) + "," + Math.round(blueAverage) + ")";

    // if (color === "rgb(255,0,0)") {
    //     shapeResult.innerHTML = "Circle detected!";
    // } else if (color === "rgb(0,128,0)") {
    //     shapeResult.innerHTML = "Square detected!";
    // } else if (color === "rgb(0,0,255)") {
    //     shapeResult.innerHTML = "Triangle detected!";
    // } else {
    //     shapeResult.innerHTML = "Sorry, the shape could not be detected. Please try again.";
    // }
}
