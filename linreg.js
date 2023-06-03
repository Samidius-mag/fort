const math = require('mathjs');
const data = require('./price.json');

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

const x = math.matrix([prices, lows, highs, volumes]);
const y = math.matrix([meanPrice, meanLow, meanHigh, meanVolume]);

const beta = math.multiply(math.multiply(y, math.transpose(x)), math.inv(math.multiply(x, math.transpose(x))));
console.log(`Beta: ${beta}`);