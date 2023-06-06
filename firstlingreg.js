const fs = require('fs');
const { LinearRegression } = require('ml-regression');
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
const regression = new LinearRegression(xValues.map((x) => [x]), yValues);
console.log('Коэффициенты регрессии:', regression.slope, regression.intercept);
// Предсказываем значения для следующих 500 свечей
const nextXValues = Array.from({ length: 500 }, (_, i) => xValues[xValues.length - 1] + i + 1);
const nextYValues = nextXValues.map((x) => regression.predict([x])[0]);
console.log('Предсказанные значения:', nextYValues);