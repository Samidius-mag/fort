const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const candle = data[data.length - 2];

const bodyLength = Math.abs(candle.open - candle.close);
const upperShadowLength = candle.high - Math.max(candle.open, candle.close);
const lowerShadowLength = Math.min(candle.open, candle.close) - candle.low;

const isBullishHammer = bodyLength < upperShadowLength &&
  bodyLength <= candle.high / 3 &&
  lowerShadowLength <= bodyLength / 2;

console.log(`Is Bullish Hammer: ${isBullishHammer}`);

const candle = data[data.length - 2];

const bodyLength = Math.abs(candle.open - candle.close);
const upperShadowLength = candle.high - Math.max(candle.open, candle.close);
const lowerShadowLength = Math.min(candle.open, candle.close) - candle.low;

const isBearishHammer = bodyLength < lowerShadowLength &&
  bodyLength <= candle.high / 3 &&
  upperShadowLength <= bodyLength / 2;

console.log(`Is Bearish Hammer: ${isBearishHammer}`);
