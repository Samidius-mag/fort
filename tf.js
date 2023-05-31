const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
const candles = data.slice(0, -2);

async function predictNextCandleMovement() {
  const model = await tf.loadLayersModel('model.json');

  const lastCandle = candles[candles.length - 1];
  const input = tf.tensor2d([[lastCandle.open, lastCandle.high, lastCandle.low, lastCandle.close]]);

  const output = model.predict(input);
  const prediction = Array.from(output.dataSync())[0];

  if (prediction > 0.5) {
    console.log('Следующая свеча движется вверх');
  } else {
    console.log('Следующая свеча движется вниз');
  }
}

predictNextCandleMovement();