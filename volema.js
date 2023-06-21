const data = require('./price.json');

const capital = 100;
const amountPerTrade = 0.01;
const commission = 0.001;

let balance = capital;
let holdings = 0;
let lastHigh = 0;
let lastLow = 0;

const buyDip = (candle) => {
  const dip = 0.05; // 5% dip from last high
  const high = parseFloat(candle.high);

  if (lastHigh === 0) {
    lastHigh = high;
    return false;
  }

  const threshold = lastHigh * (1 - dip);

  if (high < threshold) {
    const close = parseFloat(candle.close);
    const amount = amountPerTrade;
    const cost = amount * close;
    const fee = cost * commission;
    const totalCost = cost + fee;

    if (totalCost <= balance) {
      balance -= totalCost;
      holdings += amount;
      console.log(`Bought ${amount} BTC at ${close}`);
      return true;
    }
  }

  return false;
};

const buyBreakout = (candle) => {
  const resistance = 60000; // resistance level
  const close = parseFloat(candle.close);

  if (close > resistance) {
    const amount = amountPerTrade;
    const cost = amount * close;
    const fee = cost * commission;
    const totalCost = cost + fee;

    if (totalCost <= balance) {
      balance -= totalCost;
      holdings += amount;
      console.log(`Bought ${amount} BTC at ${close}`);
      return true;
    }
  }

  return false;
};

const sellPeak = (candle) => {
  const peak = 0.1; // 10% peak from last low
  const low = parseFloat(candle.low);

  if (lastLow === 0) {
    lastLow = low;
    return false;
  }

  const threshold = lastLow * (1 + peak);

  if (low > threshold) {
    const close = parseFloat(candle.close);
    const amount = holdings * amountPerTrade;
    const revenue = amount * close;
    const fee = revenue * commission;
    const totalRevenue = revenue - fee;

    if (totalRevenue > 0) {
      balance += totalRevenue;
      holdings -= amount;
      console.log(`Sold ${amount} BTC at ${close}`);
      return true;
    }
  }

  return false;
};

const sellBreakdown = (candle) => {
  const support = 50000; // support level
  const close = parseFloat(candle.close);

  if (close < support) {
    const amount = holdings * amountPerTrade;
    const revenue = amount * close;
    const fee = revenue * commission;
    const totalRevenue = revenue - fee;

    if (totalRevenue > 0) {
      balance += totalRevenue;
      holdings -= amount;
      console.log(`Sold ${amount} BTC at ${close}`);
      return true;
    }
  }

  return false;
};

for (let i = 0; i < data.length; i++) {
  const candle = data[i];

  if (buyDip(candle)) {
    continue;
  }

  if (buyBreakout(candle)) {
    continue;
  }

  if (sellPeak(candle)) {
    continue;
  }

  if (sellBreakdown(candle)) {
    continue;
  }

  lastHigh = parseFloat(candle.high);
  lastLow = parseFloat(candle.low);
}

console.log(`Final balance: ${balance.toFixed(2)}`);
