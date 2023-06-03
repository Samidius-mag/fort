const fs = require('fs');
const data = JSON.parse(fs.readFileSync('price.json', 'utf8'));

function quadraticRegression(x, y) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumX2 = 0;
  let sumX3 = 0;
  let sumX4 = 0;
  let sumXY = 0;
  let sumX2Y = 0;

  for (let i = 0; i < n; i++) {
    const xi = x[i];
    const yi = y[i];
    const xi2 = xi * xi;
    const xi3 = xi2 * xi;
    const xi4 = xi3 * xi;

    sumX += xi;
    sumY += yi;
    sumX2 += xi2;
    sumX3 += xi3;
    sumX4 += xi4;
    sumXY += xi * yi;
    sumX2Y += xi2 * yi;
  }

  const denominator = n * sumX2 * sumX4 - n * sumX3 * sumX3 - sumX2 * sumX2 * sumX2 + 2 * sumX * sumX2 * sumX3 - n * sumX * sumX4;
  const a = (n * sumX2Y * sumX4 - n * sumXY * sumX3 - sumX2 * sumY * sumX4 + sumX * sumXY * sumX4 + sumX2 * sumX3 * sumY - sumX2Y * sumX2 * sumX) / denominator;
  const b = (n * sumXY * sumX2 - sumX * sumX2Y - n * sumX3 * sumY + sumX * sumX3 * sumY + sumX2 * sumX * sumY - sumXY * n) / denominator;
  const c = (sumY * sumX2 * sumX4 - sumY * sumX3 * sumX3 - sumX2 * sumX2 * sumY * n + sumX * sumX2 * sumX3 * sumY + sumX2 * sumX2 * sumY * sumX - sumX * sumX4 * sumY) / denominator;

  return [a, b, c];
}

const prices = data.map(candle => candle.close);
const lows = data.map(candle => candle.low);
const highs = data.map(candle => candle.high);
const volumes = data.map(candle => candle.volume);

const time = Array.from({ length: data.length }, (_, i) => i);

const [aPrice, bPrice, cPrice] = quadraticRegression(time, prices);
const [aLow, bLow, cLow] = quadraticRegression(time, lows);
const [aHigh, bHigh, cHigh] = quadraticRegression(time, highs);
const [aVolume, bVolume, cVolume] = quadraticRegression(time, volumes);

function predict(a, b, c, x) {
  return a * x * x + b * x + c;
}

const timeToPredict = 10;

const predictedPrice = predict(aPrice, bPrice, cPrice, timeToPredict);
const predictedLow = predict(aLow, bLow, cLow, timeToPredict);
const predictedHigh = predict(aHigh, bHigh, cHigh, timeToPredict);
const predictedVolume = predict(aVolume, bVolume, cVolume, timeToPredict);

console.log(`Predicted price: ${predictedPrice}`);
console.log(`Predicted low: ${predictedLow}`);
console.log(`Predicted high: ${predictedHigh}`);
console.log(`Predicted volume: ${predictedVolume}`);