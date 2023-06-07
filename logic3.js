const fs = require('fs');
const priceData = require('./price.json');
const currentPrice = parseFloat(priceData[priceData.length - 1].close).toFixed(2);
const volume = priceData.map(candle => parseFloat(candle.volume));
const numberOfTrades = priceData.map(candle => parseFloat(candle.numberOfTrades));
const currentVolume = volume[volume.length - 1];
const currentNumberOfTrades = numberOfTrades[numberOfTrades.length - 1];
module.exports = {
  currentPrice,
  currentVolume,
  currentNumberOfTrades,
};