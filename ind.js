const { RSI, EMA, ROC, BollingerBands, OBV, PSAR, WMA } = require('technicalindicators');
const priceData = require('./price4h.json');

const close = priceData.map(candle => parseFloat(candle.close));
const volume = priceData.map(candle => parseFloat(candle.volume));

// RSI
const rsiPeriod = 14;
const rsiValues = RSI.calculate({ period: rsiPeriod, values: close });
const rsi = rsiValues.map(value => parseFloat(value.toFixed(2)));

// EMA
const emaPeriod = 21;
const emaValues = EMA.calculate({ period: emaPeriod, values: close });
const ema = emaValues.map(value => parseFloat(value.toFixed(2)));

// ROC
const rocPeriod = 21;
const rocValues = ROC.calculate({ period: rocPeriod, values: close });
const roc = rocValues.map(value => parseFloat(value.toFixed(2)));

// Bollinger Bands
const bbPeriod = 20;
const bbValues = BollingerBands.calculate({ period: bbPeriod, stdDev: 2, values: close });
const bbUpper = bbValues.map(value => parseFloat(value.upper.toFixed(2)));
const bbLower = bbValues.map(value => parseFloat(value.lower.toFixed(2)));

// OBV
const obvValues = OBV.calculate({ close: close, volume: volume });
const obv = obvValues.map(value => parseFloat(value.toFixed(2)));

// PSAR
const psarValues = PSAR.calculate({ high: priceData.map(candle => parseFloat(candle.high)), low: priceData.map(candle => parseFloat(candle.low)) });
const psar = psarValues.map(value => parseFloat(value.toFixed(2)));

// WMA
const wmaPeriod = 45;
const wmaValues = WMA.calculate({ period: wmaPeriod, values: close });
const wma = wmaValues.map(value => parseFloat(value.toFixed(2)));

console.log('RSI:', rsi);
console.log('EMA:', ema);
console.log('ROC:', roc);
console.log('Bollinger Bands Upper:', bbUpper);
console.log('Bollinger Bands Lower:', bbLower);
console.log('OBV:', obv);
console.log('PSAR:', psar);
console.log('WMA:', wma);

const fs = require('fs');

const indRes = {
  RSI: rsi,
  EMA: ema,
  ROC: roc,
  BollingerBands: { upper: bbUpper, lower: bbLower },
  OBV: obv,
  PSAR: psar,
  WMA: wma
};

fs.writeFile('indres.json', JSON.stringify(indRes), (err) => {
  if (err) throw err;
  console.log('Indicators results saved to indres.json');
});
