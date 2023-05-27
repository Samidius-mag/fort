/*const fs = require('fs');
const moment = require('moment');

const priceData = require('./price.json');
const indRes = require('./indres.json');

// Определение текущей цены
const currentPrice = parseFloat(priceData[priceData.length - 1].close).toFixed(2);
console.log('Текущая цена:', currentPrice);

// Определение тренда
const trend = {
  current: currentPrice > indRes.EMA[indRes.EMA.length - 1] ? 'Восходящий' : 'Нисходящий',
  global: priceData[0].close > priceData[priceData.length - 1].close ? 'Нисходящий' : 'Восходящий',
  '4h': priceData[priceData.length - 1].close > priceData[priceData.length - 7].close ? 'Восходящий' : 'Нисходящий',
  '12h': priceData[priceData.length - 1].close > priceData[priceData.length - 25].close ? 'Восходящий' : 'Нисходящий',
  '24h': priceData[priceData.length - 1].close > priceData[priceData.length - 49].close ? 'Восходящий' : 'Нисходящий'
};
console.log('Текущий тренд:', trend.current);
console.log('Глобальный тренд:', trend.global);
console.log('4-часовой тренд:', trend['4h']);
console.log('12-часовой тренд:', trend['12h']);
console.log('24-часовой тренд:', trend['24h']);

// Уровни поддержки и сопротивления
const supportResistance = {
  current: {
    support: parseFloat(indRes.BollingerBands.lower[indRes.BollingerBands.lower.length - 1]).toFixed(2),
    resistance: parseFloat(indRes.BollingerBands.upper[indRes.BollingerBands.upper.length - 1]).toFixed(2)
  },
  '4h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.high)))).toFixed(2)
  },
  '12h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.high)))).toFixed(2)
  },
  '24h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.high)))).toFixed(2)
  }
};
console.log('Текущий уровень поддержки:', supportResistance.current.support);
console.log('Текущий уровень сопротивления:', supportResistance.current.resistance);
console.log('Уровень поддержки за последние 4 часа:', supportResistance['4h'].support);
console.log('Уровень сопротивления за последние 4 часа:', supportResistance['4h'].resistance);
console.log('Уровень поддержки за последние 12 часов:', supportResistance['12h'].support);
console.log('Уровень сопротивления за последние 12 часов:', supportResistance['12h'].resistance);
console.log('Уровень поддержки за последние 24 часа:', supportResistance['24h'].support);
console.log('Уровень сопротивления за последние 24 часа:', supportResistance['24h'].resistance);

// Перекупленность/перепроданность рынка
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
console.log('RSI:', overboughtOversold.RSI.current);
console.log('ROC:', overboughtOversold.ROC.current);

if (overboughtOversold.RSI.current > overboughtOversold.RSI.overbought) {
  console.log('Рынок перекуплен');
} else if (overboughtOversold.RSI.current < overboughtOversold.RSI.oversold) {
  console.log('Рынок перепродан');
}

if (overboughtOversold.ROC.current > overboughtOversold.ROC.overbought) {
  console.log('Рынок перекуплен');
} else if (overboughtOversold.ROC.current < overboughtOversold.ROC.oversold) {
  console.log('Рынок перепродан');
}

// Рекомендации по покупке/продаже
const buySell = {
  RSI: {
    buy: overboughtOversold.RSI.current < overboughtOversold.RSI.oversold,
    sell: overboughtOversold.RSI.current > overboughtOversold.RSI.overbought
  },
  ROC: {
    buy: overboughtOversold.ROC.current < overboughtOversold.ROC.oversold,
    sell: overboughtOversold.ROC.current > overboughtOversold.ROC.overbought
  }
};

if (buySell.RSI.buy && buySell.ROC.buy) {
  console.log('Рекомендуется покупка');
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Рекомендуется продажа');
}

// Точки входа-выхода в сделку
const entryExitPoints = {
  buy: {
    support: supportResistance.current.support,
    resistance: supportResistance.current.resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  },
  sell: {
    support: supportResistance.current.support,
    resistance: supportResistance.current.resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  }
};

if (buySell.RSI.buy && buySell.ROC.buy) {
  console.log('Точка входа в сделку (покупка):', entryExitPoints.buy.resistance);
  console.log('Точка выхода из сделки (продажа):', entryExitPoints.buy.support);
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Точка входа в сделку (продажа):', entryExitPoints.sell.support);
  console.log('Точка выхода из сделки (покупка):', entryExitPoints.sell.resistance);
}
*/
const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, OBV, PSAR, WMA } = require('technicalindicators');

