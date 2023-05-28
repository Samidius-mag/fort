const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData).map(candle => ({
  open: parseFloat(candle.open),
  high: parseFloat(candle.high),
  low: parseFloat(candle.low),
  close: parseFloat(candle.close),
  volume: parseFloat(candle.volume),
}));

const indresRawData = fs.readFileSync('indres.json');
const indresData = JSON.parse(indresRawData);

const combinedData = data.map((candle, index) => ({
  ...candle,
  ...indresData[index],
}));

for (let i = 0; i < normalizedPrices.length - windowSize; i++) {
  const inputWindow = combinedData.slice(i, i + windowSize);
  const outputWindow = normalizedPrices.slice(i + windowSize, i + windowSize + 1);
  input.push(inputWindow);
  output.push(outputWindow);
}
const model = tf.sequential();
model.add(tf.layers.dense({ units: 64, inputShape: [windowSize, 8], activation: 'relu' }));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

const xs = tf.tensor(input);
const ys = tf.tensor(output);

model.fit(xs, ys, { epochs: 50 }).then(() => {
  // Прогноз цены на следующие 1, 4, 12 и 24 часа
  const lastWindow = combinedData.slice(-windowSize);
  const normalizedLastWindow = lastWindow.map(candle => ({
    open: (candle.open - minPrice) / (maxPrice - minPrice),
    high: (candle.high - minPrice) / (maxPrice - minPrice),
    low: (candle.low - minPrice) / (maxPrice - minPrice),
    close: (candle.close - minPrice) / (maxPrice - minPrice),
    volume: candle.volume,
    ...candle.indres,
  }));
  const inputTensor = tf.tensor([normalizedLastWindow]);
  const prediction1h = model.predict(inputTensor).dataSync()[0] * (maxPrice - minPrice) + minPrice;
  const prediction4h = model.predict(inputTensor.reshape([1, windowSize * 4, 8])).dataSync()[0] * (maxPrice - minPrice) + minPrice;
  const prediction12h = model.predict(inputTensor.reshape([1, windowSize * 12, 8])).dataSync()[0] * (maxPrice - minPrice) + minPrice;
  const prediction24h = model.predict(inputTensor.reshape([1, windowSize * 24, 8])).dataSync()[0] * (maxPrice - minPrice) + minPrice;
  console.log(`Прогноз цены на следующие 1 час: ${prediction1h}`);
  console.log(`Прогноз цены на следующие 4 часа: ${prediction4h}`);
  console.log(`Прогноз цены на следующие 12 часов: ${prediction12h}`);
  console.log(`Прогноз цены на следующие 24 часа: ${prediction24h}`);
});
