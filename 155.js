const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));
const numberOfTrades = data.map(candle => parseFloat(candle.numberOfTrades));

const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const averageNumberOfTrades = numberOfTrades.reduce((acc, val) => acc + val, 0) / numberOfTrades.length;

console.log('Average Volume:', averageVolume);
console.log('Average Number of Trades:', averageNumberOfTrades);