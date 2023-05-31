const tf = require('@tensorflow/tfjs');
const fs = require('fs');

const interval = 24; // количество часов в интервале
const dataFile = 'price.json'; // файл с данными
const predFile = 'pred.json'; // файл с результатами предсказания

// Чтение данных из JSON файла
const rawData = fs.readFileSync(dataFile);
const data = JSON.parse(rawData);

// Создание массивов входных и выходных данных
const input = [];
const output = [];

for (let i = 0; i < data.length - interval; i++) {
  const inputRow = [];
  for (let j = i; j < i + interval; j++) {
    inputRow.push(parseFloat(data[j].price_change));
    inputRow.push(parseFloat(data[j].volume));
  }
  input.push(inputRow);

  const nextPrice = parseFloat(data[i + interval].price);
  const currentPrice = parseFloat(data[i + interval - 1].price);
  if (nextPrice > currentPrice) {
    output.push(0);
  } else {
    output.push(1);
  }
}

// Создание модели нейросети
const model = tf.sequential();

model.add(tf.layers.dense({
  inputShape: [interval * 2],
  units: 32,
  activation: 'relu'
}));

model.add(tf.layers.dense({
  units: 2,
  activation: 'softmax'
}));

// Компиляция модели нейросети
model.compile({
  optimizer: 'sgd',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy']
});

// Обучение модели нейросети
const epochs = 100;
const batchSize = 32;

model.fit(tf.tensor2d(input), tf.oneHot(tf.tensor1d(output, 'int32'), 2), {
  epochs: epochs,
  batchSize: batchSize
}).then(() => {
  console.log('Training complete');

  // Получение предсказания направления следующей часовой свечи
  const lastInput = input[input.length - 1];
  const prediction = model.predict(tf.tensor2d([lastInput]));
  const direction = prediction.argMax(1).dataSync()[0];

  // Сохранение результата предсказания в файл
  let predData = [];
  if (fs.existsSync(predFile)) {
    const rawPredData = fs.readFileSync(predFile);
    predData = JSON.parse(rawPredData);
  }
  predData.push({
    date: new Date(),
    direction: direction
  });
  fs.writeFileSync(predFile, JSON.stringify(predData));

  if (direction === 0) {
    console.log('Next candle will go up');
  } else {
    console.log('Next candle will go down');
  }
});