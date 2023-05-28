const { bullishhammer } = require('technicalindicators');
const data = require('./price.json');

const input = {
  open: data.open.slice(-1),
  high: data.high.slice(-1),
  low: data.low.slice(-1),
  close: data.close.slice(-1)
};

const isBullishHammer = bullishhammer(input);
console.log('Is bullish hammer:', isBullishHammer);
