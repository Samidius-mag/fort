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

const emaValues = {};

for (let n of [17, 65, 80, 95, 200]) {
  const ema = [];

  for (let i = n - 1; i < candles.length; i++) {
    const data = candles.slice(i - n + 1, i + 1);
    const value = calculateEMA(data, n);
    ema.push(value);
  }

  emaValues[n] = ema;
}

const result = {
  totalTrades: 0,
  successfulTrades: 0,
  unsuccessfulTrades: 0,
};

let inTrade = false;
let entryPrice = 0;
let exitPrice = 0;

for (let i = 200; i < candles.length; i++) {
  const ema17 = emaValues[17][i - 17 + 1];
  const ema65 = emaValues[65][i - 65 + 1];
  const ema80 = emaValues[80][i - 80 + 1];
  const ema95 = emaValues[95][i - 95 + 1];
  const ema200 = emaValues[200][i - 200 + 1];

  const averageVolume = (candles[i - 1].volume + candles[i - 2].volume + candles[i - 3].volume) / 3;

  if (!inTrade && candles[i].volume > averageVolume && candles[i].close > ema17 && candles[i].close > ema65 && candles[i].close > ema80 && candles[i].close > ema95 && candles[i].close > ema200) {
    inTrade = true;
    entryPrice = candles[i].close;
  }

  if (inTrade && candles[i].close < ema17) {
    inTrade = false;
    exitPrice = candles[i].close;

    if (exitPrice > entryPrice) {
      result.successfulTrades++;
    } else {
      result.unsuccessfulTrades++;
    }

    result.totalTrades++;
  }
}

console.log(result);
