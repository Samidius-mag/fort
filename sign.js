const fs = require('fs');
const data = JSON.parse(fs.readFileSync('price.json'));

const close = data.map(candle => parseFloat(candle.close));
const ma5 = sma(close, 5);
const ma200 = sma(close, 200);
const changeSrc = close.map((value, index, array) => index === 0 ? 0 : value - array[index - 1]);
const up = rma(max(changeSrc, 0), 2);
const down = rma(-min(changeSrc, 0), 2);
const rsi = down === 0 ? 100 : up === 0 ? 0 : 100 - (100 / (1 + up / down));

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

function max(values, length) {
  const slice = values.slice(-length);
  return Math.max(...slice);
}

function min(values, length) {
  const slice = values.slice(-length);
  return Math.min(...slice);
}

function rma(values, length) {
  const slice = values.slice(-length);
  const sum = slice.reduce((acc, val) => acc + val, 0);
  return sum / length;
}

console.log(`RSI: ${rsi}`)