const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

let totalVolume = 0;
let validCandlesCount = 0;
for (let i = 0; i < data.length - 1; i++) { // не учитываем последнюю свечу
  const candle = data[i];
  if (typeof candle.volume === 'number' && !isNaN(candle.volume)) {
    totalVolume += candle.volume;
    validCandlesCount++;
  }
}

const averageVolume = totalVolume / validCandlesCount;
console.log(`Average volume: ${averageVolume}`);