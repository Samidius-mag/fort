const fs = require('fs');
const _ = require('lodash');

const data = JSON.parse(fs.readFileSync('price.json'));

const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);
const mean = (arr) => sum(arr) / arr.length;

const x = data.map(candle => [candle.open, candle.high, candle.low, candle.close, candle.volume]);
const y = data.map(candle => [candle.open, candle.high, candle.low, candle.close, candle.volume]);

const n = x.length;
const k = x[0].length;

const xT = _.zip(...x);
const yT = _.zip(...y);

const xTx = _.multiply(xT, x);
const xTy = _.multiply(xT, y);

const beta = _.multiply(_.invert(xTx), xTy);

const yHat = _.multiply(x, beta);

const residuals = _.subtract(y, yHat);

const sse = sum(residuals.map(row => sum(row.map(val => val ** 2))));
const sst = sum(y.map(row => sum(row.map(val => (val - mean(row)) ** 2))));
const r2 = 1 - sse / sst;

const avgOpen = mean(data.map(candle => candle.open));
const avgHigh = mean(data.map(candle => candle.high));
const avgLow = mean(data.map(candle => candle.low));
const avgClose = mean(data.map(candle => candle.close));
const avgVolume = mean(data.map(candle => candle.volume));

console.log(`Average open: ${avgOpen}`);
console.log(`Average high: ${avgHigh}`);
console.log(`Average low: ${avgLow}`);
console.log(`Average close: ${avgClose}`);
console.log(`Average volume: ${avgVolume}`);
console.log(`R-squared: ${r2}`);