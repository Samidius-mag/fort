const fs = require('fs');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const candles = data.map(candle => ({
  time: new Date(candle.time),
  open: parseFloat(candle.open),
  high: parseFloat(candle.high),
  low: parseFloat(candle.low),
  close: parseFloat(candle.close),
  volume: parseFloat(candle.volume),
}));

function calculateSMA(data, n) {
  const sum = data.slice(-n).reduce((sum, candle) => sum + candle.close, 0);
  return sum / n;
}

function calculateSD(data, n) {
  const sma = calculateSMA(data, n);
  const sum = data.slice(-n).reduce((sum, candle) => sum + Math.pow(candle.close - sma, 2), 0);
  return Math.sqrt(sum / n);
}

function calculateBollingerBands(data, n, k) {
  const sma = calculateSMA(data, n);
  const sd = calculateSD(data, n);
  const upperBand = sma + k * sd;
  const lowerBand = sma - k * sd;
  return { upperBand, lowerBand };
}

let inTrade = false;
let entryPrice = 0;
let exitPrice = 0;
let capital = 100;
let trades = 0;
let successfulTrades = 0;

for (let i = 20; i < candles.length; i++) {
  const { upperBand, lowerBand } = calculateBollingerBands(candles.slice(0, i), 20, 2);

  if (!inTrade && candles[i].close <= lowerBand) {
    inTrade = true;
    entryPrice = candles[i].close;
  }

  if (inTrade && candles[i].close >= upperBand) {
    inTrade = false;
    exitPrice = candles[i].close;

    const profit = (exitPrice - entryPrice) / entryPrice * capital;
    capital += profit;

    if (profit > 0) {
      successfulTrades++;
    }

    trades++;
  }
}

console.log(`Total trades: ${trades}`);
console.log(`Successful trades: ${successfulTrades}`);
console.log(`Unsuccessful trades: ${trades - successfulTrades}`);
console.log(`Final capital: ${capital.toFixed(2)}`);
