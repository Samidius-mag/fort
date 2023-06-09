const fs = require('fs');
const moment = require('moment');
const priceData = require('./price.json');
const indRes = require('./indres.json');

// Определение текущей цены
const currentPrice = parseFloat(priceData[priceData.length - 1].close).toFixed(2);
console.log('Текущая цена:', currentPrice);

// Определение изменения цены за последние 2 часа
const twoHoursAgo = moment().subtract(2, 'hours');
const lastTwoHoursPrices = priceData.filter(price => moment(price.time).isAfter(twoHoursAgo));
const firstPrice = parseFloat(lastTwoHoursPrices[0].close);
const lastPrice = parseFloat(lastTwoHoursPrices[lastTwoHoursPrices.length - 1].close);
const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
const volume = priceData.map(candle => parseFloat(candle.volume));
const numberOfTrades = priceData.map(candle => parseFloat(candle.numberOfTrades));
const correlation = pearsonCorrelation(volume, numberOfTrades);
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const averageNumberOfTrades = numberOfTrades.reduce((acc, val) => acc + val, 0) / numberOfTrades.length;
const currentVolume = volume[volume.length - 1];
const currentNumberOfTrades = numberOfTrades[numberOfTrades.length - 1];
const currentCorrelation = pearsonCorrelation(volume.slice(-10), numberOfTrades.slice(-10));

console.log('Изменение цены:', priceChange.toFixed(2) + '%');

// Определение тренда
const trend = {
  current: currentPrice > indRes.EMA[indRes.EMA.length - 1] ? 'восходящий' : currentPrice < indRes.EMA[indRes.EMA.length - 1] ? 'нисходящий' : 'боковой',
  global: priceData[0].close > priceData[priceData.length - 1].close ? 'восходящий' : 'нисходящий',
  '4h': priceData[priceData.length - 1].close > priceData[priceData.length - 7].close ? 'восходящий' : 'нисходящий',
  '12h': priceData[priceData.length - 1].close > priceData[priceData.length - 25].close ? 'восходящий' : 'нисходящий',
  '24h': priceData[priceData.length - 1].close > priceData[priceData.length - 49].close ? 'восходящий' : 'нисходящий',
};

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
  },
};

const isSideways = currentPrice >= supportResistance.current.support && currentPrice <= supportResistance.current.resistance 
 && currentPrice <= priceData[4].high && currentPrice >=priceData[4].low ;
if (isSideways) {
  //console.log('Тренд боковой', trend.current);
} else {
  //console.log('Тренд вышел из бокового движения');
}

console.log('Текущий тренд:', trend.current);
console.log('4-часовой тренд:', trend['4h']);
console.log('12-часовой тренд:', trend['12h']);
console.log('24-часовой тренд:', trend['24h']);
console.log('Глобальный тренд:', trend.global);

console.log('Текущее сопротивление:', supportResistance.current.resistance);
console.log('Текущая поддержка:', supportResistance.current.support);
console.log('Сопротивление 4 часа:', supportResistance['4h'].resistance);
console.log('Поддержка 4 часа:', supportResistance['4h'].support);
console.log('Сопротивление 12 часов:', supportResistance['12h'].resistance);
console.log('Поддержка 12 часов:', supportResistance['12h'].support);
console.log('Сопротивление 24 часа:', supportResistance['24h'].resistance);
console.log('Поддержка 24 часа:', supportResistance['24h'].support);

// Перекупленность/перепроданность рынка
const overboughtOversold = {
  RSI: {
    current: indRes.RSI[indRes.RSI.length - 1],
    overbought: 70,
    oversold: 30
  },
  ROC: {
    current: indRes.ROC[indRes.ROC.length - 1],
    overbought: 2,
    oversold: -2
  }
};
//console.log('RSI:', overboughtOversold.RSI.current);
//console.log('ROC:', overboughtOversold.ROC.current);

if (overboughtOversold.RSI.current > overboughtOversold.RSI.overbought) {
  console.log('[RS]Рынок перекуплен');
} else if (overboughtOversold.RSI.current < overboughtOversold.RSI.oversold) {
  console.log('[RS]Рынок перепродан');
}

if (overboughtOversold.ROC.current > overboughtOversold.ROC.overbought) {
  console.log('[RO]Рынок перекуплен');
} else if (overboughtOversold.ROC.current < overboughtOversold.ROC.oversold) {
  console.log('[RO]Рынок перепродан');
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
  console.log('Рекомендуется покупка, текущая цена:', currentPrice);
  
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Рекомендуется продажа, текущая цена:', currentPrice);
  
}

