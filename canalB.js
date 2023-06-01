const fs = require('fs');
const Chart = require('chart.js');

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
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: lastCandles.map(candle => candle.time),
    datasets: [
      {
        label: 'Price',
        data: lastCandles.map(candle => parseFloat(candle.close)),
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'Upper bound',
        data: Array(lastCandles.length).fill(upperBound),
        borderColor: 'red',
        fill: false
      },
      {
        label: 'Lower bound',
        data: Array(lastCandles.length).fill(lowerBound),
        borderColor: 'green',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  }
});