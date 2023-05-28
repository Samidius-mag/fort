// Шаг 1: Загрузка данных
const data = require('./indres.json');
const indicators = Object.keys(data);
const values = Object.values(data);
const timeSteps = values[0].length;

// Преобразование данных в формат, который может быть использован для обучения нейросети
const input = [];
const output = [];
for (let i = 0; i < timeSteps - 1; i++) {
  const x = [];
  for (let j = 0; j < indicators.length; j++) {
    x.push(values[j][i]);
  }
  input.push(x);
  output.push(values[0][i + 1]);
}

// Шаг 2: Разделение данных на обучающую и тестовую выборки
const splitIndex = Math.floor(input.length * 0.8);
const xTrain = input.slice(0, splitIndex);
const yTrain = output.slice(0, splitIndex);
const xTest = input.slice(splitIndex);
const yTest = output.slice(splitIndex);

// Шаг 3: Создание модели нейросети
const model = tf.sequential();
model.add(tf.layers.lstm({ units: 64, inputShape: [indicators.length] }));
model.add(tf.layers.dense({ units: 1 }));

// Шаг 4: Обучение модели на обучающей выборке
model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });
model.fit(tf.tensor2d(xTrain), tf.tensor1d(yTrain), { epochs: 100 });

// Шаг 5: Оценка качества модели на тестовой выборке
const yPred = model.predict(tf.tensor2d(xTest)).dataSync();
const mae = tf.metrics.meanAbsoluteError(tf.tensor1d(yTest), tf.tensor1d(yPred)).dataSync();
console.log(`MAE: ${mae}`);

// Шаг 6: Использование обученной модели для предсказания будущей цены
const newX = [values.map(v => v[timeSteps - 1])];
const newY = model.predict(tf.tensor2d(newX)).dataSync();
console.log(`Predicted price: ${newY[0]}`);
