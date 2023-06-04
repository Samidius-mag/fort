const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => candle[5]);
const numberOfTrades = data.map(candle => candle[8]);

const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const averageNumberOfTrades = numberOfTrades.reduce((acc, val) => acc + val, 0) / numberOfTrades.length;

console.log('Average Volume:', averageVolume);
console.log('Average Number of Trades:', averageNumberOfTrades);