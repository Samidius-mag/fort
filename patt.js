const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
//Бычий молот
const candle = data[data.length - 2];
const bodyLength = Math.abs(candle.open - candle.close);
const upperShadowLength = candle.high - Math.max(candle.open, candle.close);
const lowerShadowLength = Math.min(candle.open, candle.close) - candle.low;
const isBullishHammer = bodyLength < upperShadowLength &&
  bodyLength <= candle.high / 3 &&
  lowerShadowLength <= bodyLength / 2;
console.log(`Is Bullish Hammer: ${isBullishHammer} ВВЕРХ`);

//Медвежий молот
const candle1 = data[data.length - 2];
const bodyLength1 = Math.abs(candle1.open - candle1.close);
const upperShadowLength1 = candle1.high - Math.max(candle1.open, candle1.close);
const lowerShadowLength1 = Math.min(candle1.open, candle1.close) - candle1.low;
const isBearishHammer = bodyLength1 < lowerShadowLength1 &&
  bodyLength1 <= candle1.high / 3 &&
  upperShadowLength1 <= bodyLength1 / 2;
console.log(`Is Bearish Hammer: ${isBearishHammer} ВНИЗ`);

//Доджи
const candle2 = data[data.length - 2];
const bodyLength2 = Math.abs(candle2.open - candle2.close);
const upperShadowLength2 = candle2.high - Math.max(candle2.open, candle2.close);
const lowerShadowLength2 = Math.min(candle2.open, candle2.close) - candle2.low;
const isDoji = bodyLength2 <= candle2.high * 0.1 &&
  upperShadowLength2 <= candle2.high * 0.1 &&
  lowerShadowLength2 <= candle2.high * 0.1;
console.log(`Is Doji: ${isDoji} РАЗВОРОТ`);

//Завеса из облаков
const prevCandle = data[data.length - 3];
const lastCandle = data[data.length - 2];
const avgClose = (prevCandle.close + lastCandle.close) / 2;
const prevBodyLength = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength = Math.abs(lastCandle.open - lastCandle.close);
const isDarkCloudCover = lastCandle.close < avgClose &&
  lastCandle.open > prevCandle.close &&
  lastCandle.close < prevCandle.open &&
  lastBodyLength >= prevBodyLength * 0.5;
console.log(`Is Dark Cloud Cover: ${isDarkCloudCover} ВНИЗ`);

// Поглощение МЕДВЕЖЬЕ
const prevCandle1 = data[data.length - 3];
const lastCandle1 = data[data.length - 2];
const prevBodyLength1 = Math.abs(prevCandle1.open - prevCandle1.close);
const lastBodyLength1 = Math.abs(lastCandle1.open - lastCandle1.close);
const isBearishEngulfing = lastCandle1.close < prevCandle1.open &&
  lastCandle1.open > prevCandle1.close &&
  lastBodyLength1 > prevBodyLength1 &&
  lastCandle1.high <= lastCandle1.close &&
  lastCandle1.low >= lastCandle1.open;
console.log(`Is Bearish Engulfing Pattern: ${isBearishEngulfing} ВНИЗ`);

// Поглощение БЫЧЬЕ
const prevCandle2 = data[data.length - 3];
const lastCandle2 = data[data.length - 2];
const prevBodyLength2 = Math.abs(prevCandle2.open - prevCandle2.close);
const lastBodyLength2 = Math.abs(lastCandle2.open - lastCandle2.close);
const isBullishEngulfing = lastCandle2.close > prevCandle2.open &&
  lastCandle2.open < prevCandle2.close &&
  lastBodyLength2 > prevBodyLength2 &&
  lastCandle2.high <= lastCandle2.open &&
  lastCandle2.low >= lastCandle2.close;
console.log(`Is Bullish Engulfing Pattern: ${isBullishEngulfing} ВВЕРХ`);
