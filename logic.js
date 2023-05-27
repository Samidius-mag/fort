const fs = require('fs');

const rawData = fs.readFileSync('price.json');
const priceData = JSON.parse(rawData);

const indData = require('./indres');

const currentPrice = parseFloat(priceData[priceData.length - 1].close);

const currentEMA = indData.ema[indData.ema.length - 1];
const currentTrend = currentPrice > currentEMA ? 'Восходящий' : 'Нисходящий';

const globalEMA = indData.ema[indData.ema.length - 200];
const globalTrend = currentPrice > globalEMA ? 'Восходящий' : 'Нисходящий';

const currentBB = indData.bb[indData.bb.length - 1];
const support = currentBB.lower;
const resistance = currentBB.upper;

const last4Prices = priceData.slice(-4).map(candle => parseFloat(candle.close));
const last4Max = Math.max(...last4Prices);
const last4Min = Math.min(...last4Prices);
const last4Support = last4Min - (last4Max - last4Min);
const last4Resistance = last4Max + (last4Max - last4Min);

const currentRSI = indData.rsi[indData.rsi.length - 1];
const isOverbought = currentRSI > 70;
const isOversold = currentRSI < 30;

let entryRecommendation = '';
if (currentPrice > resistance) {
  entryRecommendation = 'Вход в сделку: продажа';
} else if (currentPrice < support) {
  entryRecommendation = 'Вход в сделку: покупка';
} else if (currentTrend === 'Восходящий' && currentPrice > currentEMA) {
  entryRecommendation = 'Вход в сделку: покупка';
} else if (currentTrend === 'Нисходящий' && currentPrice < currentEMA) {
  entryRecommendation = 'Вход в сделку: продажа';
} else {
  entryRecommendation = 'Не рекомендуется входить в сделку';
}

let exitRecommendation = '';
if (currentPrice > resistance) {
  exitRecommendation = 'Выход из сделки: продажа';
} else if (currentPrice < support) {
  exitRecommendation = 'Выход из сделки: покупка';
} else {
  exitRecommendation = 'Не рекомендуется выходить из сделки';
}

let buySellRecommendation = '';
if (isOverbought) {
  buySellRecommendation = 'Рекомендуется продажа';
} else if (isOversold) {
  buySellRecommendation = 'Рекомендуется покупка';
} else {
  buySellRecommendation = 'Не рекомендуется покупать или продавать';
}

const result = {
  currentPrice: currentPrice,
  currentTrend: currentTrend,
  globalTrend: globalTrend,
  support: support,
  resistance: resistance,
  last4Support: last4Support,
  last4Resistance: last4Resistance,
  entryRecommendation: entryRecommendation,
  exitRecommendation: exitRecommendation,
  buySellRecommendation: buySellRecommendation,
};

console.log(result);

fs.writeFileSync('logicres.js', JSON.stringify(result));
