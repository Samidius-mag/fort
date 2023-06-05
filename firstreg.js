const fs = require('fs');
const math = require('mathjs');
const regression = require('regression');

// Читаем данные из файла price.json
const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

// Сортируем данные по убыванию количества сделок
const sortedData = data.sort((a, b) => b.numberOfTrades - a.numberOfTrades);

// Выбираем первые 500 свечей
const selectedData = sortedData.slice(0, 500);
console.log(data); // проверяем содержимое массива data
// Создаем массив значений для регрессии
const xValues = data.map((item) => item.time);
const yValues = data.map((item) => parseInt(item.numberOfTrades));

console.log('xValues:', xValues);
console.log('yValues:', yValues);

// Выполняем регрессию
const result = regression.linear(xValues.map((x, i) => [i, x]), yValues);

// Предсказываем значения для следующих 500 свечей
const nextXValues = math.range(xValues[xValues.length - 1] + 1, xValues[xValues.length - 1] + 501)._data;
const nextYValues = nextXValues.map((x, i) => result.predict([i + xValues.length, x])[1]);

// Находим максимальное значение количества сделок
const maxNumberOfTrades = math.max(nextYValues);

// Находим цены, на которых будет максимальное количество сделок
const prices = nextYValues.reduce((acc, value, i) => {
  if (value === maxNumberOfTrades) {
    acc.push(data[xValues.length + i].close);
  }
  return acc;
}, []);

const yValuesNumbers = yValues.map((value) => parseFloat(value));
const maxTrades = Math.max(...yValuesNumbers);
const maxPrices = xValues.filter((value, index) => yValuesNumbers[index] === maxTrades);
console.log(`Максимальное количество сделок: ${maxTrades}`);
console.log(`Цены на которых будет максимальное количество сделок: ${maxPrices}`);