const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, ADX, OBV, PSAR, WMA } = require('technicalindicators');

const rawPriceData = fs.readFileSync('price.json');
const priceData = JSON.parse(rawPriceData);

const rawIndicatorsData = fs.readFileSync('indres.json');
const indicatorsData = JSON.parse(rawIndicatorsData);

const rawPatternsData = fs.readFileSync('pattres.json');
const patternsData = JSON.parse(rawPatternsData);

const currentPrice = priceData[priceData.length - 1].close;

// Текущий тренд
const ema12 = EMA.calculate({ period: 12, values: priceData.map(candle => candle.close) });
const ema24 = EMA.calculate({ period: 24, values: priceData.map(candle => candle.close) });
const currentTrend = ema12[ema12.length - 1] > ema24[ema24.length - 1] ? 'Восходящий' : 'Нисходящий';

// Глобальный тренд
const ema200 = EMA.calculate({ period: 200, values: priceData.map(candle => candle.close) });
const globalTrend = ema200[ema200.length - 1] > currentPrice ? 'Нисходящий' : 'Восходящий';

// Уровни поддержки и сопротивления
const bb = BollingerBands.calculate({ period: 20, stdDev: 2, values: priceData.map(candle => candle.close) });
const currentBB = bb[bb.length - 1];
const currentResistance = currentBB.upper;
const currentSupport = currentBB.lower;

const bb4h = BollingerBands.calculate({ period: 20, stdDev: 2, values: priceData.slice(-96).map(candle => candle.close) });
const resistance4h = bb4h[bb4h.length - 1].upper;
const support4h = bb4h[bb4h.length - 1].lower;

const bb12h = BollingerBands.calculate({ period: 20, stdDev: 2, values: priceData.slice(-288).map(candle => candle.close) });
const resistance12h = bb12h[bb12h.length - 1].upper;
const support12h = bb12h[bb12h.length - 1].lower;

const bb24h = BollingerBands.calculate({ period: 20, stdDev: 2, values: priceData.slice(-576).map(candle => candle.close) });
const resistance24h = bb24h[bb24h.length - 1].upper;
const support24h = bb24h[bb24h.length- 1].lower;

// Перекупленность/перепроданность рынка
const rsi14 = RSI.calculate({ period: 14, values: priceData.map(candle => candle.close) });
const currentRSI = rsi14[rsi14.length - 1];
const isOverbought = currentRSI > 70;
const isOversold = currentRSI < 30;

// Рекомендации с точками входа-выхода в сделку
const roc12 = ROC.calculate({ period: 12, values: priceData.map(candle => candle.close) });
const roc24 = ROC.calculate({ period: 24, values: priceData.map(candle => candle.close) });
const currentROC = roc12[roc12.length - 1];
const previousROC = roc24[roc24.length - 2];
const isBullishDivergence = currentROC > previousROC;
const isBearishDivergence = currentROC < previousROC;

const adx14 = ADX.calculate({ period: 14, close: priceData.map(candle => candle.close), high: priceData.map(candle => candle.high), low: priceData.map(candle => candle.low) });
const currentADX = adx14[adx14.length - 1];
const isTrending = currentADX > 25;

const obv = OBV.calculate({ close: priceData.map(candle => candle.close), volume: priceData.map(candle => candle.volume) });
const currentOBV = obv[obv.length - 1];
const previousOBV = obv[obv.length - 2];
const isBullishOBVDivergence = currentOBV > previousOBV;
const isBearishOBVDivergence = currentOBV < previousOBV;

const psar = PSAR.calculate({ high: priceData.map(candle => candle.high), low: priceData.map(candle => candle.low) });
const currentPSAR = psar[psar.length - 1];
const isBullishPSAR = currentPrice > currentPSAR;
const isBearishPSAR = currentPrice < currentPSAR;

const wma5 = WMA.calculate({ period: 5, values: priceData.map(candle => candle.close) });
const wma10 = WMA.calculate({ period: 10, values: priceData.map(candle => candle.close) });
const currentWMA5 = wma5[wma5.length - 1];
const currentWMA10 = wma10[wma10.length - 1];
const isBullishWMA = currentWMA5 > currentWMA10;
const isBearishWMA = currentWMA5 < currentWMA10;

const entryPrice = currentPrice;
const stopLossPrice = currentSupport;
const takeProfitPrice = currentResistance;

// Рекомендации о покупке и продаже
let recommendation = '';
if (currentTrend === 'Восходящий' && globalTrend === 'Восходящий' && !isOverbought && !isBearishDivergence && isBullishOBVDivergence && isBullishPSAR && isBullishWMA) {
  recommendation = `Рекомендуется покупка по цене ${entryPrice}. Уровень стоп-лосса: ${stopLossPrice}. Уровень тейк-профита: ${takeProfitPrice}.`;
} else if (currentTrend === 'Нисходящий' && globalTrend === 'Нисходящий' && !isOversold && !isBullishDivergence && isBearishOBVDivergence && isBearishPSAR && isBearishWMA) {
  recommendation = `Рекомендуется продажа по цене ${entryPrice}. Уровень стоп-лосса: ${stopLossPrice}. Уровень тейк-профита: ${takeProfitPrice}.`;
} else {
  recommendation = 'Нет рекомендаций.';
}

console.log(`Текущая цена: ${currentPrice}`);
console.log(`Текущий тренд: ${currentTrend}`);
console.log(`Глобальный тренд: ${globalTrend}`);
console.log(`Уровень поддержки (текущий): ${currentSupport}`);
console.log(`Уровень сопротивления (текущий): ${currentResistance}`);
console.log(`Уровень поддержки (4-часовой): ${support4h}`);
console.log(`Уровень сопротивления (4-часовой): ${resistance4h}`);
console.log(`Уровень поддержки (12-часовой): ${support12h}`);
console.log(`Уровень сопротивления (12-часовой): ${resistance12h}`);
console.log(`Уровень поддержки (24-часовой): ${support24h}`);
console.log(`Уровень сопротивления (24-часовой): ${resistance24h}`);
console.log(`Перекупленность рынка: ${isOverbought}`);
console.log(`Перепроданность рынка: ${isOversold}`);
console.log(`Рекомендация: ${recommendation}`);


