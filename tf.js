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

const rawIndicators = fs.readFileSync('indres.json');
const indicators = JSON.parse(rawIndicators);

// Проверка на тип переменной
if (!Array.isArray(indicators)) {
  throw new Error('Indicators data is not an array');
}

// Преобразование даты и значения индикатора
const cleanIndicators = indicators.map(item => ({
  date: new Date(item.date),
  value: parseFloat(item.value),
}));

// Замена NaN на среднее значение по столбцу
const values = cleanIndicators.map(item => item.value).filter(value => !isNaN(value));
const meanValue = values.reduce((sum, value) => sum + value, 0) / values.length;

const cleanData = cleanIndicators.map(item => ({
  date: item.date,
  value: isNaN(item.value) ? meanValue : item.value,
}));

// Объединение данных
const mergedData = data.map((candle, index) => ({
  ...candle,
  ...indicators[index],
}));

// Подготовка данных
const prices = mergedData.map(candle => candle.close);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
const normalizedPrices = prices.map(price => (price - minPrice) / (maxPrice - minPrice));

const windowSize = 720;
const input = [];
const output = [];

// Дополнительный код для формирования входных и выходных данных



for (let i = 0; i < normalizedPrices.length - windowSize; i++) {
  const window = normalizedPrices.slice(i, i + windowSize);
  const targetIndex = i + windowSize;

  input.push([
    ...window,
    mergedData[targetIndex].RSI,
    mergedData[targetIndex].EMA,
    mergedData[targetIndex].ROC,
    mergedData[targetIndex].BollingerBands,
    mergedData[targetIndex].OBV,
    mergedData[targetIndex].PSAR,
    mergedData[targetIndex].WMA,
  ]);

  const futurePrice1h = normalizedPrices[targetIndex + 1];
  const futurePrice4h = normalizedPrices[targetIndex + 4];
  const futurePrice12h = normalizedPrices[targetIndex + 12];
  const futurePrice24h = normalizedPrices[targetIndex + 24];

  output.push([
    futurePrice1h,
    futurePrice4h,
    futurePrice12h,
    futurePrice24h,
  ]);
}

// Обучение нейросети



const model = tf.sequential();

model.add(tf.layers.dense({
  inputShape: [windowSize + 7],
  units: 64,
  activation: 'relu',
}));

model.add(tf.layers.dense({
  units: 4,
  activation: 'linear',
}));

model.compile({
  optimizer: tf.train.adam(),
  loss: 'meanSquaredError',
});

const xs = tf.tensor2d(input);
const ys = tf.tensor2d(output);

model.fit(xs, ys, {
  epochs: 100,
  shuffle: true,
  validationSplit: 0.2,
}).then(() => {
  // Получение прогнозов
  const lastWindow = normalizedPrices.slice(-windowSize);
  const lastIndicators = mergedData.slice(-1)[0];

  const input = [
    ...lastWindow,
    lastIndicators.RSI,
    lastIndicators.EMA,
    lastIndicators.ROC,
    lastIndicators.BollingerBands,
    lastIndicators.OBV,
    lastIndicators.PSAR,
    lastIndicators.WMA,
  ];

  const prediction = model.predict(tf.tensor2d([input]));
  const predictionData = prediction.dataSync();

  const denormalizedPrediction = predictionData.map(price => price * (maxPrice - minPrice) + minPrice);

  console.log('Прогноз цены на следующие 1, 4, 12 и 24 часа:', denormalizedPrediction);
});
