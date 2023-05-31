/*
const fs = require('fs');

const priceData = JSON.parse(fs.readFileSync('price.json'));
const analysisData = JSON.parse(fs.readFileSync('anres.json'));

const averageVolume = analysisData.averageVolume;

const result = [];

for (let i = 1; i < priceData.length - 1; i++) { // не учитываем первую и последнюю свечу
  const currentCandle = priceData[i];
  const prevCandle = priceData[i - 1];
  const currentVolume = parseFloat(currentCandle.volume);
  const prevVolume = parseFloat(prevCandle.volume);
  if (!isNaN(currentVolume) && !isNaN(prevVolume)) {
    const volumeRatio = currentVolume / prevVolume;
    const date = new Date(currentCandle.time);
    const dateString = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
    if (volumeRatio > 1.5 && currentVolume > averageVolume) {
      result.push({
        date: dateString,
        volume: currentVolume,
        direction: 'bullish'
      });
    } else if (volumeRatio < 0.5 && currentVolume < averageVolume) {
      result.push({
        date: dateString,
        volume: currentVolume,
        direction: 'bearish'
      });
    } else {
      result.push({
        date: dateString,
        volume: currentVolume,
        direction: 'stable'
      });
    }
  }
}

fs.writeFileSync('vol.json', JSON.stringify(result));
*/
const fs = require('fs');

const priceData = JSON.parse(fs.readFileSync('price.json'));
const analysisData = JSON.parse(fs.readFileSync('anres.json'));

const averageVolume = analysisData.averageVolume;

const result = [];

for (let i = 1; i < priceData.length - 1; i++) { // не учитываем первую и последнюю свечу
  const currentCandle = priceData[i];
  const currentVolume = parseFloat(currentCandle.volume);
  if (!isNaN(currentVolume)) {
    const medianVolume = getMedianVolume(priceData, i, 5); // медианный объем за последние 5 свечей
    if (currentVolume > medianVolume && currentVolume > averageVolume) {
      result.push({
        time: currentCandle.time,
        volume: currentVolume,
        direction: 'bullish'
      });
    } else if (currentVolume < medianVolume && currentVolume < averageVolume) {
      result.push({
        time: currentCandle.time,
        volume: currentVolume,
        direction: 'bearish'
      });
    } else {
      result.push({
        time: currentCandle.time,
        volume: currentVolume,
        direction: 'stable'
      });
    }
  }
}

fs.writeFileSync('vol.json', JSON.stringify(result));

function getMedianVolume(data, index, count) {
  const volumes = [];
  for (let i = index - count; i < index; i++) {
    const candle = data[i];
    if (candle && candle.volume) {
      const volume = parseFloat(candle.volume);
      if (!isNaN(volume)) {
        volumes.push(volume);
      }
    }
  }
  volumes.sort((a, b) => a - b);
  const middle = Math.floor(volumes.length / 2);
  if (volumes.length % 2 === 0) {
    return (volumes[middle - 1] + volumes[middle]) / 2;
  } else {
    return volumes[middle];
  }
}