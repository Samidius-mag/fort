const fs = require('fs');

// Задаем периоды индикаторов
const maPeriod = 5;
const stochPeriod = 14;
const rsiPeriod = 14;

// Функция для вычисления скользящей средней
function movingAverage(prices, period) {
  const ma = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b);
    ma.push(sum / period);
  }
  return ma;
}

// Функция для вычисления стохастического осциллятора
function stochasticOscillator(prices, period) {
  const stoch = [];
  for (let i = period - 1; i < prices.length; i++) {
    const min = Math.min(...prices.slice(i - period + 1, i + 1));
    const max = Math.max(...prices.slice(i - period + 1, i + 1));
    const stochValue = (prices[i] - min) / (max - min) * 100;
    stoch.push(stochValue);
  }
  return stoch;
}

// Функция для вычисления относительной силы индекса
function relativeStrengthIndex(prices, period) {
  const rsi = [];
  let gainSum = 0;
  let lossSum = 0;
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      gainSum += diff;
    } else {
      lossSum += Math.abs(diff);
    }
    if (i >= period) {
      const avgGain = gainSum / period;
      const avgLoss = lossSum / period;
      const rs = avgGain / avgLoss;
      const rsiValue = 100 - (100 / (1 + rs));
      rsi.push(rsiValue);
    }
  }
  return rsi;
}

// Читаем данные из файла price.json
const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

// Получаем массив цен закрытия
const prices = data.map(candle => parseFloat(candle.close));

// Вычисляем индикаторы
const ma = movingAverage(prices, maPeriod);
const stoch = stochasticOscillator(prices, stochPeriod);
const rsi = relativeStrengthIndex(prices, rsiPeriod);

// Находим минимальное и максимальное значение по индикаторам
const minMa = Math.min(...ma);
const maxMa = Math.max(...ma);
const minStoch = Math.min(...stoch);
const maxStoch = Math.max(...stoch);
const minRsi = Math.min(...rsi);
const maxRsi = Math.max(...rsi);

// Находим индексы минимальных и максимальных значений
const minMaIndex = ma.indexOf(minMa);
const maxMaIndex = ma.indexOf(maxMa);
const minStochIndex = stoch.indexOf(minStoch);
const maxStochIndex = stoch.indexOf(maxStoch);
const minRsiIndex = rsi.indexOf(minRsi);
const maxRsiIndex = rsi.indexOf(maxRsi);

// Находим цены, соответствующие минимальным и максимальным значениям
const minPrices = [
  prices[minMaIndex + maPeriod - 1],
  prices[minStochIndex + stochPeriod - 1],
  prices[minRsiIndex + rsiPeriod - 1]
];
const maxPrices = [
  prices[maxMaIndex + maPeriod - 1],
  prices[maxStochIndex + stochPeriod - 1],
  prices[maxRsiIndex + rsiPeriod - 1]
];

// Выводим результат в консоль
console.log(`MA: min=${minMa} (${minPrices[0]}), max=${maxMa} (${maxPrices[0]})`);
console.log(`Stoch: min=${minStoch} (${minPrices[1]}), max=${maxStoch} (${maxPrices[1]})`);
console.log(`RSI: min=${minRsi} (${minPrices[2]}), max=${maxRsi} (${maxPrices[2]})`);