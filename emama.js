const _ = require('lodash');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const ema200 = _.map(_.reverse(_.slice(data, 0, 200)), (candle, index) => {
  const closePrices = _.map(_.slice(data, index, index + 200), 'close');
  return _.round(_.sum(closePrices) / 200, 2);
});

const ma200 = _.map(_.reverse(_.slice(data, 0, 200)), (candle, index) => {
  const closePrices = _.map(_.slice(data, index, index + 200), 'close');
  return _.round(_.sum(closePrices) / 200, 2);
});

const ema5 = _.map(_.reverse(_.slice(data, 0, 5)), (candle, index) => {
  const closePrices = _.map(_.slice(data, index, index + 5), 'close');
  return _.round(_.sum(closePrices) / 5, 2);
});

const result = _.filter(data, (candle, index) => {
  const ema200Up = ema200[index] > ma200[index] && ma200[index] > ema5[index] && ema200[index] > ema5[index];
  const ema200Down = ema200[index] < ma200[index] && ma200[index] < ema5[index] && ema200[index] < ema5[index];
  return ema200Up || ema200Down;
});

fs.writeFileSync('emamares.json', JSON.stringify(result));
console.log('Data saved to emamares.json');