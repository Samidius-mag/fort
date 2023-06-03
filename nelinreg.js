const math = require('mathjs');
const numeric = require('numeric');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// Создаем массивы для независимой и зависимой переменных
const x = data.map(candle => candle.volume);
const y = data.map(candle => candle.close);

// Определяем функцию, которую будем использовать для моделирования
const f = (x, beta) => {
  const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10] = beta;
  return b0 + b1 * x + b2 * x ** 2 + b3 * x ** 3 + b4 * x ** 4 + b5 * x ** 5 + b6 * x ** 6 + b7 * x ** 7 + b8 * x ** 8 + b9 * x ** 9 + b10 * x ** 10;
};

// Определяем начальные значения для коэффициентов
const initialBeta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Используем метод наименьших квадратов для определения коэффициентов
const result = numeric.uncmin((beta) => {
  const yPredicted = x.map(x => f(x, beta));
  const residuals = math.subtract(y, yPredicted);
  const rss = math.sum(residuals.map(r => r ** 2)); // изменение здесь
  return rss;
}, initialBeta);

// Выводим результаты
console.log('Coefficients:', result.solution);
console.log('R-squared:', math.round(result.f / math.sum(math.square(math.subtract(y, math.mean(y)))), 4));