fs.readFile('price.json', 'utf8', (err, data) => {
  if (err) throw err;

  const candles = JSON.parse(data);

  fs.readFile('indres.json', 'utf8', (err, data) => {
    if (err) throw err;

    const indicators = JSON.parse(data);

    const currentPrice = candles[candles.length - 1].close;
    console.log(`Текущая цена: ${currentPrice}`);

    const trend = getTrend(candles, indicators);
    console.log(`Текущий тренд: ${trend.current}`);
    console.log(`Глобальный тренд: ${trend.global}`);
    console.log(`Тренд за 4 часа: ${trend.fourHours}`);
    console.log(`Тренд за 12 часов: ${trend.twelveHours}`);
    console.log(`Тренд за 24 часа: ${trend.twentyFourHours}`);

    const supportResistance = getSupportResistance(candles, indicators);
    console.log(`Уровень поддержки относительно текущей цены: ${supportResistance.current.support}`);
    console.log(`Уровень сопротивления относительно текущей цены: ${supportResistance.current.resistance}`);
    console.log(`Уровень поддержки относительно цены 4 часов назад: ${supportResistance.fourHours.support}`);
    console.log(`Уровень сопротивления относительно цены 4 часов назад: ${supportResistance.fourHours.resistance}`);
    console.log(`Уровень поддержки относительно цены 12 часов назад: ${supportResistance.twelveHours.support}`);
    console.log(`Уровень сопротивления относительно цены 12 часов назад: ${supportResistance.twelveHours.resistance}`);
    console.log(`Уровень поддержки относительно цены 24 часа назад: ${supportResistance.twentyFourHours.support}`);
    console.log(`Уровень сопротивления относительно цены 24 часа назад: ${supportResistance.twentyFourHours.resistance}`);

    const overboughtOversold = getOverboughtOversold(indicators);
    console.log(`Перекупленность/перепроданность рынка: ${overboughtOversold}`);

    const recommendations = getRecommendations(candles, indicators);
    console.log(`Рекомендация по покупке: ${recommendations.buy}`);
    console.log(`Рекомендация по продаже: ${recommendations.sell}`);
    console.log(`Точка входа в сделку по покупке: ${recommendations.buyPrice}`);
    console.log(`Точка входа в сделку по продаже: ${recommendations.sellPrice}`);
  });
});

function getTrend(candles, indicators) {
  const currentPrice = candles[candles.length - 1].close;
  const currentSMA20 = indicators.EMA[indicators.EMA.length - 1];
  const currentSMA50 = indicators.EMA.slice(-50).reduce((sum, value) => sum + value, 0) / 50;
  const currentSMA200 = indicators.EMA.slice(-200).reduce((sum, value) => sum + value, 0) / 200;

  const currentTrend = currentPrice > currentSMA20 ? 'Восходящий' : 'Нисходящий';
  const globalTrend = currentPrice > currentSMA200 ? 'Восходящий' : 'Нисходящий';
  const fourHoursTrend = candles[candles.length - 5].close > indicators.EMA.slice(-5)[0] ? 'Восходящий' : 'Нисходящий';
  const twelveHoursTrend = candles[candles.length - 13].close > indicators.EMA.slice(-13)[0] ? 'Восходящий' : 'Нисходящий';
  const twentyFourHoursTrend = candles[candles.length - 25].close > indicators.EMA.slice(-25)[0] ? 'Восходящий' : 'Нисходящий';

  return {
    current: currentTrend,
    global: globalTrend,
    fourHours: fourHoursTrend,
    twelveHours: twelveHoursTrend,
    twentyFourHours: twentyFourHoursTrend
  };
}

