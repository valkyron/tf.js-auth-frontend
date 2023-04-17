const fs = require('fs');

// Read the h5 model file
const modelData = fs.readFileSync('drawing_classification.h5');

// Convert the binary model data to a Base64-encoded string
const base64ModelData = Buffer.from(modelData).toString('base64');

// Save the Base64-encoded model data to a file
fs.writeFileSync('model.txt', base64ModelData);

// Print the encoded model data
console.log(base64ModelData);
