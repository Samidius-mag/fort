const fs = require('fs');
const tf = require('@tensorflow/tfjs');

const rawData = fs.readFileSync('emamares.json');
const data = JSON.parse(rawData);

const trainingData = data.map(item => ({
  ema200: item.ema200,
  ma200: item.ma200,
  ema5: item.ema5,
  direction: item.direction === 'up' ? 0 : 1,
}));
const inputTensor = tf.tensor2d(trainingData.map(item => [item.ema200, item.ma200, item.ema5]));
const outputTensor = tf.tensor2d(trainingData.map(item => [item.direction]));

const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [3], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

(async () => {
  const history = await model.fit(inputTensor, outputTensor, { epochs: 100 });
  console.log('Training completed');
  const ema200Value = 100;
  const ma200Value = 90;
  const ema5Value = 95;
  const predictionTensor = model.predict(tf.tensor2d([[ema200Value, ma200Value, ema5Value]]));
  const prediction = predictionTensor.dataSync()[0];
  console.log(`Prediction: ${prediction > 0.5 ? 'down' : 'up'}`);
})();