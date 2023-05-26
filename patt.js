const fs = require('fs');
const { bearishengulfingpattern, bullishEngulfingPattern, doji, bullishHammer, bearishHammer } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const candles = JSON.parse(rawData);

const lastFiveCandles = candles.slice(-5);

const bearishEngulfing = bearishengulfingpattern(lastFiveCandles);
const bullishEngulfing = bullishEngulfingPattern(lastFiveCandles);
const dojiPattern = doji(lastFiveCandles);
const bullishHammerPattern = bullishHammer(lastFiveCandles);
const bearishHammerPattern = bearishHammer(lastFiveCandles);

const result = {
  'Bearish Engulfing Pattern': bearishEngulfing,
  'Bullish Engulfing Pattern': bullishEngulfing,
  'Doji Pattern': dojiPattern,
  'Bullish Hammer Pattern': bullishHammerPattern,
  'Bearish Hammer Pattern': bearishHammerPattern,
};

fs.writeFileSync('pattres.json', JSON.stringify(result));
console.log('Patterns saved to pattres.json');
