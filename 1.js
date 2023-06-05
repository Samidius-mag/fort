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
const prices = data.map(candle => candle.close);

// Вычисляем индикаторы
const ma = movingAverage(prices, maPeriod);
const stoch = stochasticOscillator(prices, stochPeriod);
const rsi = relativeStrengthIndex(prices, rsiPeriod);

// Выводим результат в консоль
console.log(ma);
console.log(stoch);
console.log(rsi);