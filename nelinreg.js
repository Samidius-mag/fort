const fs = require('fs');

const candles = JSON.parse(fs.readFileSync('price.json'));

// Разделение данных на две группы: положительные и отрицательные свечи
const positiveCandles = candles.filter(candle => candle.close > candle.open);
const negativeCandles = candles.filter(candle => candle.close < candle.open);

// Функция для вычисления корреляции между объемом и изменением цены
function calculateCorrelation(data) {
  const n = data.length;
  const sumX = data.reduce((sum, item) => sum + item.volume, 0);
  const sumY = data.reduce((sum, item) => sum + (item.close - item.open), 0);
  const sumXY = data.reduce((sum, item) => sum + (item.volume * (item.close - item.open)), 0);
  const sumX2 = data.reduce((sum, item) => sum + (item.volume ** 2), 0);
  const sumY2 = data.reduce((sum, item) => sum + ((item.close - item.open) ** 2), 0);

  if (sumX === 0 || sumY === 0 || sumX2 === 0 || sumY2 === 0) {
    return NaN;
  }

  const numerator = (n * sumXY) - (sumX * sumY);
  const denominator = Math.sqrt((n * sumX2 - (sumX ** 2)) * (n * sumY2 - (sumY ** 2)));

  return numerator / denominator;
}

// Вычисление корреляции для положительных и отрицательных свечей
const positiveCorrelation = calculateCorrelation(positiveCandles);
const negativeCorrelation = calculateCorrelation(negativeCandles);

// Проверка на статистическую значимость корреляции
const alpha = 0.05; // Уровень значимости
const tCritical = 2.306; // Критическое значение t-статистики для alpha = 0.05 и n = 5000

const positiveT = (positiveCorrelation * Math.sqrt(positiveCandles.length - 2)) / Math.sqrt(1 - (positiveCorrelation ** 2));
const negativeT = (negativeCorrelation * Math.sqrt(negativeCandles.length - 2)) / Math.sqrt(1 - (negativeCorrelation ** 2));

const positiveIsSignificant = Math.abs(positiveT) > tCritical;
const negativeIsSignificant = Math.abs(negativeT) > tCritical;

// Вывод результатов
console.log(`Positive correlation: ${positiveCorrelation}`);
console.log(`Negative correlation: ${negativeCorrelation}`);

if (positiveIsSignificant) {
  console.log('Positive correlation is significant');
  if (positiveCorrelation > 0) {
    console.log('When volume increases, price increases (bullish)');
  } else {
    console.log('When volume increases, price decreases (bearish)');
  }
} else {
  console.log('Positive correlation is not significant');
}

if (negativeIsSignificant) {
  console.log('Negative correlation is significant');
  if (negativeCorrelation > 0) {
    console.log('When volume increases, price decreases (bearish)');
  } else {
    console.log('When volume increases, price increases (bullish)');
  }
} else {
  console.log('Negative correlation is not significant');
}
