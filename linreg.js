const data = require('./price.json');

function linearRegression(data) {
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
  
    for (let i = 0; i < n; i++) {
      const { time, open, high, low, close, volume } = data[i];
      sumX += time;
      sumY += close;
      sumXY += time * close;
      sumX2 += time ** 2;
    }
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }

  const priceRegression = linearRegression(data.map(({ time, close }) => ({ x: time, y: close })));
const lowRegression = linearRegression(data.map(({ time, low }) => ({ x: time, y: low })));
const highRegression = linearRegression(data.map(({ time, high }) => ({ x: time, y: high })));
const volumeRegression = linearRegression(data.map(({ time, volume }) => ({ x: time, y: volume })));

const futureTime = Date.now() + 24 * 60 * 60 * 1000; // 1 день вперед
const futurePrice = priceRegression.slope * futureTime + priceRegression.intercept;
const futureLow = lowRegression.slope * futureTime + lowRegression.intercept;
const futureHigh = highRegression.slope * futureTime + highRegression.intercept;
const futureVolume = volumeRegression.slope * futureTime + volumeRegression.intercept;

const predictions = {
    price: futurePrice,
    low: futureLow,
    high: futureHigh,
    volume: futureVolume,
  };

  console.log('Средняя цена на следующий день:', predictions.price);
console.log('Средний минимум на следующий день:', predictions.low);
console.log('Средний максимум на следующий день:', predictions.high);
console.log('Средний объем на следующий день:', predictions.volume);