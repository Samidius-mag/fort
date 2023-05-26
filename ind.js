const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, ADX, OBV, PSAR, WMA } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const close = data.map(candle => parseFloat(candle.close));
const open = data.map(candle => parseFloat(candle.open));
const high = data.map(candle => parseFloat(candle.high));
const low = data.map(candle => parseFloat(candle.low));
const volume = data.map(candle => parseFloat(candle.volume));

const rsi = RSI.calculate({ values: close, period: 14 }).map(value => parseFloat(value.toFixed(2)));
const ema = EMA.calculate({ values: close, period: 20 }).map(value => parseFloat(value.toFixed(2)));
const roc = ROC.calculate({ values: close, period: 12 }).map(value => parseFloat(value.toFixed(2)));
const bb = BollingerBands.calculate({ values: close, period: 20, stdDev: 2 }).map(band => ({
  upper: parseFloat(band.upper.toFixed(2)),
  middle: parseFloat(band.middle.toFixed(2)),
  lower: parseFloat(band.lower.toFixed(2)),
}));
//const adx = ADX.calculate({ close, high, low, period: 14 }).map(value => parseFloat.value);
const obv = OBV.calculate({ close, volume }).map(value => parseFloat(value.toFixed(2)));
//const psar = PSAR.calculate({ high, low, step: 0.02, max: 0.2 }).map(value => parseFloat);
//const wma = WMA.calculate({ values: close, period: 20 }).map(value => parseFloat);

console.log('RSI:', rsi);
console.log('EMA:', ema);
console.log('ROC:', roc);
console.log('Bollinger Bands:', bb);
//console.log('ADX:', adx);
console.log('OBV:', obv);
//console.log('PSAR:', psar);
//console.log('WMA:', wma);
