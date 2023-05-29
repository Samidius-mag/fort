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
const bodyLength1 = Math.abs(candle.open - candle.close);
const upperShadowLength1 = candle.high - Math.max(candle.open, candle.close);
const lowerShadowLength1 = Math.min(candle.open, candle.close) - candle.low;
const isBearishHammer = bodyLength1 < lowerShadowLength1 &&
  bodyLength1 <= candle1.high / 3 &&
  upperShadowLength1 <= bodyLength1 / 2;
console.log(`Is Bearish Hammer: ${isBearishHammer} ВНИЗ`);

//Доджи
const candle2 = data[data.length - 2];
const bodyLength2 = Math.abs(candle.open - candle.close);
const upperShadowLength2 = candle.high - Math.max(candle.open, candle.close);
const lowerShadowLength2 = Math.min(candle.open, candle.close) - candle.low;
const isDoji = bodyLength2 <= candle2.high * 0.1 &&
  upperShadowLength2 <= candle2.high * 0.1 &&
  lowerShadowLength2 <= candle2.high * 0.1;
console.log(`Is Doji: ${isDoji} ЛОВУШКА`);

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
const prevBodyLength1 = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength1 = Math.abs(lastCandle.open - lastCandle.close);
const isBearishEngulfing = lastCandle.close < prevCandle.open &&
  lastCandle1.open > prevCandle1.close &&
  lastBodyLength1 > prevBodyLength1 &&
  lastCandle1.high <= lastCandle1.close &&
  lastCandle1.low >= lastCandle1.open;
console.log(`Is Bearish Engulfing Pattern: ${isBearishEngulfing} ВНИЗ`);

// Поглощение БЫЧЬЕ
const prevCandle2 = data[data.length - 3];
const lastCandle2 = data[data.length - 2];
const prevBodyLength2 = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength2 = Math.abs(lastCandle.open - lastCandle.close);
const isBullishEngulfing = lastCandle.close > prevCandle.open &&
  lastCandle2.open < prevCandle2.close &&
  lastBodyLength2 > prevBodyLength2 &&
  lastCandle2.high <= lastCandle2.open &&
  lastCandle2.low >= lastCandle2.close;
console.log(`Is Bullish Engulfing Pattern: ${isBullishEngulfing} ВВЕРХ`);

//Пронизывающая 
const prevCandle3 = data[data.length - 3];
const lastCandle3 = data[data.length - 2];
const prevBodyLength3 = Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength3 = Math.abs(prevCandle.high - prevCandle.low);
const prevMidPrice3 = (prevCandle.open + prevCandle.close) / 2;
const lastBodyLength3 = Math.abs(lastCandle.open - lastCandle.close);
const isPiercingLine = lastCandle3.close > prevCandle3.open &&
  lastCandle3.open < prevCandle3.close &&
  lastCandle3.close > prevMidPrice3 &&
  lastBodyLength3 > prevBodyLength3 &&
  lastCandle3.high <= lastCandle3.open &&
  lastCandle3.low >= prevCandle3.low + prevShadowLength3 / 2;
console.log(`Is Piercing Line Pattern: ${isPiercingLine} РАЗВОРОТ`);

//Пинцет ТОП
const prevCandle4 = data[data.length - 2];
const lastCandle4 = data[data.length - 1];
const prevBodyLength4 = Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength4 = Math.abs(prevCandle.high - prevCandle.low);
const lastBodyLength4 = Math.abs(lastCandle.open - lastCandle.close);
const isTweezerTop = lastCandle4.close === prevCandle4.close &&
  lastCandle4.open > prevCandle4.close &&
  lastCandle4.close >= prevCandle4.close + prevBodyLength4 / 2 &&
  lastCandle4.high <= lastCandle4.open &&
  lastCandle4.low >= prevCandle4.low - prevShadowLength4 &&
  lastBodyLength4 <= prevBodyLength4;
console.log(`Is Tweezer Top Pattern: ${isTweezerTop} ВНИЗ`);

//Пинцет ДНО
const prevCandle5 = data[data.length - 2];
const lastCandle5 = data[data.length - 1];
const prevBodyLength5 = Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength5 = Math.abs(prevCandle.high - prevCandle.low);
const lastBodyLength5 = Math.abs(lastCandle.open - lastCandle.close);
const isTweezerBottom = lastCandle.close === prevCandle.close &&
  lastCandle5.open < prevCandle5.close &&
  lastCandle5.close <= prevCandle5.close - prevBodyLength5 / 2 &&
  lastCandle5.low >= lastCandle5.open &&
  lastCandle5.high <= prevCandle5.high + prevShadowLength5 &&
  lastBodyLength5 <= prevBodyLength5;
console.log(`Is Tweezer Bottom Pattern: ${isTweezerBottom} ВВЕРХ`);
