const fs = require('fs');
const tf = require('@tensorflow/tfjs');

// Загрузка данных из файла
const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

// Подготовка данных для обучения модели
const input = [];
const output = [];

for (let i = 0; i < data.length - 1; i++) {
  const current = data[i];
  const next = data[i + 1];

  // Создание входных данных
  const inputRow = [
    current.open,
    current.high,
    current.low,
    current.close,
    current.volume
  ];

  // Создание выходных данных
  const outputRow = [
    next.close > current.close ? 1 : 0,
    next.close < current.close ? 1 : 0
  ];

  input.push(inputRow);
  output.push(outputRow);
}

// Преобразование данных в тензоры
const xs = tf.tensor2d(input);
const ys = tf.tensor2d(output);

// Создание модели
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [5], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 2, activation: 'softmax' }));

// Компиляция модели
model.compile({ loss: 'categoricalCrossentropy', optimizer: 'adam' });

// Обучение модели
model.fit(xs, ys, { epochs: 100 })
  .then(() => {
    console.log('Модель обучена!');
  });

  // Создание новых данных для предсказания
const newInput = [
  [100, 120, 80, 110, 1000],
  [110, 130, 90, 120, 1200],
  [120, 140, 100, 130, 1500]
];

// Преобразование новых данных в тензор
const newInputTensor = tf.tensor2d(newInput);

// Получение предсказания для новых данных
const prediction = model.predict(newInputTensor);

// Вывод предсказания в консоль
prediction.print();