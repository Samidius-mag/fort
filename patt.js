const fs = require('fs');
const { tweezertop, tweezerbottom } = require('technicalindicators');

const data = JSON.parse(fs.readFileSync('price.json'));

const input = {
  open: data.map(candle => candle.open),
  high: data.map(candle => candle.high),
  low: data.map(candle => candle.low),
  close: data.map(candle => candle.close),
  volume: data.map(candle => candle.volume),
};

const resultTop = tweezertop(input);
const resultBottom = tweezerbottom(input);

console.log(`Tweezer Top patterns found: ${resultTop.length}`);
console.log(`Tweezer Bottom patterns found: ${resultBottom.length}`);
