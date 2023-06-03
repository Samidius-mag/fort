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

const sma2 = sma(candles, 2);
const currentPrice = candles[candles.length - 1].close;

let trend;
if (currentPrice > sma2) {
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

const { maxHigh, minLow } = findExtremums(candles, 2);

const channel = {
  top: maxHigh,
  bottom: minLow,
  middle: (maxHigh + minLow) / 2,
};

console.log(`Trend: ${trend}`);
console.log(`Channel: ${channel.bottom} - ${channel.middle} - ${channel.top}`);

function average(data) {
  const sum = data.reduce((acc, candle) => acc + candle.close, 0);
  return sum / data.length;
}

const avgPrice = average(candles.slice(-2));

function standardDeviation(data, period) {
  const avg = average(data.slice(-period));
  const deviations = data.slice(-period).map(candle => Math.pow(candle.close - avg, 2));
  const variance = deviations.reduce((acc, deviation) => acc + deviation, 0) / period;
  return Math.sqrt(variance);
}

const stdDev = standardDeviation(candles, 2);

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

console.log(`Average price: ${avgPrice}`);
console.log(`Price direction: ${direction}`);

const choices = ['rock', 'paper', 'scissors'];

function predictNextPrice(data) {
  const lastPrice = data[data.length - 1].close;
  const prevPrice = data[data.length - 2].close;
  const priceDiff = lastPrice - prevPrice;

  let choice;
  if (priceDiff > 0) {
    choice = 'rock'; // рост цены
  } else if (priceDiff < 0) {
    choice = 'scissors'; // падение цены
  } else {
    choice = 'paper'; // боковое движение цены
  }

  const randomIndex = Math.floor(Math.random() * choices.length);
  const opponentChoice = choices[randomIndex];

  if (choice === opponentChoice) {
    return lastPrice; // цена не изменится
  } else if (
    (choice === 'rock' && opponentChoice === 'scissors') ||
    (choice === 'scissors' && opponentChoice === 'paper') ||
    (choice === 'paper' && opponentChoice === 'rock')
  ) {
    return lastPrice * 1.01; // цена вырастет на 1%
  } else {
    return lastPrice * 0.99; // цена упадет на 1%
  }
}

const nextPrice = predictNextPrice(candles);
console.log(`Predicted price: ${nextPrice}`);