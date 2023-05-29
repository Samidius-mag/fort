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

const candle1 = data[data.length - 2];

const bodyLength1 = Math.abs(candle1.open - candle1.close);
const upperShadowLength1 = candle1.high - Math.max(candle1.open, candle1.close);
const lowerShadowLength1 = Math.min(candle1.open, candle1.close) - candle1.low;

const isBearishHammer = bodyLength1 < lowerShadowLength1 &&
  bodyLength1 <= candle1.high / 3 &&
  upperShadowLength1 <= bodyLength1 / 2;

console.log(`Is Bearish Hammer: ${isBearishHammer}`);

const candle2 = data[data.length - 2];

const bodyLength2 = Math.abs(candle2.open - candle2.close);
const upperShadowLength2 = candle2.high - Math.max(candle2.open, candle2.close);
const lowerShadowLength2 = Math.min(candle2.open, candle2.close) - candle2.low;

const isDoji = bodyLength2 <= candle2.high * 0.1 &&
  upperShadowLength2 <= candle2.high * 0.1 &&
  lowerShadowLength2 <= candle2.high * 0.1;

console.log(`Is Doji: ${isDoji}`);
