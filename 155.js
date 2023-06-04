const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => candle[5]);
const numberOfTrades = data.map(candle => candle[8]);

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