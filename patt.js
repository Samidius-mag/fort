const fs = require('fs');
const { CandlestickFinder } = require('technicalindicators');

const priceData = JSON.parse(fs.readFileSync('price.json'));

const bearishEngulfingPattern = new CandlestickFinder.BearishEngulfingPattern();
const bullishEngulfingPattern = new CandlestickFinder.BullishEngulfingPattern();
const doji = new CandlestickFinder.Doji();
const bullishHammer = new CandlestickFinder.BullishHammer();
const bearishHammer = new CandlestickFinder.BearishHammer();

const last5Candles = priceData.slice(-5);

const patternResults = last5Candles.map(candle => {
  const bearishEngulfing = bearishEngulfingPattern.hasPattern([candle]);
  const bullishEngulfing = bullishEngulfingPattern.hasPattern([candle]);
  const isDoji = doji.hasPattern([candle]);
  const isBullishHammer = bullishHammer.hasPattern([candle]);
  const isBearishHammer = bearishHammer.hasPattern([candle]);

  return {
    date: candle.date,
    bearishEngulfing,
    bullishEngulfing,
    isDoji,
    isBullishHammer,
    isBearishHammer,
  };
});

fs.writeFileSync('pattres.json', JSON.stringify(patternResults, null, 2));
