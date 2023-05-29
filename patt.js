const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
//Бычий молот
const prevCandle = data[data.length - 3];
const lastCandle = data[data.length - 2];
const lastBodyLength = Math.abs(lastCandle.open - lastCandle.close);
const lastLowerShadowLength = Math.abs(lastCandle.low - Math.min(lastCandle.open, lastCandle.close));
const isBullishHammer = lastCandle.close > lastCandle.open &&
  lastCandle.close > prevCandle.high &&
  lastCandle.close > prevCandle.low &&
  lastCandle.open < lastCandle.close &&
  lastLowerShadowLength >= lastBodyLength * 2 / 3;
console.log(`Is Bullish Hammer: ${isBullishHammer} ВВЕРХ`);

//Медвежий молот
const prevCandle1 = data[data.length - 3];
const lastCandle1 = data[data.length - 2];
const lastBodyLength1 = Math.abs(lastCandle.open - lastCandle.close);
const lastUpperShadowLength1 = Math.abs(lastCandle.high - Math.max(lastCandle.open, lastCandle.close));
const isBearishHammer = lastCandle1.close < lastCandle1.open &&
  lastCandle1.close < prevCandle1.high &&
  lastCandle1.close < prevCandle1.low &&
  lastCandle1.open > lastCandle1.close &&
  lastUpperShadowLength1 >= lastBodyLength1 * 2 / 3;
console.log(`Is Bearish Hammer: ${isBearishHammer} ВНИЗ`);

//Доджи
const prevCandle8 = data[data.length - 3];
const lastCandle8 = data[data.length - 2];
const avgPrice8 = (lastCandle.open + lastCandle.close) / 2;
const priceDiff8 = Math.abs(lastCandle.open - lastCandle.close);
const bodyLength8 = Math.abs(lastCandle.open - lastCandle.close);
const shadowLength8 = Math.abs(lastCandle.high - lastCandle.low);
const isDoji = priceDiff8 <= avgPrice8 * 0.01 &&
  bodyLength8 <= shadowLength8 * 0.1;
console.log(`Is Doji: ${isDoji} ЛОВУШКА`);

//Завеса из облаков
const prevCandle2 = data[data.length - 3];
const lastCandle2 = data[data.length - 2];
const avgClose2 = (prevCandle.close + lastCandle.close) / 2;
const prevBodyLength2 = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength2 = Math.abs(lastCandle.open - lastCandle.close);
const isDarkCloudCover = lastCandle2.close < avgClose2 &&
  lastCandle2.open > prevCandle2.close &&
  lastCandle2.close < prevCandle2.open &&
  lastBodyLength2 >= prevBodyLength2 * 0.5;
console.log(`Is Dark Cloud Cover: ${isDarkCloudCover} ВНИЗ`);

// Поглощение МЕДВЕЖЬЕ
const prevCandle3 = data[data.length - 3];
const lastCandle3 = data[data.length - 2];
const prevBodyLength3 = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength3 = Math.abs(lastCandle.open - lastCandle.close);
const isBearishEngulfing = lastCandle3.close < prevCandle3.open &&
  lastCandle3.open > prevCandle3.close &&
  lastBodyLength3 > prevBodyLength3 &&
  lastCandle3.high <= lastCandle3.close &&
  lastCandle3.low >= lastCandle3.open;
console.log(`Is Bearish Engulfing Pattern: ${isBearishEngulfing} ВНИЗ`);

// Поглощение БЫЧЬЕ
const prevCandle4 = data[data.length - 3];
const lastCandle4 = data[data.length - 2];
const prevBodyLength4 = Math.abs(prevCandle.open - prevCandle.close);
const lastBodyLength4 = Math.abs(lastCandle.open - lastCandle.close);
const isBullishEngulfing = lastCandle4.close > prevCandle4.open &&
  lastCandle4.open < prevCandle4.close &&
  lastBodyLength4 > prevBodyLength4 &&
  lastCandle4.high <= lastCandle4.open &&
  lastCandle4.low >= lastCandle4.close;
console.log(`Is Bullish Engulfing Pattern: ${isBullishEngulfing} ВВЕРХ`);

//Пронизывающая 
const prevCandle5= data[data.length - 3];
const lastCandle5= data[data.length - 2];
const prevBodyLength5= Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength5 =Math.abs(prevCandle.high - prevCandle.low);
const prevMidPrice5= (prevCandle.open + prevCandle.close) / 2;
const lastBodyLength5= Math.abs(lastCandle.open - lastCandle.close);
const isPiercingLine = lastCandle5.close > prevCandle5.open &&
  lastCandle5.open < prevCandle5.close &&
  lastCandle5.close > prevMidPrice5 &&
  lastBodyLength5 > prevBodyLength5 &&
  lastCandle5.high <= lastCandle5.open &&
  lastCandle5.low >= prevCandle5.low + prevShadowLength5 / 2;
console.log(`Is Piercing Line Pattern: ${isPiercingLine} РАЗВОРОТ`);

//Пинцет ТОП
const prevCandle6 = data[data.length - 2];
const lastCandle6 = data[data.length - 1];
const prevBodyLength6 = Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength6 = Math.abs(prevCandle.high - prevCandle.low);
const lastBodyLength6 = Math.abs(lastCandle.open - lastCandle.close);
const isTweezerTop = lastCandle6.close === prevCandle6.close &&
  lastCandle6.open > prevCandle6.close &&
  lastCandle6.close >= prevCandle6.close + prevBodyLength6 / 2 &&
  lastCandle6.high <= lastCandle6.open &&
  lastCandle6.low >= prevCandle6.low - prevShadowLength6 &&
  lastBodyLength6 <= prevBodyLength6;
console.log(`Is Tweezer Top Pattern: ${isTweezerTop} ВНИЗ`);

//Пинцет ДНО
const prevCandle7 = data[data.length - 2];
const lastCandle7 = data[data.length - 1];
const prevBodyLength7 = Math.abs(prevCandle.open - prevCandle.close);
const prevShadowLength7 = Math.abs(prevCandle.high - prevCandle.low);
const lastBodyLength7 = Math.abs(lastCandle.open - lastCandle.close);
const isTweezerBottom = lastCandle7.close === prevCandle7.close &&
  lastCandle7.open < prevCandle7.close &&
  lastCandle7.close <= prevCandle7.close - prevBodyLength7 / 2 &&
  lastCandle7.low >= lastCandle7.open &&
  lastCandle7.high <= prevCandle7.high + prevShadowLength7 &&
  lastBodyLength7 <= prevBodyLength7;
console.log(`Is Tweezer Bottom Pattern: ${isTweezerBottom} ВВЕРХ`);
