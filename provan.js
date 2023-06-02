const canalizres = require('./canalizres.json');
const data = require('./price.json');
const lastCandle = data[data.length - 1];

const currentPrice = lastCandle.close;
const diffMax = Math.abs(currentPrice - canalizres.max);
const diffMin = Math.abs(currentPrice - canalizres.min);

const accuracy = ((diffMax + diffMin) / 2) / currentPrice * 100;

console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
console.log(`Comparing current price ${currentPrice} with price channel: ${canalizres.min} - ${canalizres.max}`);