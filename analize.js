const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

let totalVolume = 0;
for (let i = 0; i < data.length - 1; i++) { // не учитываем последнюю свечу
  const candle = data[i];
  totalVolume += candle.volume;
}

const averageVolume = totalVolume / (data.length - 1); // делим на количество свечей минус одна
console.log(`Average volume: ${averageVolume}`);