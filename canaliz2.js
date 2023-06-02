const prices = require('./price.json');

function calculateSMA(prices, period) {
  const sma = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
}

function calculateATR(highs, lows, closes, period) {
  const tr = [];
  for (let i = 1; i < highs.length; i++) {
    const h = highs[i];
    const l = lows[i];
    const pc = closes[i - 1];
    const c = closes[i];
    const trueRange = Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc));
    tr.push(trueRange);
  }
  const atr = calculateSMA(tr, period);
  return atr;
}

const highs = prices.map(price => price.high);
const lows = prices.map(price => price.low);
const closes = prices.map(price => price.close);

const sma20 = calculateSMA(closes, 20);
const sma50 = calculateSMA(closes, 50);
const sma100 = calculateSMA(closes, 100);

const atr = calculateATR(highs, lows, closes, 14);

const currentPrice = prices[prices.length - 1].close;
const currentSMA20 = sma20[sma20.length - 1];
const currentSMA50 = sma50[sma50.length - 1];
const currentSMA100 = sma100[sma100.length - 1];
const currentUpperChannel = currentSMA20 + (2 * atr[atr.length - 1]);
const currentLowerChannel = currentSMA20 - (2 * atr[atr.length - 1]);

const last5Days = prices.slice(-120);
const last5Highs = last5Days.map(price => price.high);
const last5Lows = last5Days.map(price => price.low);
const maxPrice = Math.max(...last5Highs);
const minPrice = Math.min(...last5Lows);

const channelUpper = maxPrice + (2 * atr[atr.length - 1]);
const channelLower = minPrice - (2 * atr[atr.length - 1]);

console.log(`Current price: ${currentPrice}`);
console.log(`Current SMA20: ${currentSMA20}`);
console.log(`Current SMA50: ${currentSMA50}`);
console.log(`Current SMA100: ${currentSMA100}`);
console.log(`Current Upper Channel: ${currentUpperChannel}`);
console.log(`Current Lower Channel: ${currentLowerChannel}`);

console.log(`Channel Upper: ${channelUpper}`);
console.log(`Channel Lower: ${channelLower}`);

console.log(`Last 5 days highs: ${last5Highs}`);
console.log(`Last 5 days lows: ${last5Lows}`);
console.log(`Max price: ${maxPrice}`);
console.log(`Min price: ${minPrice}`);