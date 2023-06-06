const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');

const rawData = fs.readFileSync('emamares.json');
const data = JSON.parse(rawData);

const trainingData = data.map(item => ({
  ema200: item.ema200,
  ma200: item.ma200,
  ema5: item.ema5,
  direction: item.direction === 'up' ? 0 : 1,
  close: item.close,
}));

const ema200Values = trainingData.map(item => item.ema200);
const ma200Values = trainingData.map(item => item.ma200);
const ema5Values = trainingData.map(item => item.ema5);
const closeValues = trainingData.map(item => item.close);
const ema200Mean = tf.mean(tf.tensor1d(ema200Values));
const ema200Std = tf.std(tf.tensor1d(ema200Values));
const ma200Mean = tf.mean(tf.tensor1d(ma200Values));
const ma200Std = tf.std(tf.tensor1d(ma200Values));
const ema5Mean = tf.mean(tf.tensor1d(ema5Values));
const ema5Std = tf.std(tf.tensor1d(ema5Values));
const closeMean = tf.mean(tf.tensor1d(closeValues));
const closeStd = tf.std(tf.tensor1d(closeValues));
const normalizedTrainingData = trainingData.map(item => ({
  ema200: (item.ema200 - ema200Mean) / ema200Std,
  ma200: (item.ma200 - ma200Mean) / ma200Std,
  ema5: (item.ema5 - ema5Mean) / ema5Std,
  close: (item.close - closeMean) / closeStd,
  direction: item.direction,
}));

const inputTensor = tf.tensor2d(normalizedTrainingData.map(item => [item.ema200, item.ma200, item.ema5, item.close]));
const outputTensor = tf.tensor2d(normalizedTrainingData.map(item => [item.direction]));

const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [4], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

(async () => {
  const history = await model.fit(inputTensor, outputTensor, { epochs: 100 });
  console.log('Training completed');
  const ema200Value = 100;
  const ma200Value = 90;
  const ema5Value = 95;
  const closeValue = 105;
  const normalizedInputTensor = tf.tensor2d([[ema200Value, ma200Value, ema5Value, closeValue]])
    .sub(tf.tensor2d([[ema200Mean, ma200Mean, ema5Mean, closeMean]]))
    .div(tf.tensor2d([[ema200Std, ma200Std, ema5Std, closeStd]]));
  const predictionTensor = model.predict(normalizedInputTensor);
  const prediction = predictionTensor.dataSync()[0];
  const denormalizedCloseValue = closeValue * closeStd + closeMean;
  const forecastedCloseValue = prediction > 0.5 ? denormalizedCloseValue * 0.95 : denormalizedCloseValue * 1.05;
  console.log(`Prediction: ${prediction > 0.5 ? 'down' : 'up'}`);
  console.log(`Forecasted close value: ${forecastedCloseValue}`);
})();