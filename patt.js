const { bullishhammer } = require('technicalindicators');
const data = require('./price.json');

const input = {
  open: data.open.slice(-2),
  high: data.high.slice(-2),
  low: data.low.slice(-2),
  close: data.close.slice(-2)
};

const isBullishHammer = bullishhammer(input);
console.log('Is bullish hammer:', isBullishHammer);
