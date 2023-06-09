const fs = require('fs');
const { SimpleLinearRegression } = require('ml-regression');
const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);
// Сортируем данные по убыванию количества сделок
const sortedData = data.sort((a, b) => b.numberOfTrades - a.numberOfTrades);
// Выбираем первые 500 свечей
const selectedData = sortedData.slice(0, 500);
//console.log(data); // проверяем содержимое массива data
// Создаем массив значений для регрессии
const xValues = data.map((item) => item.time/1000);
const yValues = data.map((item) => parseInt(item.numberOfTrades));
//console.log('xValues:', xValues);
//console.log('yValues:', yValues);
// Выполняем регрессию
const regression = new SimpleLinearRegression(xValues, yValues);
console.log('Коэффициенты регрессии:', regression.slope, regression.intercept);
// Предсказываем значения для следующих 500 свечей
const nextXValues = Array.from({ length: 24 }, (_, i) => xValues[xValues.length - 1] + i + 1);
const nextYValues = nextXValues.map((x) => regression.predict(x));
console.log('Предсказанные значения:', nextYValues);