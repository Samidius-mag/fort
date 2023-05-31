const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volumes = data.map(candle => ({
  time: candle.time,
  volume: candle.volume,
  isBearish: candle.close < candle.open,
}));

const totalVolume = volumes.reduce((sum, candle) => sum + (candle.isBearish ? -candle.volume : candle.volume), 0);
const averageVolume = totalVolume / volumes.length;

const result = {
  totalVolume,
  averageVolume,
};

fs.writeFileSync('anres.json', JSON.stringify(result));
console.log('Result saved to anres.json');