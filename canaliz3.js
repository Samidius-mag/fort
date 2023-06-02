const data = require('./price.json');
const fs = require('fs');

const lastCandle = data[data.length - 1];
const prevCandle = data[data.length - 2];

let trend = '';
if (lastCandle.close > prevCandle.close) {
  trend = 'up';
} else if (lastCandle.close < prevCandle.close) {
  trend = 'down';
} else {
  trend = 'sideways';
}

console.log(`Current trend: ${trend}`);

const days = 5;
const channel = [];

for (let i = data.length - 1; i >= data.length - days * 24; i--) {
  const candle = data[i];
  const high = Math.max(candle.high, candle.open, candle.close);
  const low = Math.min(candle.low, candle.open, candle.close);
  channel.push({ high, low });
}

//console.log(`Price channel for the last ${days} days:`, channel);

const lastHigh = channel[channel.length - 1].high;
const lastLow = channel[channel.length - 1].low;

const nextHigh = lastHigh + (lastHigh - lastLow);
const nextLow = lastLow - (lastHigh - lastLow);

channel.push({ high: nextHigh, low: nextLow });

//console.log(`Price channel for the next day:`, channel);

const max = Math.max(...channel.map(candle => candle.high));
const min = Math.min(...channel.map(candle => candle.low));

console.log(`Maximum: ${max}, Minimum: ${min}`);

fs.writeFile('canalizres.json', JSON.stringify({ channel, max, min }), err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Data has been saved to canalizres.json');
});