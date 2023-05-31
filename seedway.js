const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const supportResistance = {
  support: [],
  resistance: [],
};

let currentTrend = null;
let currentLine = null;
let previousLine = null;

for (let i = 0; i < data.length; i++) {
  const candle = data[i];
  const high = candle.high;
  const low = candle.low;

  if (currentTrend === null) {
    if (i < data.length - 1) {
      const nextCandle = data[i + 1];
      if (nextCandle.high > high) {
        currentTrend = 'up';
        currentLine = {
          type: 'support',
          value: low,
          points: [{ x: i, y: low }],
        };
      } else if (nextCandle.low < low) {
        currentTrend = 'down';
        currentLine = {
          type: 'resistance',
          value: high,
          points: [{ x: i, y: high }],
        };
      }
    }
  } else if (currentTrend === 'up') {
    if (low < currentLine.value) {
      currentLine.points.push({ x: i, y: low });
      currentLine.value = low;
    } else if (high > currentLine.value * 1.01) {
      previousLine = currentLine;
      currentTrend = 'down';
      currentLine = {
        type: 'resistance',
        value: high,
        points: [{ x: i, y: high }],
      };
    }
  } else if (currentTrend === 'down') {
    if (high > currentLine.value) {
      currentLine.points.push({ x: i, y: high });
      currentLine.value = high;
    } else if (low < currentLine.value * 0.99) {
      previousLine = currentLine;
      currentTrend = 'up';
      currentLine = {
        type: 'support',
        value: low,
        points: [{ x: i, y: low }],
      };
    }
  }

  if (previousLine !== null) {
    if (previousLine.type === 'support' && currentLine.type === 'resistance' && currentLine.value < previousLine.value) {
      supportResistance.support.push(previousLine);
      supportResistance.resistance.push(currentLine);
      previousLine = null;
    } else if (previousLine.type === 'resistance' && currentLine.type === 'support' && currentLine.value > previousLine.value) {
      supportResistance.resistance.push(previousLine);
      supportResistance.support.push(currentLine);
      previousLine = null;
    }
  }
}

if (previousLine !== null) {
  if (previousLine.type === 'support') {
    supportResistance.support.push(previousLine);
  } else if (previousLine.type === 'resistance') {
    supportResistance.resistance.push(previousLine);
  }
}

console.log(supportResistance);

if (supportResistance.support.length >= 2 && supportResistance.resistance.length >= 2) {
    const lastSupport = supportResistance.support[supportResistance.support.length - 1];
    const previousSupport = supportResistance.support[supportResistance.support.length - 2];
    const lastResistance = supportResistance.resistance[supportResistance.resistance.length - 1];
    const previousResistance = supportResistance.resistance[supportResistance.resistance.length - 2];
  
    if (lastSupport.points[lastSupport.points.length - 1] === lastResistance.points[lastResistance.points.length - 1]) {
      console.log('Тренд боковой');
    } else if (lastSupport.points[lastSupport.points.length - 1] === previousResistance.points[previousResistance.points.length - 1]) {
      console.log('Тренд боковой');
    } else if (lastResistance.points[lastResistance.points.length - 1] === previousSupport.points[previousSupport.points.length - 1]) {
      console.log('Тренд боковой');
    }
  }