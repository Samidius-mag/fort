const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));
const numberOfTrades = data.map(candle => parseFloat(candle.numberOfTrades));
const correlation = pearsonCorrelation(volume, numberOfTrades);
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const averageNumberOfTrades = numberOfTrades.reduce((acc, val) => acc + val, 0) / numberOfTrades.length;
const currentVolume = volume[volume.length - 1];
const currentNumberOfTrades = numberOfTrades[numberOfTrades.length - 1];
const currentCorrelation = pearsonCorrelation(volume.slice(-10), numberOfTrades.slice(-10));

if (averageVolume > currentVolume && averageNumberOfTrades > currentNumberOfTrades && correlation >= currentCorrelation) {
  console.log('The market is moving sideways');
}

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
console.log('ср. Объем:', averageVolume);
console.log('Объем:', currentVolume);
console.log('ср .Трейдеры:', averageNumberOfTrades);
console.log('Трейдеры:', currentNumberOfTrades);
console.log('ср. Correlation:', correlation);
console.log('Correlation:', currentCorrelation);