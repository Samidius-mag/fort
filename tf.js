const tf = require('@tensorflow/tfjs-node');
const priceData = require('./price.json');
const indRes = require('./indres.json');

const prices = priceData.map(candle => parseFloat(candle.close));
const input = [
  indRes.RSI.slice(0, -24),
  indRes.EMA.slice(0, -24),
  indRes.ROC.slice(0, -24),
  indRes.BollingerBands.slice(band => band.upper).slice(0, -24),
  indRes.BollingerBands.slice(band => band.lower).slice(0, -24),
  indRes.OBV.slice(0, -24),
  indRes.WMA.slice(0, -24),
];
const output = prices.slice(24);

const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [input.length], activation: 'relu' }));
model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

const xs = tf.tensor2d(input);
const ys = tf.oneHot(tf.tensor1d(output.map(price => {
  if (price > prices[prices.length - 25]) {
    return 0;
  } else if (price > prices[prices.length - 25] * 0.995) {
    return 1;
  } else if (price > prices[prices.length - 25] * 0.99) {
    return 2;
  } else {
    return 3;
  }
}), 'int32'), 4);

(async () => {
  await model.fit(xs, ys, { epochs: 100 });
  const prediction = model.predict(tf.tensor2d(input.slice(-1)));
  const predictionValues = prediction.dataSync();
  console.log('Prediction:', predictionValues);
})();
