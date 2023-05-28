const fs = require('fs');
const { tweezertop, tweezerbottom, doji } = require('technicalindicators');

const data = JSON.parse(fs.readFileSync('price.json'));

const input = {
  open: data.map(candle => candle.open),
  high: data.map(candle => candle.high),
  low: data.map(candle => candle.low),
  close: data.map(candle => candle.close),
  
};
/*
const lastCandle = {
  open: input.open[input.open.length - 2],
  high: input.high[input.high.length - 2],
  low: input.low[input.low.length - 2],
  close: input.close[input.close.length - 2],
};
*/
const resultTop = tweezertop(input);
const resultBottom = tweezerbottom(input);
const resultDoji = doji(input);
//const resultBullishInvertedHammer = bullishhammer(input);
//const resultBearishInvertedHammer = bearishhammer(input);

console.log(`Tweezer Top patterns found: ${resultTop.length}`);
console.log(`Tweezer Bottom patterns found: ${resultBottom.length}`);
console.log(`Doji patterns found: ${resultDoji.length}`);
//console.log(`Bullish Inverted Hammer patterns found: ${resultBullishInvertedHammer.length}`);
//console.log(`Bearish Inverted Hammer patterns found: ${resultBearishInvertedHammer.length}`);
