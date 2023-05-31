const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const trendLength = 3; // длина тренда в свечах
const trendVolumeThreshold = 1000; // пороговое значение объема для продолжения тренда

let trendVolumes = [];
let trendVolumesSum = 0;
let trendVolumesCount = 0;

for (let i = 0; i < data.length; i++) {
  const candle = data[i];

  if (i < trendLength) {
    trendVolumes.push(candle.volume);
    trendVolumesSum += candle.volume;
    trendVolumesCount++;
  } else {
    const trendVolume = trendVolumesSum / trendVolumesCount;

    if (trendVolume > trendVolumeThreshold) {
      console.log(`Trend continues with average volume ${trendVolume}`);
    } else {
      console.log(`Trend ends with average volume ${trendVolume}`);
    }

    trendVolumesSum -= trendVolumes.shift();
    trendVolumes.push(candle.volume);
    trendVolumesSum += candle.volume;
  }
}

fs.writeFileSync('anres.json', JSON.stringify(results));