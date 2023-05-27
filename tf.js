const fs = require('fs');
const moment = require('moment');
const tf = require('@tensorflow/tfjs');

const priceData = require('./price.json');
const indRes = require('./indres.json');
const ind = require('./ind');

// Загрузка модели нейросети
async function loadModel() {
  const model = await tf.loadLayersModel('file://./model/model.json');
  return model;
}

// Подготовка данных для использования в нейросети
function prepareData() {
  const data = [];

  // Добавление текущей цены
  const currentPrice = parseFloat(priceData[priceData.length - 1].close);
  data.push(currentPrice);

  // Добавление тренда
  const trend = {
    current: currentPrice > indRes.EMA[indRes.EMA.length - 1] ? 'Восходящий' : 'Нисходящий',
    global: priceData[0].close > priceData[priceData.length - 1].close ? 'Нисходящий' : 'Восходящий',
    '4h': priceData[priceData.length - 1].close > priceData[priceData.length - 7].close ? 'Восходящий' : 'Нисходящий',
    '12h': priceData[priceData.length - 1].close > priceData[priceData.length - 25].close ? 'Восходящий' : 'Нисходящий',
    '24h': priceData[priceData.length - 1].close > priceData[priceData.length - 49].close ? 'Восходящий' : 'Нисходящий'
  };
  data.push(trend.current === 'Восходящий' ? 1 : 0);
  data.push(trend.global === 'Восходящий' ? 1 : 0);
  data.push(trend['4h'] === 'Восходящий' ? 1 : 0);
  data.push(trend['12h'] === 'Восходящий' ? 1 : 0);
  data.push(trend['24h'] === 'Восходящий' ? 1 : 0);

  // Добавление уровней поддержки и сопротивления
  const supportResistance = {
    current: {
      support: parseFloat(indRes.BollingerBands.lower[indRes.BollingerBands.lower.length - 1]),
      resistance: parseFloat(indRes.BollingerBands.upper[indRes.BollingerBands.upper.length - 1])
    },
    '4h': {
      support: parseFloat(Math.min(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.low)))),
      resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.high))))
    },
    '12h': {
      support: parseFloat(Math.min(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.low)))),
      resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.high))))
    },
    '24h': {
      support: parseFloat(Math.min(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.low)))),
      resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.high))))
    }
  };
  data.push((currentPrice - supportResistance.current.support) / (supportResistance.current.resistance - supportResistance.current.support));
  data.push((currentPrice - supportResistance['4h'].support) / (supportResistance['4h'].resistance - supportResistance['4h'].support));
  data.push((currentPrice - supportResistance['12h'].support) / (supportResistance['12h'].resistance - supportResistance['12h'].support));
  data.push((currentPrice - supportResistance['24h'].support) / (supportResistance['24h'].resistance - supportResistance['24h'].support));

  // Добавление перекупленности/перепроданности рынка
  const overboughtOversold = {
    RSI: {
      current: indRes.RSI[indRes.RSI.length - 1],
      overbought: 70,
      oversold: 30
    },
    ROC: {
      current: indRes.ROC[indRes.ROC.length - 1],
      overbought: 10,
      oversold: -10
    }
  };
  data.push((overboughtOversold.RSI.current - overboughtOversold.RSI.oversold) / (overboughtOversold.RSI.overbought - overboughtOversold.RSI.oversold));
  data.push((overboughtOversold.ROC.current - overboughtOversold.ROC.oversold) / (overboughtOversold.ROC.overbought - overboughtOversold.ROC.oversold));

  return tf.tensor2d([data]);
}

// Получение результатов предсказания нейросети
async function predict(model, data) {
  const prediction = await model.predict(data).data();
  return prediction;
}

// Обработка результатов и вывод в консоль
async function main() {
  const model = await loadModel();
  const data = prepareData();
  const prediction = await predict(model, data);

  const buySell = prediction[0] > 0.5 ? 'Покупка' : 'Продажа';
  const entryPrice = parseFloat(priceData[priceData.length - 1].close);
  const exitPrice = buySell === 'Покупка' ? parseFloat(indRes.BollingerBands.upper[indRes.BollingerBands.upper.length - 1]) : parseFloat(indRes.BollingerBands.lower[indRes.BollingerBands.lower.length - 1]);

  console.log('Рекомендация:', buySell);
  console.log('Точка входа в сделку:', entryPrice);
  console.log('Точка выхода из сделки:', exitPrice);
}

main();
