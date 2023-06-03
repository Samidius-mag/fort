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

const minimizePrice = math.minimize({
  objective: (params) => math.meanSquaredError(yPrice, math.evaluate(model, { a: params[0], b: params[1], c: params[2], d: avgPrice }, x)),
  x0: [1, 0.01, 0],
});
const minimizeMin = math.minimize({
  objective: (params) => math.meanSquaredError(yMin, math.evaluate(model, { a: params[0], b: params[1], c: params[2], d: avgMin }, x)),
  x0: [1, 0.01, 0],
});
const minimizeMax = math.minimize({
  objective: (params) => math.meanSquaredError(yMax, math.evaluate(model, { a: params[0], b: params[1], c: params[2], d: avgMax }, x)),
  x0: [1, 0.01, 0],
});
const minimizeVolume = math.minimize({
  objective: (params) => math.meanSquaredError(yVolume, math.evaluate(model, { a: params[0], b: params[1], c: params[2], d: avgVolume }, x)),
  x0: [1, 0.01, 0],
});

const resultPrice = minimizePrice.solution;
const resultMin = minimizeMin.solution;
const resultMax = minimizeMax.solution;
const resultVolume = minimizeVolume.solution;

const aPrice = resultPrice.coefficients[0];
const bPrice = resultPrice.coefficients[1];
const cPrice = resultPrice.coefficients[2];
const dPrice = resultPrice.coefficients[3];

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