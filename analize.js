const fs = require('fs');
const { RSI, EMA, Stochastic } = require('technicalindicators');

const data = JSON.parse(fs.readFileSync('price.json'));

// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => candle.close);
  const rsiPeriod = 14;
  const rsiValues = RSI.calculate({ period: rsiPeriod, values: close });
  const rsi = rsiValues.map(value => parseFloat(value.toFixed(2)));
  const emaPeriod = 21;
  const emaValues = EMA.calculate({ period: emaPeriod, values: close });
  const ema = emaValues.map(value => parseFloat(value.toFixed(2)));
  const stochastic = Stochastic.calculate({ high: data.map(candle => candle.high), low: data.map(candle => candle.low), close, period: 14, signalPeriod: 3 });

  return { rsi, ema, stochastic };
}

// Вычисляем индикаторы
const indicators = calculateIndicators(data);

// Определяем текущую цену и последние значения индикаторов
const lastCandle = data[data.length - 1];
const lastRsi = indicators.rsi[indicators.rsi.length - 1];
const lastEma = indicators.ema[indicators.ema.length - 1];
const lastStochastic = indicators.stochastic[indicators.stochastic.length - 1];

// Выводим текущие значения индикаторов
console.log(`Current RSI: ${lastRsi}`);
console.log(`Current EMA: ${lastEma}`);
console.log(`Current Stochastic: %K=${lastStochastic.k}, %D=${lastStochastic.d}`);

// Определяем условия для входа и выхода из рынка
const isRsiOversold = lastRsi <= 30;
const isPriceAboveEma = lastCandle.close > lastEma;
const isStochasticBullish = lastStochastic.k > lastStochastic.d && lastStochastic.k < 20;
const isStochasticBearish = lastStochastic.k < lastStochastic.d && lastStochastic.k > 80;

// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isRsiOversold && isPriceAboveEma && isStochasticBullish) {
  console.log('Buy signal detected!');
} else if (isStochasticBearish) { // Если Stochastic Oscillator пересекает %D вниз, сигнализируем о выходе из рынка
  console.log('Sell signal detected!');
} else {
  console.log('No buy or sell signal detected');
}