function getSupportResistance(candles, indicators) {
  const currentPrice = candles[candles.length - 1].close;
  const currentBB = indicators.BollingerBands[indicators.BollingerBands.length - 1];
  const currentSupport = indicators.BollingerBands.lower;
  const currentResistance = indicators.BollingerBands.upper;

  const fourHoursBB = BollingerBands.calculate({ values: candles.slice(-5).map(candle => candle.close), period: 20, stdDev: 2 });
  const fourHoursSupport = fourHoursBB[indicators.BollingerBands.length - 1].lower;
  const fourHoursResistance = fourHoursBB[indicators.BollingerBands.length - 1].upper;

  const twelveHoursBB = BollingerBands.calculate({ values: candles.slice(-13).map(candle => candle.close), period: 20, stdDev: 2 });
  const twelveHoursSupport = twelveHoursBB[indicators.BollingerBands.length - 1].lower;
  const twelveHoursResistance = twelveHoursBB[indicators.BollingerBands.length - 1].upper;

  const twentyFourHoursBB = BollingerBands.calculate({ values: candles.slice(-25).map(candle => candle.close), period: 20, stdDev: 2 });
  const twentyFourHoursSupport = twentyFourHoursBB[indicators.BollingerBands.length - 1].lower;
  const twentyFourHoursResistance = twentyFourHoursBB[indicators.BollingerBands.length - 1].upper;

  return {
    current: { support: currentSupport, resistance: currentResistance },
    fourHours: { support: fourHoursSupport, resistance: fourHoursResistance },
    twelveHours: { support: twelveHoursSupport, resistance: twelveHoursResistance },
    twentyFourHours: { support: twentyFourHoursSupport, resistance: twentyFourHoursResistance }
  };
}

function getOverboughtOversold(indicators) {
  const currentRSI = indicators.RSI[indicators.RSI.length - 1];

  if (currentRSI > 70) {
    return 'Рынок перекуплен';
  } else if (currentRSI < 30) {
    return 'Рынок перепродан';
  } else {
    return 'Рынок в нормальном состоянии';
  }
}

function getRecommendations(candles, indicators) {
  const currentPrice = candles[candles.length - 1].close;
  const currentSMA20 = indicators.EMA[indicators.EMA.length - 1];
  const currentSMA50 = indicators.EMA.slice(-50).reduce((sum, value) => sum + value, 0) / 50;
  const currentSMA200 = indicators.EMA.slice(-200).reduce((sum, value) => sum + value, 0) / 200;
  const currentRSI = indicators.RSI[indicators.rsi.length - 1];
  const currentOBV = indicators.OBV[indicators.obv.length - 1];

  let buyRecommendation = '';
  let sellRecommendation = '';
  let buyPrice = '';
  let sellPrice = '';

  if (currentPrice > currentSMA20 && currentPrice > currentSMA50 && currentPrice > currentSMA200 && currentRSI > 50 && currentOBV > 0) {
    buyRecommendation = 'Сильная покупка';
    buyPrice = currentPrice;
  } else if (currentPrice > currentSMA20 && currentPrice > currentSMA50 && currentPrice > currentSMA200 && currentRSI > 30 && currentOBV > 0) {
    buyRecommendation = 'Слабая покупка';
    buyPrice = currentPrice;
  }

  if (currentPrice < currentSMA20 && currentPrice < currentSMA50 && currentPrice < currentSMA200 && currentRSI < 50 && currentOBV < 0) {
    sellRecommendation = 'Сильная продажа';
    sellPrice = currentPrice;
  } else if (currentPrice < currentSMA20 && currentPrice < currentSMA50 && currentPrice < currentSMA200 && currentRSI < 70 && currentOBV < 0) {
    sellRecommendation = 'Слабая продажа';
    sellPrice = currentPrice;
  }

  return { buy: buyRecommendation, sell: sellRecommendation, buyPrice, sellPrice };
}
