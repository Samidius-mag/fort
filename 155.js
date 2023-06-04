const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));
const numberOfTrades = data.map(candle => parseFloat(candle.numberOfTrades));
const correlation = pearsonCorrelation(volume, numberOfTrades);

console.log('Correlation:', correlation);

function pearsonCorrelation(x, y) {
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] ** 2;
    sumY2 += y[i] ** 2;
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));

  return numerator / denominator;
}
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const averageNumberOfTrades = numberOfTrades.reduce((acc, val) => acc + val, 0) / numberOfTrades.length;

console.log('Average Volume:', averageVolume);
console.log('Average Number of Trades:', averageNumberOfTrades);