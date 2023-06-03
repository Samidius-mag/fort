const math = require('mathjs');
const data = require('./price.json');
/*
const prices = data.map(candle => candle.close);
const lows = data.map(candle => candle.low);
const highs = data.map(candle => candle.high);
const volumes = data.map(candle => candle.volume);

const meanPrice = math.mean(prices);
const meanLow = math.mean(lows);
const meanHigh = math.mean(highs);
const meanVolume = math.mean(volumes);

console.log(`Mean price: ${meanPrice}`);
console.log(`Mean low: ${meanLow}`);
console.log(`Mean high: ${meanHigh}`);
console.log(`Mean volume: ${meanVolume}`);
*/



const x = data.map(candle => candle.close);
const y = data.map(candle => candle.low);

const n = x.length;
const sumX = math.sum(x);
const sumY = math.sum(y);
const sumXY = math.sum(math.dotMultiply(x, y));
const sumX2 = math.sum(math.dotPow(x, 2));

const b = (n * sumXY - sumX * sumY) / (n * sumX2 - math.pow(sumX, 2));
const a = (sumY - b * sumX) / n;

console.log('a:', a); // отладочный вывод
console.log('b:', b); // отладочный вывод

const nextPrice = a + b * x[x.length - 1];

console.log('Next price (linear regression):', nextPrice); // отладочный вывод

