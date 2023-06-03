const fs = require('fs');
const math = require('mathjs');

const data = JSON.parse(fs.readFileSync('price.json'));

const n = data.length;

let sumPrice = 0;
let sumMin = 0;
let sumMax = 0;
let sumVolume = 0;

for (let i = 0; i < n; i++) {
  sumPrice += data[i].close;
  sumMin += data[i].low;
  sumMax += data[i].high;
  sumVolume += data[i].volume;
}

const avgPrice = sumPrice / n;
const avgMin = sumMin / n;
const avgMax = sumMax / n;
const avgVolume = sumVolume / n;

function model(x, a, b, c, d) {
  return a * Math.sin(b * x + c) + d;
}

const x = math.range(0, n, true).toArray();
const yPrice = data.map(candle => candle.close);
const yMin = data.map(candle => candle.low);
const yMax = data.map(candle => candle.high);
const yVolume = data.map(candle => candle.volume);

const regressionPrice = math.regression(model, x, yPrice, [1, 0.01, 0, avgPrice]);
const regressionMin = math.regression(model, x, yMin, [1, 0.01, 0, avgMin]);
const regressionMax = math.regression(model, x, yMax, [1, 0.01, 0, avgMax]);
const regressionVolume = math.regression(model, x, yVolume, [1, 0.01, 0, avgVolume]);

const resultPrice = regressionPrice.equation;
const resultMin = regressionMin.equation;
const resultMax = regressionMax.equation;
const resultVolume = regressionVolume.equation;

const aMin = resultMin.coefficients[0];
const bMin = resultMin.coefficients[1];
const cMin = resultMin.coefficients[2];
const dMin = resultMin.coefficients[3];

const aMax = resultMax.coefficients[0];
const bMax = resultMax.coefficients[1];
const cMax = resultMax.coefficients[2];
const dMax = resultMax.coefficients[3];

const aVolume = resultVolume.coefficients[0];
const bVolume = resultVolume.coefficients[1];
const cVolume = resultVolume.coefficients[2];
const dVolume = resultVolume.coefficients[3];

const nextHour = n;
const nextHourPrice = model(nextHour, aPrice, bPrice, cPrice, dPrice);
const nextHourMin = model(nextHour, aMin, bMin, cMin, dMin);
const nextHourMax = model(nextHour, aMax, bMax, cMax, dMax);
const nextHourVolume = model(nextHour, aVolume, bVolume, cVolume, dVolume);

console.log(`Прогноз на следующий час:
Средняя цена: ${nextHourPrice}
Минимальная цена: ${nextHourMin}
Максимальная цена: ${nextHourMax}
Объем торгов: ${nextHourVolume}`);