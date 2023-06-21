const data = require('./price.json');

const capital = 100;
const amountPerTrade = 0.01;
const commission = 0.001;
const period = 10;

let balance = capital;
let holdings = 0;
let lastClose = 0;
let sma = 0;
let prices = [];

for (let i = 0; i < data.length; i++) {
  const candle = data[i];
  const close = parseFloat(candle.close);

  if (lastClose === 0) {
    lastClose = close;
    continue;
  }

  prices.push(close);

  if (prices.length > period) {
    prices.shift();
  }

  sma = prices.reduce((sum, price) => sum + price, 0) / prices.length;

  if (close > sma) {
    const amount = amountPerTrade;
    const cost = amount * close;
    const fee = cost * commission;
    const totalCost = cost + fee;

    if (totalCost <= balance) {
      balance -= totalCost;
      holdings += amount;
      console.log(`Bought ${amount} BTC at ${close}`);
    }
  } else if (close < sma) {
    const amount = holdings * amountPerTrade;
    const revenue = amount * close;
    const fee = revenue * commission;
    const totalRevenue = revenue - fee;

    if (totalRevenue > 0) {
      balance += totalRevenue;
      holdings -= amount;
      console.log(`Sold ${amount} BTC at ${close}`);
    }
  }

  lastClose = close;
}

console.log(`Final balance: ${balance.toFixed(2)}`);