// Точки входа-выхода в сделку
const entryExitPoints = {
  buy: {
    support: supportResistance['4h'].support,
    resistance: supportResistance['4h'].resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  },
  sell: {
    support: supportResistance[`4h`].support,
    resistance: supportResistance['4h'].resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  }
};

if (buySell.RSI.buy && buySell.ROC.buy) {
  console.log('Точка входа в сделку (покупка):', entryExitPoints.buy.resistance);
  console.log('Точка выхода из сделки:', supportResistance['24h'].resistance);
  console.log('Стоп - лосс:', supportResistance['24h'].support)
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Точка входа в сделку (продажа):', entryExitPoints.sell.support);
  console.log('Точка выхода из сделки:', supportResistance['24h'].support);
  console.log('Стоп - лосс:', supportResistance['24h'].resistance)
}



/*
if (averageVolume > currentVolume && averageNumberOfTrades > currentNumberOfTrades && correlation >= currentCorrelation) {
  console.log('The market is moving sideways');
}
*/
/*
const raschet = {
  dano: {
    srOby: averageVolume.toFixed(2),
    oby: currentVolume.toFixed(2)
  }
}
if (raschet.dano.srOby < raschet.dano.oby) {
  console.log('Внимание! Превышен средний объем! Продолжение текущего тренда!');
  console.log('Ср. объем:', raschet.dano.srOby);
  console.log('Объем:', raschet.dano.oby);
}
  
*/
console.log('Объем:', currentVolume.toFixed(2));
if (averageNumberOfTrades < currentNumberOfTrades) {
  console.log('Внимание! Превышение среднего числа сделок!');
  console.log('Ср. сделки:', averageNumberOfTrades);
  console.log('Сделки:', currentNumberOfTrades);
}

if (currentCorrelation > correlation && averageVolume < currentVolume) {
  console.log('Внимание! Превышено среднее значение корреляции! Чем ближе к 1.0 тем сильнее импульс!');
  console.log('Ср. корреляция:', correlation.toFixed(8));
  console.log('Корреляция:', currentCorrelation.toFixed(8));
}
/*
if (averageVolume > currentVolume && currentVolume > 1200 && currentVolume < 1700) {
  console.log('Внимание! Происходит выход из боковика!');
  console.log('Ср. объем:', averageVolume.toFixed(2));
  console.log('Объем:', currentVolume.toFixed(2));
}
*/

