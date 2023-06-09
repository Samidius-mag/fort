const fs = require('fs');

const candles = JSON.parse(fs.readFileSync('price.json'));

function bullishEngulfing(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  return prevCandle && candle.close > prevCandle.open && candle.open < prevCandle.close && candle.close > candle.open && candle.close > prevCandle.open && candle.open < prevCandle.close;
}

function bullishHarami(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  return prevCandle && candle.close < prevCandle.open && candle.open > prevCandle.close && candle.close > prevCandle.close && candle.open < prevCandle.open;
}

function bullishHammer(candle) {
  return candle.close > candle.open && (candle.close - candle.low) / (0.001 + candle.high - candle.low) > 0.6 && (candle.close - candle.low) / (0.001 + candle.high - candle.low) < 0.7 && (2 * (candle.close - candle.open)) / (candle.high - candle.low) > 1 && (candle.open - candle.low) / (0.001 + candle.high - candle.low) > 0.1;
}

function invertedHammer(candle) {
  return candle.close > candle.open && (candle.close - candle.low) / (0.001 + candle.high - candle.low) > 0.6 && (candle.close - candle.low) / (0.001 + candle.high - candle.low) < 0.7 && (2 * (candle.close - candle.open)) / (candle.high - candle.low) > 1 && (candle.high - candle.open) / (0.001 + candle.high - candle.low) > 0.1;
}

function morningStar(candle) {
  const prevCandle = candles[candles.indexOf(candle) - 1];
  const prevPrevCandle = candles[candles.indexOf(candle) - 2];
  return prevPrevCandle && prevCandle && candle.close < prevPrevCandle.close && candle.close < prevPrevCandle.open && candle.close < prevCandle.open && candle.open > prevCandle.close && candle.close > prevCandle.close && candle.open < prevCandle.open && (prevCandle.close - prevCandle.open) / (0.001 + prevCandle.high - prevCandle.low) > 0.6 && (candle.close - candle.open) / (0.001 + candle.high - candle.low) > 0.6;
}

const lastCandles = candles.slice(-3);

const bullishEngulfingCandles = lastCandles.filter(bullishEngulfing);
console.log(`🔼Бычье поглощение: ${bullishEngulfingCandles.length}`);

const bullishHaramiCandles = lastCandles.filter(bullishHarami);
console.log(`🔼Бычье харами: ${bullishHaramiCandles.length}`);

const bullishHammerCandles = lastCandles.filter(bullishHammer);
console.log(`🔼Бычий молот: ${bullishHammerCandles.length}`);

const invertedHammerCandles = lastCandles.filter(invertedHammer);
console.log(`🔼Перевернутый молот: ${invertedHammerCandles.length}`);

const morningStarCandles = lastCandles.filter(morningStar);
console.log(`🔼Утренняя звезда: ${morningStarCandles.length}`);