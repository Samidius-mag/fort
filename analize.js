const fs = require('fs');
const { RSI, SMA, Stochastic } = require('technicalindicators');

const data = JSON.parse(fs.readFileSync('price.json'));

// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => candle.close);
  const rsi = RSI.calculate({ values: close, period: 14 });
  const sma = SMA.calculate({ values: close, period: 20 });
  const stochastic = Stochastic.calculate({ high: data.map(candle => candle.high), low: data.map(candle => candle.low), close, period: 14, signalPeriod: 3 });

  return { rsi, sma, stochastic };
}

// Вычисляем индикаторы
const indicators = calculateIndicators(data);

// Определяем текущую цену и последние значения индикаторов
const lastCandle = data[data.length - 1];
const lastRsi = indicators.rsi[indicators.rsi.length - 1];
const lastSma = indicators.sma[indicators.sma.length - 1];
const lastStochastic = indicators.stochastic[indicators.stochastic.length - 1];

// Выводим значения индикаторов в консоль
console.log(`RSI: ${lastRsi.toFixed(2)}, SMA: ${lastSma.toFixed(2)}, Stochastic: %K: ${lastStochastic.k.toFixed(2)}, %D: ${lastStochastic.d.toFixed(2)}`);

// Определяем условия для входа и выхода из рынка
const isRsiOversold = lastRsi <= 30;
const isPriceAboveSma = lastCandle.close > lastSma;
const isStochasticBullish = lastStochastic.k > lastStochastic.d && lastStochastic.k < 20;
const isStochasticBearish = lastStochastic.k < lastStochastic.d && lastStochastic.k > 80;

// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isRsiOversold && isPriceAboveSma && isStochasticBullish) {
  console.log('Buy signal detected!');
} else if (isStochasticBearish) { // Если Stochastic Oscillator пересекает %D вниз, сигнализируем о выходе из рынка
  console.log('Sell signal detected!');
} else {
  console.log('No buy or sell signal detected');
}