const fs = require('fs');
const { EMA, SMA } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const ema200 = EMA.calculate({ period: 200, values: data.map(candle => parseFloat(candle.close)) });
const ma200 = SMA.calculate({ period: 200, values: data.map(candle => parseFloat(candle.close)) });
const ema5 = EMA.calculate({ period: 5, values: data.map(candle => parseFloat(candle.close)) });

const result = [];

for (let i = 0; i < data.length; i++) {
  const ema200Value = ema200[i];
  const ma200Value = ma200[i];
  const ema5Value = ema5[i];

  if (ema200Value > ma200Value && ma200Value > ema5Value && ema200Value > ema5Value) {
    result.push({
      time: data[i].time,
      ema200: ema200Value,
      ma200: ma200Value,
      ema5: ema5Value,
      direction: 'down',
    });
  } else if (ema200Value < ma200Value && ma200Value < ema5Value && ema200Value < ema5Value) {
    result.push({
      time: data[i].time,
      ema200: ema200Value,
      ma200: ma200Value,
      ema5: ema5Value,
      direction: 'up',
    });
  }
}

console.log('Results:');
console.log(result);

fs.writeFileSync('emamares.json', JSON.stringify(result));
console.log('Results saved successfully');