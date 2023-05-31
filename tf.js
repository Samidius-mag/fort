const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const interval = 4; // интервал в часах
const input = []; // массивы данных для обучения нейросети
const output = []; // массивы выходных данных

for (let i = 0; i < data.length - interval - 1; i++) {
  const inputRow = [];
  for (let j = i; j < i + interval; j++) {
    const candle = data[j];
    inputRow.push(
      candle.open,
      candle.high,
      candle.low,
      candle.close,
      candle.volume
    );
  }
  input.push(inputRow);

  const currentPrice = data[i + interval].close;
  const futurePrice = data[i + interval + 1].close;
  const trend = futurePrice > currentPrice ? 1 : futurePrice < currentPrice ? -1 : 0;
  output.push(trend);
}

const model = tf.sequential();

// добавляем первый слой с двумя нейронами и функцией активации relu
model.add(tf.layers.dense({
  inputShape: [interval * 5], // количество параметров на входе (interval * 5, где interval - интервал в часах)
  units: 2, // количество нейронов в слое
  activation: 'relu' // функция активации
}));

// добавляем второй слой с тремя нейронами и функцией активации softmax
model.add(tf.layers.dense({
  units: 3, // количество нейронов в слое
  activation: 'softmax' // функция активации
}));

model.compile({
  optimizer: 'adam',
  loss: 'sparseCategoricalCrossentropy',
  metrics: ['accuracy']
});

const epochs = 10;
const batchSize = 32;

model.fit(tf.tensor2d(input), tf.tensor1d(output), {
  epochs: epochs,
  batchSize: batchSize
}).then(() => {
  console.log('Training complete');
  
});