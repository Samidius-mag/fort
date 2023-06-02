const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const prices = data.map(candle => parseFloat(candle.close));
const highs = data.map(candle => parseFloat(candle.high));
const lows = data.map(candle => parseFloat(candle.low));

const sma20 = calculateSMA(prices, 20);
const sma50 = calculateSMA(prices, 50);
const sma100 = calculateSMA(prices, 100);

const atr = calculateATR(highs, lows, prices, 14);

const upperChannel = sma20.map((sma, index) => sma + 2 * atr[index]);
const lowerChannel = sma20.map((sma, index) => sma - 2 * atr[index]);


const currentPrice = prices[prices.length - 1];
const currentSMA20 = sma20[sma20.length - 1];
const currentSMA50 = sma50[sma50.length - 1];
const currentSMA100 = sma100[sma100.length - 1];
const currentUpperChannel = upperChannel[upperChannel.length - 1];
const currentLowerChannel = lowerChannel[lowerChannel.length - 1];
const midChannel = (currentUpperChannel + currentLowerChannel) / 2;

let trend = '';
if (currentPrice > currentSMA20 && currentSMA20 > currentSMA50 && currentSMA50 > currentSMA100) {
  trend = 'Восходящий';
} else if (currentPrice < currentSMA20 && currentSMA20 < currentSMA50 && currentSMA50 < currentSMA100) {
  trend = 'Нисходящий';
} else {
  trend = 'Боковой';
}

console.log(`Тренд: ${trend}`);
console.log(`Цена: ${currentPrice.toFixed(2)}`);
console.log(`SMA20: ${currentSMA20.toFixed(2)}`);
console.log(`SMA50: ${currentSMA50.toFixed(2)}`);
console.log(`SMA100: ${currentSMA100.toFixed(2)}`);
console.log(`Верх канала: ${currentUpperChannel.toFixed(2)}`);
console.log(`Середина канала: ${midChannel.toFixed(2)}`);
console.log(`Низ канала: ${currentLowerChannel.toFixed(2)}`);


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