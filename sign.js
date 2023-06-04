const fs = require('fs');
const data = JSON.parse(fs.readFileSync('price.json'));

const close = data.map(candle => parseFloat(candle.close));
const ma5 = sma(close, 5);
const ma200 = sma(close, 200);

const changeSrc = close.map((value, index, array) => index === 0 ? 0 : value - array[index - 1]);

let up = 0;
let down = 0;

for (let i = 1; i < changeSrc.length; i++) {
  if (changeSrc[i] > 0) {
    up += changeSrc[i];
  } else {
    down += Math.abs(changeSrc[i]);
  }
}

const rs = up / down;
const rsi = 100 - (100 / (1 + rs));

if (close[close.length - 1] > ma200 && close[close.length - 1] < ma5 && rsi < 10) {
  console.log('Покупка');
}

if (close[close.length - 1] < ma200 && close[close.length - 1] > ma5 && rsi > 90) {
  console.log('Продажа');
}

function sma(values, length) {
  const slice = values.slice(-length);
  const sum = slice.reduce((acc, val) => acc + val, 0);
  return sum / length;
}

console.log(`RSI: ${rsi}`)