const regression = require('regression');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// Получаем последние 4 часовых свечи
const lastCandles = data.slice(-4);

// Получаем массив цен закрытия свечей
const prices = lastCandles.map(candle => parseFloat(candle.close));

// Вычисляем линейную регрессию
const result = regression.linear(prices.map((price, index) => [index, price]));

// Получаем коэффициенты линейной регрессии
const slope = result.equation[0];
const intercept = result.equation[1];

// Вычисляем текущую цену
const currentPrice = parseFloat(lastCandles[3].close);

// Вычисляем цену на линии сопротивления и поддержки
const resistancePrice = slope * 4 + intercept;
const supportPrice = slope * 3 + intercept;

// Определяем тренд
let trend = '';
if (currentPrice > resistancePrice) {
  trend = 'down';
} else if (currentPrice < supportPrice) {
  trend = 'up';
} else {
  trend = 'sideways';
}

console.log(`Resistance: ${resistancePrice}`);
console.log(`Support: ${supportPrice}`);
console.log(`Current price: ${currentPrice}`);
console.log(`Trend: ${trend}`);