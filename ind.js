const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, ADX, OBV, PSAR, WMA } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const candles = JSON.parse(rawData);

const closePrices = candles.map(candle => candle.close);

const rsiPeriod = 14;
const rsiValues = RSI.calculate({ period: rsiPeriod, values: closePrices });

const emaPeriod = 20;
const emaValues = EMA.calculate({ period: emaPeriod, values: closePrices });

const rocPeriod = 12;
const rocValues = ROC.calculate({ period: rocPeriod, values: closePrices });

const bbPeriod = 20;
const bbValues = BollingerBands.calculate({ period: bbPeriod, values: closePrices, stdDev: 2 });

const adxPeriod = 14;
const adxValues = ADX.calculate({ period: adxPeriod, high: candles.map(candle => candle.high), low: candles.map(candle => candle.low), close: closePrices });

const obvValues = OBV.calculate({ close: closePrices, volume: candles.map(candle => candle.volume) });

const psarValues = PSAR.calculate({ high: candles.map(candle => candle.high), low: candles.map(candle => candle.low) });

const wmaPeriod = 10;
const wmaValues = WMA.calculate({ period: wmaPeriod, values: closePrices });
/*
console.log('RSI:', rsiValues);
console.log('EMA:', emaValues);
console.log('ROC:', rocValues);
console.log('Bollinger Bands:', bbValues);
console.log('ADX:', adxValues);
console.log('OBV:', obvValues);
console.log('PSAR:', psarValues);
console.log('WMA:', wmaValues);*/
const result = {

  RSI: rsiValues,

  EMA: emaValues,

  ROC: rocValues,

  'Bollinger Bands': bbValues,

  ADX: adxValues,

  OBV: obvValues,

  PSAR: psarValues,

  WMA: wmaValues,

};

fs.writeFileSync('indres.json', JSON.stringify(result));

console.log('Indicators saved to indres.json');
