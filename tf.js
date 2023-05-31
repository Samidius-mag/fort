const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

async function trainModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [4], units: 5, activation: 'sigmoid' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

  const xs = tf.tensor2d(data.slice(0, -1).map(candle => [candle.open, candle.high, candle.low, candle.close]));
  const ys = tf.tensor2d(data.slice(1).map(candle => [candle.close > candle.open ? 1 : 0]));

  await model.fit(xs, ys, { epochs: 100 });

  await model.save('model.json');
}

async function predictNextCandleMovement() {
  const model = await tf.loadLayersModel('model.json');

  const lastCandle = data[data.length - 2];
  const input = tf.tensor2d([[lastCandle.open, lastCandle.high, lastCandle.low, lastCandle.close]]);

  const output = model.predict(input);
  const prediction = Array.from(output.dataSync())[0];

  if (prediction > 0.5) {
    console.log('Следующая свеча движется вверх');
  } else {
    console.log('Следующая свеча движется вниз');
  }
}

trainModel().then(predictNextCandleMovement);