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

for (let n = 10; n <= 20; n++) {
  const ema = [];

  for (let i = n - 1; i < candles.length; i++) {
    const data = candles.slice(i - n + 1, i + 1);
    const value = calculateEMA(data, n);
    ema.push(value);
  }

  emaValues[n] = ema;
}

const result = {};

for (let n = 10; n <= 20; n++) {
  for (let i = n - 1; i < candles.length; i++) {
    const data = candles.slice(i - n + 1, i + 1);
    const ema = emaValues[n][i - n + 1];

    if (candles[i].close > ema && candles[i].volume > 1000) {
      if (!result[n]) {
        result[n] = {
          count: 1,
          volume: candles[i].volume,
        };
      } else {
        result[n].count++;
        result[n].volume += candles[i].volume;
      }
    }
  }
}

console.log(result);
