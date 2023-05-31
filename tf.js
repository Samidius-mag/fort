const fs = require('fs');
const tf = require('@tensorflow/tfjs');
const tfvis = require('@tensorflow/tfjs-vis');

const data = JSON.parse(fs.readFileSync('price.json'));

const input = data.slice(0, -1).map(candle => [
  candle.open,
  candle.high,
  candle.low,
  candle.close,
  candle.volume,
]);

const output = data.slice(1).map(candle => [
  candle.open > candle.close ? 0 : 1,
]);

const model = tf.sequential();

model.add(tf.layers.dense({
  inputShape: [5],
  activation: 'relu',
  units: 32,
}));

model.add(tf.layers.dense({
  activation: 'sigmoid',
  units: 1,
}));

model.compile({
  optimizer: tf.train.adam(),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy'],
});

const batchSize = 32;
const epochs = 50;

model.fit(tf.tensor2d(input), tf.tensor2d(output), {
  batchSize,
  epochs,
  shuffle: true,
  callbacks: tfvis.show.fitCallbacks(
    { name: 'Training Performance' },
    ['loss', 'acc'],
    { height: 200, callbacks: ['onEpochEnd'] },
  ),
}).then(() => {
  const lastCandle = data[data.length - 1];
  const inputTensor = tf.tensor2d([[
    lastCandle.open,
    lastCandle.high,
    lastCandle.low,
    lastCandle.close,
    lastCandle.volume,
  ]]);

  const prediction = model.predict(inputTensor);
  const direction = prediction.dataSync()[0] > 0.5 ? 'up' : 'down';

  console.log(`Next candle will go ${direction}`);
});