function pearsonCorrelation(x, y) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] ** 2;
    sumY2 += y[i] ** 2;
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));

  return numerator / denominator;
}
/*
const daTal = {
  curPrice: currentPrice,
  curVolume: currentVolume.toFixed(2),
  curNumOfTrad: currentNumberOfTrades,
  srVol: averageVolume.toFixed(2),
  srTrad: averageNumberOfTrades,
  izmen: priceChange.toFixed(2),
  tc: trend.current,
  t4: trend['4h'],
  t24: trend['24h'],
  tg: trend.global,

}

fs.writeFile('datal.json', JSON.stringify(daTal), (err) => {
  if (err) throw err;
  //console.log(' results saved to datal.json');
});
*/
const { RSI, EMA, Stochastic, MACD } = require('technicalindicators');
const data = JSON.parse(fs.readFileSync('price.json'));
// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => parseFloat(candle.close));
  const macd = MACD.calculate({ values: close, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });
  const rsiPeriod = 14;
  const rsiValues = RSI.calculate({ period: rsiPeriod, values: close });
  const rsi = rsiValues.map(value => parseFloat(value.toFixed(2)));
  const emaPeriod = 21;
  const emaValues = EMA.calculate({ period: emaPeriod, values: close });
  const ema = emaValues.map(value => parseFloat(value.toFixed(2)));
  const stochastic = Stochastic.calculate({ high: data.map(candle => candle.high), low: data.map(candle => candle.low), close, period: 14, signalPeriod: 3 });
  return { rsi, ema, stochastic, macd };
}
// Вычисляем индикаторы
const indicators = calculateIndicators(data);
// Определяем текущую цену и последние значения индикаторов
const lastCandle = data[data.length - 1];
const lastRsi = indicators.rsi[indicators.rsi.length - 1];
const lastEma = indicators.ema[indicators.ema.length - 1];
const lastStochastic = indicators.stochastic[indicators.stochastic.length - 1];
const lastMacd = indicators.macd[indicators.macd.length - 1];
// Определяем условия для входа и выхода из рынка
const isRsiOversold = lastRsi <= 30;
const isPriceAboveEma = lastCandle.close > lastEma;
const isStochasticBullish = lastStochastic.k > lastStochastic.d && lastStochastic.k < 20;
const isStochasticBearish = lastStochastic.k < lastStochastic.d && lastStochastic.k > 80;
const isMacdBullish = lastMacd.MACD > lastMacd.signal && lastMacd.histogram > 0;
const isMacdBearish = lastMacd.MACD < lastMacd.signal && lastMacd.histogram < 0;
const isVolumeBullish = averageVolume < currentVolume
// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isRsiOversold && isPriceAboveEma && isStochasticBullish && isMacdBullish && isVolumeBullish) {
  console.log('Найден сигнал на покупку!');
} else if (isStochasticBearish || isMacdBearish && isVolumeBullish) { // Если Stochastic Oscillator или MACD пересекает сигнальную линию вниз, сигнализируем о выходе из рынка
  console.log('Найден сигнал на продажу!');
} else {
  console.log('-');
}
/*
// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => candle.close);
  const atr = ATR.calculate({ high: data.map(candle => candle.high), low: data.map(candle => candle.low), close, period: 14 });
  const ema = EMA.calculate({ values: close, period: 30 });

  return { atr, ema };
}

// Вычисляем индикаторы


// Определяем текущую цену и последние значения индикаторов
//const lastCandle = data[data.length - 1];
const lastAtr = indicators.atr[indicators.atr.length - 1];
//const lastEma = indicators.ema[indicators.ema.length - 1];

// Выводим текущие значения индикаторов
console.log(`Current ATR: ${lastAtr}`);
console.log(`Current EMA: ${lastEma}`);

// Определяем условия для входа и выхода из рынка
//const isPriceAboveEma = lastCandle.close > lastEma;
const isAtrAboveEma = lastAtr > lastEma;
const isAtrBelowEma = lastAtr < lastEma;

// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isPriceAboveEma && isAtrAboveEma) {
  console.log('Buy signal detected!');
} else if (isPriceAboveEma && isAtrBelowEma) { // Если цена находится выше EMA 30, но ATR 14 ниже EMA 30, сигнализируем о выходе из рынка
  console.log('Sell signal detected!');
} else {
  console.log('No buy or sell signal detected');
}
*/
const candles = data.slice(0, -1);

function isThreeWhiteSoldiers(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < second.close && second.close < third.close &&
         first.open < first.close && second.open < second.close && third.open < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeDescending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > second.close && second.close > third.close &&
         first.open > first.close && second.open > second.close && third.open > third.close &&
         first.open - first.close > (first.high - first.open) * 0.5 &&
         second.open - second.close > (second.high - second.open) * 0.5 &&
         third.open - third.close > (third.high - third.open) * 0.5;
}

function isThreeAscending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < second.close && second.close < third.close &&
         first.open < first.close && second.open < second.close && third.open < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeBlackCrows(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > first.open && second.close > second.open && third.close > third.open &&
         first.close > second.close && second.close > third.close &&
         first.close - first.open > (first.high - first.close) * 0.5 &&
         second.close - second.open > (second.high - second.close) * 0.5 &&
         third.close - third.open > (third.high - third.close) * 0.5;
}

function isBearishTasukiGap(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close > first.open && second.open > second.close &&
         second.open < first.close && second.close > first.open &&
         second.close - second.open < (second.high - second.close) * 0.5 &&
         first.close - first.open > (first.high - first.close) * 0.5;
}

function isBullishTasukiGap(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close < first.open && second.open < second.close &&
         second.open > first.close && second.close < first.open &&
         second.close - second.open < (second.close - second.low) * 0.5 &&
         first.open - first.close > (first.open - first.low) * 0.5;
}

