const fs = require('fs');

// Получаем данные из файла price.json
const data = JSON.parse(fs.readFileSync('price.json'));

// Выбираем последние 10 свечей
const lastCandles = data.slice(-10);

// Вычисляем среднее значение цены закрытия
const averagePrice = lastCandles.reduce((sum, candle) => sum + parseFloat(candle.close), 0) / lastCandles.length;

// Вычисляем стандартное отклонение цены закрытия
const stdDeviation = Math.sqrt(lastCandles.reduce((sum, candle) => sum + (parseFloat(candle.close) - averagePrice) ** 2, 0) / lastCandles.length);

// Вычисляем верхнюю и нижнюю границы канала
const upperBound = averagePrice + 2 * stdDeviation;
const lowerBound = averagePrice - 2 * stdDeviation;

// Отображаем канал на графике
console.log(`Upper bound: ${upperBound}`);
console.log(`Lower bound: ${lowerBound}`);