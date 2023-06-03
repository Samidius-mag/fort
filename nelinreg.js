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
const a = math.mean(y) - b * math.mean(x);

console.log(`a: ${a}`);
console.log(`b: ${b}`);