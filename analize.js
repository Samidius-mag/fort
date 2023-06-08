const fs = require('fs');
const { MACD, RSI, BollingerBands, SMA } = require('technicalindicators');

const data = JSON.parse(fs.readFileSync('price.json'));

// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => candle.close);
  const macd = MACD.calculate({ values: close, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });
  const rsi = RSI.calculate({ values: close, period: 14 });
  const bb = BollingerBands.calculate({ values: close, period: 20, stdDev: 2 });
  const sma = SMA.calculate({ values: close, period: 20 });

  return { macd, rsi, bb, sma };
}

// Вычисляем индикаторы
const indicators = calculateIndicators(data);

// Определяем текущую цену и последние значения индикаторов
const lastCandle = data[data.length - 1];
const lastMacd = indicators.macd[indicators.macd.length - 1];
const lastRsi = indicators.rsi[indicators.rsi.length - 1];
const lastBb = indicators.bb[indicators.bb.length - 1];
const lastSma = indicators.sma[indicators.sma.length - 1];

// Выводим значения индикаторов в консоль
console.log(`MACD: ${lastMacd.MACD}, Signal: ${lastMacd.signal}, Histogram: ${lastMacd.histogram}`);
console.log(`RSI: ${lastRsi.toFixed(2)}`);
console.log(`Bollinger Bands: Upper: ${lastBb.upper.toFixed(2)}, Middle: ${lastBb.middle.toFixed(2)}, Lower: ${lastBb.lower.toFixed(2)}`);
console.log(`SMA: ${lastSma.toFixed(2)}`);

// Определяем условия для входа и выхода из рынка
const isMacdBullish = lastMacd.MACD > lastMacd.signal;
const isRsiOversold = lastRsi <= 30;
const isPriceAboveBbLower = lastCandle.close > lastBb.lower;
const isPriceAboveSma = lastCandle.close > lastSma;
const isMacdBearish = lastMacd.MACD < lastMacd.signal;

// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isMacdBullish && isRsiOversold && isPriceAboveBbLower && isPriceAboveSma) {
  console.log('Buy signal detected!');
} else if (isMacdBearish) { // Если MACD пересекает сигнальную линию вниз, сигнализируем о выходе из рынка
  console.log('Sell signal detected!');
} else {
  console.log('No buy or sell signal detected');
}