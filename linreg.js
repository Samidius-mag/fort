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

const prices = data.map(candle => candle.close);
const dates = data.map(candle => new Date(candle.date).getTime()); // использование метода getTime()

const meanPrice = math.mean(prices);
const meanDate = math.mean(dates);

const n = prices.length;
const sumX = math.sum(dates);
const sumY = math.sum(prices);
const sumXY = math.sum(math.dotMultiply(dates, prices));
const sumX2 = math.sum(math.dotPow(dates, 2));

const b = (n * sumXY - sumX * sumY) / (n * sumX2 - math.pow(sumX, 2));
const a = meanPrice - b * meanDate;

const nextDate = new Date();
const nextPrice = a + b * nextDate.getTime();

console.log(`Next price (linear regression): ${nextPrice}`);