function isThreeBullishWings(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < first.open && second.close > second.open && third.close > third.open &&
         first.close < second.close && second.close < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeConcurrentWings(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > first.open && second.close > second.open && third.close > third.open &&
         first.close > second.close && second.close > third.close &&
         first.close - first.open > (first.high - first.close) * 0.5 &&
         second.close - second.open > (second.high - second.close) * 0.5 &&
         third.close - third.open > (third.high - third.close) * 0.5;
}

function isBullishGapSideBySideWhiteLines(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close < first.open && second.close > second.open &&
         second.open > first.close && second.close < first.open &&
         second.close - second.open < (second.high - second.close) * 0.5 &&
         first.open - first.close > (first.open - first.low) * 0.5;
}

if (isThreeWhiteSoldiers(candles)) {
  console.log('Три белых солдата ⏭');
}

if (isThreeDescending(candles)) {
  console.log('Метод трех снижений ⏭');
}

if (isThreeAscending(candles)) {
  console.log('Метод трех восхождений ⏭');
}

if (isThreeBlackCrows(candles)) {
  console.log('Три вороны ⏭');
}

if (isBearishTasukiGap(candles)) {
  console.log('Медвежий гэп "Тазуки" ⏭');
}

if (isBullishTasukiGap(candles)) {
  console.log('Бычий гэп "Тазуки" ⏭');
}

if (isThreeBullishWings(candles)) {
  console.log('Три крыла Бозу ⏭');
}

if (isThreeConcurrentWings(candles)) {
  console.log('Три одновременных крыла ⏭');
}

if (isBullishGapSideBySideWhiteLines(candles)) {
  console.log('Бычий гэп край к краю белых линий ⏭');
}

function bullishEngulfing(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  if (prevCandle && candle.close > prevCandle.open && candle.open < prevCandle.close && candle.close > candle.open && candle.close > prevCandle.open && candle.open < prevCandle.close) {
    const stopLoss = candle.high * 0.618;
    const entryPoint1 = prevCandle.high * 0.5;
    const entryPoint2 = prevCandle.high * 0.382;
    console.log(`Stop Loss: ${stopLoss}`);
    console.log(`Entry Point 1: ${entryPoint1}`);
    console.log(`Entry Point 2: ${entryPoint2}`);
    return true;
  }
  return false;
}

function bullishHarami(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  return prevCandle && candle.close < prevCandle.open && candle.open > prevCandle.close && candle.close > prevCandle.close && candle.open < prevCandle.open;
}

function bullishHammer(candle) {
  return candle.close > candle.open && (candle.close - candle.low) / (0.001 + candle.high - candle.low) > 0.6 && (candle.close - candle.low) / (0.001 + candle.high - candle.low) < 0.7 && (2 * (candle.close - candle.open)) / (candle.high - candle.low) > 1 && (candle.open - candle.low) / (0.001 + candle.high - candle.low) > 0.1;
}

function invertedHammer(candle) {
  return candle.close > candle.open && (candle.close - candle.low) / (0.001 + candle.high - candle.low) > 0.6 && (candle.close - candle.low) / (0.001 + candle.high - candle.low) < 0.7 && (2 * (candle.close - candle.open)) / (candle.high - candle.low) > 1 && (candle.high - candle.open) / (0.001 + candle.high - candle.low) > 0.1;
}

function morningStar(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  const prevPrevCandle = candles[candles.indexOf(candle) - 2];
  return prevPrevCandle && prevCandle && candle.close < prevPrevCandle.close && candle.close < prevPrevCandle.open && candle.close < prevCandle.open && candle.open > prevCandle.close && candle.close > prevCandle.close && candle.open < prevCandle.open && (prevCandle.close - prevCandle.open) / (0.001 + prevCandle.high - prevCandle.low) > 0.6 && (candle.close - candle.open) / (0.001 + candle.high - candle.low) > 0.6;
}

const lastCandles = candles.slice(-3);

const bullishEngulfingCandles = lastCandles.filter(bullishEngulfing);
console.log(`🔼Бычье поглощение: ${bullishEngulfingCandles.length}`);

const bullishHaramiCandles = lastCandles.filter(bullishHarami);
console.log(`🔼Бычье харами: ${bullishHaramiCandles.length}`);

const bullishHammerCandles = lastCandles.filter(bullishHammer);
console.log(`🔼Бычий молот: ${bullishHammerCandles.length}`);

const invertedHammerCandles = lastCandles.filter(invertedHammer);
console.log(`🔼Перевернутый молот: ${invertedHammerCandles.length}`);

const morningStarCandles = lastCandles.filter(morningStar);
console.log(`🔼Утренняя звезда: ${morningStarCandles.length}`);