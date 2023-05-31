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