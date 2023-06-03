const fs = require('fs');

const rawData = fs.readFileSync('price.json');
const data = JSON.parse(rawData);

const candles = data.map(candle => ({
  time: new Date(candle.time),
  open: parseFloat(candle.open),
  high: parseFloat(candle.high),
  low: parseFloat(candle.low),
  close: parseFloat(candle.close),
  volume: parseFloat(candle.volume),
}));

function sma(data, period) {
    const sum = data.slice(-period).reduce((acc, candle) => acc + candle.close, 0);
    return sum / period;
  }
  
  const sma5 = sma(candles, 5);
  const currentPrice = candles[candles.length - 1].close;
  
  let trend;
  if (currentPrice > sma5) {
    trend = 'up';
  } else {
    trend = 'down';
  }

  function findExtremums(data, period) {
    const highs = [];
    const lows = [];
  
    for (let i = data.length - period; i < data.length; i++) {
      const candle = data[i];
      highs.push(candle.high);
      lows.push(candle.low);
    }
  
    const maxHigh = Math.max(...highs);
    const minLow = Math.min(...lows);
  
    return { maxHigh, minLow };
  }
  
  const { maxHigh, minLow } = findExtremums(candles, 5);
  
  const channel = {
    top: maxHigh,
    bottom: minLow,
    middle: (maxHigh + minLow) / 2,
  };

  function average(data) {
    const sum = data.reduce((acc, candle) => acc + candle.close, 0);
    return sum / data.length;
  }
  
  const avgPrice = average(candles);

  function standardDeviation(data, period) {
    const avg = average(data.slice(-period));
    const deviations = data.slice(-period).map(candle => Math.pow(candle.close - avg, 2));
    const variance = deviations.reduce((acc, deviation) => acc + deviation, 0) / period;
    return Math.sqrt(variance);
  }
  
  const stdDev = standardDeviation(candles, 5);
  
  const upperBound = avgPrice + stdDev;
  const lowerBound = avgPrice - stdDev;
  
  let direction;
  if (currentPrice > upperBound) {
    direction = 'up';
  } else if (currentPrice < lowerBound) {
    direction = 'down';
  } else {
    direction = 'sideways';
  }

  console.log(`Trend: ${trend}`);
console.log(`Channel: ${channel.bottom} - ${channel.middle} - ${channel.top}`);
console.log(`Average price: ${avgPrice}`);
console.log(`Price direction: ${direction}`);