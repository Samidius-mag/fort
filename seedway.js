const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const resistanceData = data.slice(-2); // данные за последние 2 часа (120 свечей)
const supportData = data.slice(-4); // данные за последние 4 часа (240 свечей)

const resistanceLine = findTrendLine(resistanceData);
const supportLine = findTrendLine(supportData);

console.log(`Resistance line: y = ${resistanceLine.slope}x + ${resistanceLine.intercept}`);
console.log(`Support line: y = ${supportLine.slope}x + ${supportLine.intercept}`);

function findTrendLine(data) {
  const x = data.map((candle, index) => index);
  const y = data.map(candle => candle.close);

  const n = x.length;
  const sumX = x.reduce((sum, value) => sum + value, 0);
  const sumY = y.reduce((sum, value) => sum + value, 0);
  const sumXY = x.reduce((sum, value, index) => sum + value * y[index], 0);
  const sumX2 = x.reduce((sum, value) => sum + value * value, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

const resistanceLines = []; // пустой массив для хранения линий сопротивления

const previousResistanceLine = resistanceLines.slice(-2)[0];
const previousSupportLine = supportLines.slice(-2)[0];

if (resistanceLine.intercept <= previousSupportLine.intercept || supportLine.intercept >= previousResistanceLine.intercept) {
  console.log('Trend is sideways');
} else if (resistanceLine.slope > supportLine.slope) {
  console.log('Trend is up');
} else {
  console.log('Trend is down');
}