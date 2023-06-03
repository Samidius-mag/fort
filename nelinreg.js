const math = require('mathjs');
const data = require('./price.json');

const x = data.map(candle => candle.close);
const y = data.map(candle => candle.low);

const n = x.length;
const sumX = math.sum(x);
const sumY = math.sum(y);
const sumXY = math.sum(math.dotMultiply(x, y));
const sumX2 = math.sum(math.dotPow(x, 2));

const b = (n * sumXY - sumX * sumY) / (n * sumX2 - math.pow(sumX, 2));
const a = (sumY - b * sumX) / n;

//console.log('a:', a); // отладочный вывод
//console.log('b:', b); // отладочный вывод

const nextPrice = a + b * x[x.length - 1];

console.log('Цена регрессии (линейная):', nextPrice); // отладочный вывод

const x1 = data.map(candle => candle.close);
const y1 = data.map(candle => candle.low);

const n1 = x1.length;
const sumX1 = math.sum(x1);
const sumY1 = math.sum(y1);
const sumXY1 = math.sum(math.dotMultiply(x1, y1));
const sumX21 = math.sum(math.dotPow(x1, 2));

const b1 = (n1 * sumXY1 - sumX1 * sumY1) / (n1 * sumX21 - math.pow(sumX1, 2));
const a1 = math.mean(y1) / math.pow(math.mean(x), b1);

const nextPrice1 = a1 * Math.pow(x[x.length - 1], b1);

console.log(`Цена регрессии (нелинейная): ${nextPrice1}`);