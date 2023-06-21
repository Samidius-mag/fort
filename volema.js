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

function calculateEMA(data, n) {
  const k = 2 / (n + 1);
  let ema = data[0].close;

  for (let i = 1; i < data.length; i++) {
    ema = (data[i].close - ema) * k + ema;
  }

  return ema;
}

const ema17 = [];
for (let i = 16; i < candles.length; i++) {
  const data = candles.slice(i - 16, i + 1);
  const value = calculateEMA(data, 17);
  ema17.push(value);
}

const averageVolume = candles.reduce((sum, candle) => sum + candle.volume, 0) / candles.length;

let inTrade = false;
let entryPrice = 0;
let exitPrice = 0;
let capital = 100;
let trades = 0;
let successfulTrades = 0;

for (let i = 17; i < candles.length; i++) {
  if (!inTrade && candles[i].volume > averageVolume && candles[i].close > ema17[i - 17]) {
    inTrade = true;
    entryPrice = candles[i].close;
  }

  if (inTrade && candles[i].volume < averageVolume && candles[i].close < ema17[i - 17]) {
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
