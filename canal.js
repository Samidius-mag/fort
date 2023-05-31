const math = require('mathjs');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// Определяем временной интервал для анализа (последние 24 часа)
const last24Hours = data.slice(-24);

// Получаем массив цен закрытия за последние 24 часа
const closePrices = last24Hours.map(candle => parseFloat(candle.close));

// Вычисляем линейный регрессионный канал
const regression = math.regression(closePrices.map((price, index) => [index, price]));

// Получаем коэффициенты линейной регрессии
const slope = regression.equation[0];
const intercept = regression.equation[1];

// Вычисляем верхнюю и нижнюю границы канала
const upperBound = slope * (closePrices.length - 1) + intercept;
const lowerBound = slope * 0 + intercept;

// Получаем текущую цену
const currentPrice = parseFloat(data[data.length - 1].close);

// Проверяем, находится ли текущая цена в канале
if (currentPrice >= lowerBound && currentPrice <= upperBound) {
  console.log(`Текущая цена (${currentPrice}) находится в линейном регрессионном канале`);
} else {
  console.log(`Текущая цена (${currentPrice}) не находится в линейном регрессионном канале`);
}

console.log(`Верхняя граница канала: ${upperBound}`);
console.log(`Нижняя граница канала: ${lowerBound}`);