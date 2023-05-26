const fs = require('fs');
const technicalIndicators = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const rawIndicators = fs.readFileSync('indres.json');
const indicators = JSON.parse(rawIndicators);

const close = data.map(candle => candle.close);
const high = data.map(candle => candle.high);
const low = data.map(candle => candle.low);

const currentPrice = close[close.length - 1];

const trend = {
  current: currentPrice > indicators.ema[indicators.ema.length - 1] ? 'up' : 'down',
  global: close[0] > indicators.ema[indicators.ema.length - 1] ? 'up' : 'down',
  '4h': close[close.length - 5] > indicators.ema[indicators.ema.length - 5] ? 'up' : 'down',
  '12h': close[close.length - 13] > indicators.ema[indicators.ema.length - 13] ? 'up' : 'down',
  '24h': close[close.length - 25] > indicators.ema[indicators.ema.length - 25] ? 'up' : 'down',
};

const supportResistance = {
  current: {
    support: technicalIndicators.PivotPoint.calculate({ high, low, close })[0].support1,
    resistance: technicalIndicators.PivotPoint.calculate({ high, low, close })[0].resistance1,
  },
  '4h': {
    support: technicalIndicators.PivotPoint.calculate({ high: high.slice(-20), low: low.slice(-20), close: close.slice(-20) })[0].support1,
    resistance: technicalIndicators.PivotPoint.calculate({ high: high.slice(-20), low: low.slice(-20), close: close.slice(-20) })[0].resistance1,
  },
  '12h': {
    support: technicalIndicators.PivotPoint.calculate({ high: high.slice(-60), low: low.slice(-60), close: close.slice(-60) })[0].support1,
    resistance: technicalIndicators.PivotPoint.calculate({ high: high.slice(-60), low: low.slice(-60), close: close.slice(-60) })[0].resistance1,
  },
  '24h': {
    support: technicalIndicators.PivotPoint.calculate({ high: high.slice(-120), low: low.slice(-120), close: close.slice(-120) })[0].support1,
    resistance: technicalIndicators.PivotPoint.calculate({ high: high.slice(-120), low: low.slice(-120), close: close.slice(-120) })[0].resistance1,
  },
};

const overboughtOversold = {
  rsi: indicators.rsi[indicators.rsi.length - 1] > 70 ? 'overbought' : indicators.rsi[indicators.rsi.length - 1] < 30 ? 'oversold' : 'neutral',
  roc: indicators.roc[indicators.roc.length - 1] > 10 ? 'overbought' : indicators.roc[indicators.roc.length - 1] < -10 ? 'oversold' : 'neutral',
};

const recommendations = {
  buy: {
    current: currentPrice < supportResistance.current.support ? { price: supportResistance.current.support, message: 'Buy at support level' } : { price: currentPrice, message: 'Buy at current price' },
    '4h': currentPrice < supportResistance['4h'].support ? { price: supportResistance['4h'].support, message: 'Buy at 4h support level' } : { price: currentPrice, message: 'Buy at current price' },
    '12h': currentPrice < supportResistance['12h'].support ? { price: supportResistance['12h'].support, message: 'Buy at 12h support level' } : { price: currentPrice, message: 'Buy at current price' },
    '24h': currentPrice < supportResistance['24h'].support ? { price: supportResistance['24h'].support, message: 'Buy at 24h support level' } : { price: currentPrice, message: 'Buy at current price' },
  },
  sell: {
    current: currentPrice > supportResistance.current.resistance ? { price: supportResistance.current.resistance, message: 'Sell at resistance level' } : { price: currentPrice, message: 'Sell at current price' },
    '4h': currentPrice > supportResistance['4h'].resistance ? { price: supportResistance['4h'].resistance, message: 'Sell at 4h resistance level' } : { price: currentPrice, message: 'Sell at current price' },
    '12h': currentPrice > supportResistance['12h'].resistance ? { price: supportResistance['12h'].resistance, message: 'Sell at 12h resistance level' } : { price: currentPrice, message: 'Sell at current price' },
    '24h': currentPrice > supportResistance['24h'].resistance ? { price: supportResistance['24h'].resistance, message: 'Sell at 24h resistance level' } : { price: currentPrice, message: 'Sell at current price' },
  },
};

console.log(`Current price: ${currentPrice}`);
console.log(`Trend: current - ${trend.current}, global - ${trend.global}, 4h - ${trend['4h']}, 12h - ${trend['12h']}, 24h - ${trend['24h']}`);
console.log(`Support and resistance levels: current - support ${supportResistance.current.support}, resistance ${supportResistance.current.resistance}, 4h - support ${supportResistance['4h'].support}, resistance ${supportResistance['4h'].resistance}, 12h - support ${supportResistance['12h'].support}, resistance ${supportResistance['12h'].resistance}, 24h - support ${supportResistance['24h'].support}, resistance ${supportResistance['24h'].resistance}`);
console.log(`Overbought/oversold: RSI - ${overboughtOversold.rsi}, ROC - ${overboughtOversold.roc}`);
console.log(`Recommendations: Buy - ${recommendations.buy.current.message} (${recommendations.buy.current.price}), Sell - ${recommendations.sell.current.message} (${recommendations.sell.current.price})`);
