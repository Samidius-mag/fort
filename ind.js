const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, ADX, OBV, PSAR, WMA } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const rsiPeriod = 14;
const emaPeriod = 20;
const rocPeriod = 12;
const bbPeriod = 20;
const bbStdDev = 2;
const adxPeriod = 14;
const psarAccelerationFactor = 0.02;
const psarMaxAccelerationFactor = 0.2;
const wmaPeriod = 20;

const rsiValues = RSI.calculate({ period: rsiPeriod, values: data.map(candle => candle.close) });
const emaValues = EMA.calculate({ period: emaPeriod, values: data.map(candle => candle.close) });
const rocValues = ROC.calculate({ period: rocPeriod, values: data.map(candle => candle.close) });
const bbValues = BollingerBands.calculate({ period: bbPeriod, stdDev: bbStdDev, values: data.map(candle => candle.close) });
const adxValues = ADX.calculate({ period: adxPeriod, high: data.map(candle => candle.high), low: data.map(candle => candle.low), close: data.map(candle => candle.close) });
const obvValues = OBV.calculate({ close: data.map(candle => candle.close), volume: data.map(candle => candle.volume) });
const psarValues = PSAR.calculate({ accelerationFactor: psarAccelerationFactor, maxAccelerationFactor: psarMaxAccelerationFactor, high: data.map(candle => candle.high), low: data.map(candle => candle.low) });
const wmaValues = WMA.calculate({ period: wmaPeriod, values: data.map(candle => candle.close) });

const result = {
  rsi: rsiValues,
  ema: emaValues,
  roc: rocValues,
  bb: bbValues,
  adx: adxValues,
  obv: obvValues,
  psar: psarValues,
  wma: wmaValues,
};

fs.writeFileSync('indres.json', JSON.stringify(result));
console.log('Indicators saved to indres.json');
