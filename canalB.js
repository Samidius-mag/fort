const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const period = 20; // период для расчета канала
const deviation = 2; // отклонение для расчета канала

// Функция для расчета ценового регрессивного канала
function calculateChannel(data, period, deviation) {
  const channel = [];

  for (let i = period; i < data.length; i++) {
    const prices = data.slice(i - period, i).map(candle => candle.close);
    const sumX = prices.reduce((sum, price, index) => sum + index, 0);
    const sumY = prices.reduce((sum, price) => sum + price, 0);
    const sumXY = prices.reduce((sum, price, index) => sum + index * price, 0);
    const sumX2 = prices.reduce((sum, price, index) => sum + index ** 2, 0);

    const a = (period * sumXY - sumX * sumY) / (period * sumX2 - sumX ** 2);
    const b = (sumY - a * sumX) / period;

    const deviationSum = prices.reduce((sum, price) => sum + (price - a * prices.indexOf(price) - b) ** 2, 0);
    const deviationAvg = Math.sqrt(deviationSum / period);

    channel.push({
      time: data[i].time,
      upper: a * period + b + deviation * deviationAvg,
      middle: a * period + b,
      lower: a * period + b - deviation * deviationAvg,
    });
  }

  return channel;
}

const channel = calculateChannel(data, period, deviation);

console.log(channel);