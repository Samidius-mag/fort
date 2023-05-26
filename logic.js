const fs = require('fs');
const { RSI, EMA, ROC, BollingerBands, ADX, OBV, PSAR, WMA } = require('technicalindicators');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const indData = fs.readFileSync('indres.json');
const indicators = JSON.parse(indData);

const currentPrice = data[data.length - 1].close;

// Определение текущего тренда
const ema20 = indicators.ema[indicators.ema.length - 1];
const ema50 = EMA.calculate({ period: 50, values: data.map(candle => candle.close) })[data.length - 1];
const ema200 = EMA.calculate({ period: 200, values: data.map(candle => candle.close) })[data.length - 1];

let currentTrend = '';
if (currentPrice > ema20 && ema20 > ema50 && ema50 > ema200) {
  currentTrend = 'Восходящий';
} else if (currentPrice < ema20 && ema20 < ema50 && ema50 < ema200) {
  currentTrend = 'Нисходящий';
} else {
  currentTrend = 'Боковой';
}

// Определение глобального тренда
const ema200Daily = EMA.calculate({ period: 200, values: data.slice(-24 * 60).map(candle => candle.close) })[0];
const globalTrend = currentPrice > ema200Daily ? 'Восходящий' : 'Нисходящий';

// Определение уровней поддержки и сопротивления
const support1 = indicators.bb[indicators.bb.length - 1].lower;
const support2 = indicators.bb[indicators.bb.length - 1].lower - (indicators.bb[indicators.bb.length - 1].upper - indicators.bb[indicators.bb.length - 1].lower) / 2;
const resistance1 = indicators.bb[indicators.bb.length - 1].upper;
const resistance2 = indicators.bb[indicators.bb.length - 1].upper + (indicators.bb[indicators.bb.length - 1].upper - indicators.bb[indicators.bb.length - 1].lower) / 2;

const support4h = indicators.bb[indicators.bb.length - 7].lower;
const support12h = indicators.bb[indicators.bb.length - 25].lower;
const support24h = indicators.bb[indicators.bb.length - 49].lower;
const resistance4h = indicators.bb[indicators.bb.length - 7].upper;
const resistance12h = indicators.bb[indicators.bb.length - 25].upper;
const resistance24h = indicators.bb[indicators.bb.length - 49].upper;

// Определение перекупленности/перепроданности рынка
const rsi14 = indicators.rsi[indicators.rsi.length - 1];
let marketState = '';
if (rsi14 > 70) {
  marketState = 'Перекуплен';
} else if (rsi14 < 30) {
  marketState = 'Перепродан';
} else {
  marketState = 'Нормальное состояние';
}

// Определение рекомендаций с точками входа-выхода в сделку
let recommendation = '';
let entryPrice = 0;
let exitPrice = 0;
if (currentPrice < support1) {
  recommendation = 'Покупать';
  entryPrice = currentPrice;
  exitPrice = resistance1;
} else if (currentPrice > resistance1) {
  recommendation = 'Продавать';
  entryPrice = currentPrice;
  exitPrice = support1;
} else {
  recommendation = 'Ждать';
}

// Определение рекомендаций о покупке и продаже
let buySellRecommendation = '';
if (currentPrice < ema20 && ema20 < ema50 && ema50 < ema200) {
  buySellRecommendation = 'Покупать';
} else if (currentPrice > ema20 && ema20 > ema50 && ema50 > ema200) {
  buySellRecommendation = 'Продавать';
} else {
  buySellRecommendation = 'Ждать';
}

console.log(`Текущая цена: ${currentPrice}`);
console.log(`Текущий тренд: ${currentTrend}`);
console.log(`Глобальный тренд: ${globalTrend}`);
console.log(`Уровни поддержки: ${support1.toFixed(2)}, ${support2.toFixed(2)}`);
console.log(`Уровни сопротивления: ${resistance1.toFixed(2)}, ${resistance2.toFixed(2)}`);
console.log(`Уровни поддержки и сопротивления за последние 4 часа: ${support4h.toFixed(2)}, ${resistance4h.toFixed(2)}`);
console.log(`Уровни поддержки и сопротивления за последние 12 часов: ${support12h.toFixed(2)}, ${resistance12h.toFixed(2)}`);
console.log(`Уровни поддержки и сопротивления за последние 24 часа: ${support24h.toFixed(2)}, ${resistance24h.toFixed(2)}`);
console.log(`Состояние рынка: ${marketState}`);
console.log(`Рекомендация с точками входа-выхода в сделку: ${recommendation} (вход: ${entryPrice.toFixed(2)}, выход: ${exitPrice.toFixed(2)})`);
console.log(`Рекомендация о покупке и продаже: ${buySellRecommendation}`);
