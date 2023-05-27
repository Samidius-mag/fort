async function run() {
  const tf = require('@tensorflow/tfjs-node');
  const { calculateRecommendation, calculateEntryExitPoints } = require('./logic');

  const priceData = require('./price.json');
  const indResData = require('./indres.json');

  const priceTensor = tf.tensor(priceData);
  const indResTensor = tf.tensor(indResData);

  const model = tf.sequential();

  model.add(tf.layers.dense({ units: 64, inputShape: [priceData.length, indResData.length], activation: 'relu' }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 4, activation: 'softmax' }));

  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  const epochs = 100;
  const batchSize = 32;

  const xTrain = priceTensor;
  const yTrain = indResTensor;

  await model.fit(xTrain, yTrain, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tf.node.tensorBoard('./logs')
  });

  const predictions = model.predict(priceTensor);

  const recommendation = calculateRecommendation(priceData, predictions.arraySync());
  const currentRecommendation = recommendation[recommendation.length - 1];
  const entryExitPoints = calculateEntryExitPoints(priceData, predictions.arraySync());
  const currentEntryExitPoints = entryExitPoints[entryExitPoints.length - 1];

  console.log(`Текущий тренд: ${currentRecommendation.trend}`);
  console.log(`Текущий уровень поддержки: ${currentRecommendation.support}, текущий уровень сопротивления: ${currentRecommendation.resistance}`);
  console.log(`Рекомендация: ${currentRecommendation.recommendation}`);
  console.log(`Точки входа-выхода в сделку: Вход - ${currentEntryExitPoints.entry}, Выход - ${currentEntryExitPoints.exit}`);
}

run();
