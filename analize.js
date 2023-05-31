const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

let totalVolume = 0;
for (let i = 0; i < data.length; i++) {
  const candle = data[i];
  totalVolume += candle.volume;
}

const averageVolume = totalVolume / data.length;
console.log(`Average volume: ${averageVolume}`);