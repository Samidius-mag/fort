const _ = require('lodash');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// Получаем последние 10 часовых свечей
const lastCandles = data.slice(-10);

// Получаем массив цен закрытия свечей
const prices = lastCandles.map(candle => parseFloat(candle.close));

// Получаем массив точек минимумов и максимумов
const points = [];
for (let i = 1; i < prices.length - 1; i++) {
  if (prices[i] > prices[i - 1] && prices[i] > prices[i + 1]) {
    points.push([i, prices[i]]);
  } else if (prices[i] < prices[i - 1] && prices[i] < prices[i + 1]) {
    points.push([i, prices[i]]);
  }
}

// Вычисляем линейную регрессию через точки минимумов и максимумов
const n = points.length;
const sumX = _.sumBy(points, point => point[0]);
const sumY = _.sumBy(points, point => point[1]);
const sumXY = _.sumBy(points, point => point[0] * point[1]);
const sumX2 = _.sumBy(points, point => point[0] ** 2);
const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
const intercept = (sumY - slope * sumX) / n;

// Получаем цены на линии сопротивления и поддержки
const resistancePrice = slope * prices.length + intercept;
const supportPrice = slope * (prices.length - 1) + intercept;

// Определяем среднюю линию канала
const middlePrice = (resistancePrice + supportPrice) / 2;

// Получаем точки на линии сопротивления и поддержки
const resistancePoints = [[prices.length - 1, resistancePrice], [prices.length, slope * (prices.length + 1) + intercept]];
const supportPoints = [[prices.length - 1, supportPrice], [prices.length, slope * prices.length + intercept]];

// Определяем границы канала
const upperBound = resistancePoints[0][1];
const lowerBound = supportPoints[0][1];

// Определяем текущую цену
const currentPrice = parseFloat(lastCandles[9].close);

// Проверяем, вышла ли цена за границы канала
let message = '';
if (currentPrice > upperBound) {
  message = 'Price is above the channel';
} else if (currentPrice < lowerBound) {
  message = 'Price is below the channel';
}

console.log(`Resistance: ${resistancePrice}`);
console.log(`Support: ${supportPrice}`);
console.log(`Middle: ${middlePrice}`);
console.log(`Upper bound: ${upperBound}`);
console.log(`Lower bound: ${lowerBound}`);
console.log(`Current price: ${currentPrice}`);
console.log(`Message: ${message}`);