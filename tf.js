const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const priceData = JSON.parse(fs.readFileSync('./price.json'));
const indRes = JSON.parse(fs.readFileSync('./indres.json'));
const { calculateSupportResistance, calculateOverboughtOversold, calculateEntryExitPoints, calculateRecommendation } = require('./logic');
function prepareData(priceData, indRes) {
  const data = [];

  // Текущая цена
  const currentPrice = parseFloat(priceData[priceData.length - 1].close);
  data.push(currentPrice);

  // Тренд
  const trend = {
    current: currentPrice > indRes.EMA[indRes.EMA.length - 1] ? 'Восходящий' : 'Нисходящий',
    global: priceData[0].close > indRes.EMA[indRes.EMA.length - 1] ? 'Восходящий' : 'Нисходящий',
    '4h': priceData[priceData.length - 5].close > indRes.EMA4[indRes.EMA4.length - 1] ? 'Восходящий' : 'Нисходящий',
    '12h': priceData[priceData.length - 13].close > indRes.EMA12[indRes.EMA12.length - 1] ? 'Восходящий' : 'Нисходящий',
    '24h': priceData[priceData.length - 25].close > indRes.EMA24[indRes.EMA24.length - 1] ? 'Восходящий' : 'Нисходящий',
  };
  data.push(trend.current, trend.global, trend['4h'], trend['12h'], trend['24h']);

  // Уровни поддержки и сопротивления
  const supportResistance = calculateSupportResistance(priceData);
  const currentSupportResistance = supportResistance[supportResistance.length - 1];
  const supportResistance4h = supportResistance[supportResistance.length - 5];
  const supportResistance12h = supportResistance[supportResistance.length - 13];
  const supportResistance24h = supportResistance[supportResistance.length - 25];
  data.push(currentPrice, currentSupportResistance.support, currentSupportResistance.resistance, supportResistance4h.support, supportResistance4h.resistance, supportResistance12h.support, supportResistance12h.resistance, supportResistance24h.support, supportResistance24h.resistance);

  // Перекупленность/перепроданность рынка
  const overboughtOversold = calculateOverboughtOversold(priceData);
  const currentOverboughtOversold = overboughtOversold[overboughtOversold.length - 1];
  const overboughtOversold4h = overboughtOversold[overboughtOversold.length - 5];
  const overboughtOversold12h = overboughtOversold[overboughtOversold.length - 13];
  const overboughtOversold24h = overboughtOversold[overboughtOversold.length - 25];
  data.push(currentOverboughtOversold, overboughtOversold4h, overboughtOversold12h, overboughtOversold24h);

  // Рекомендации с точками входа-выхода в сделку
  const entryExitPoints = calculateEntryExitPoints(priceData, indRes);
  const currentEntryExitPoints = entryExitPoints[entryExitPoints.length - 1];
  const entryExitPoints4h = entryExitPoints[entryExitPoints.length - 5];
  const entryExitPoints12h = entryExitPoints[entryExitPoints.length - 13];
  const entryExitPoints24h = entryExitPoints[entryExitPoints.length - 25];
  data.push(currentEntryExitPoints.entry, currentEntryExitPoints.exit, entryExitPoints4h.entry, entryExitPoints4h.exit, entryExitPoints12h.entry, entryExitPoints12h.exit, entryExitPoints24h.entry, entryExitPoints24h.exit);

  // Рекомендации о покупке и продаже
  const recommendation = calculateRecommendation(priceData, indRes);
  const currentRecommendation = recommendation[recommendation.length - 1];
  const recommendation4h = recommendation[recommendation.length - 5];
  const recommendation12h = recommendation[recommendation.length - 13];
  const recommendation24h = recommendation[recommendation.length - 25];
  data.push(currentRecommendation, recommendation4h, recommendation12h, recommendation24h);

  return data;
}

async function trainModel() {
  const model = await tf.loadLayersModel('file://./model/model.json');

  const xs = [];
  const ys = [];

  for (let i = 25; i < priceData.length; i++) {
    const data = prepareData(priceData.slice(0, i), indRes);
    const label = priceData[i].close > priceData[i - 1].close ? 1 : 0;

    xs.push(data);
    ys.push(label);
  }

  const xsTensor = tf.tensor2d(xs);
  const ysTensor = tf.tensor1d(ys);

  await model.fit(xsTensor, ysTensor, {
    epochs: 10,
    shuffle: true,
  });

  return model;
}

trainModel().then((model) => {
  const data = prepareData(priceData, indRes);
  const prediction = model.predict(tf.tensor2d([data])).dataSync()[0];

  console.log(`Текущий тренд: ${data[1]}`);
  console.log(`Текущий уровень поддержки: ${data[4]}, текущий уровень сопротивления: ${data[5]}`);
  console.log(`Рекомендация: ${data[21] === 1 ? 'Покупать' : 'Продавать'}`);
  console.log(`Точки входа-выхода в сделку: Вход - ${data[22]}, Выход - ${data[23]}`);
});
