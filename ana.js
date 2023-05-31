const fs = require('fs');

const priceData = JSON.parse(fs.readFileSync('price.json'));
const analysisData = JSON.parse(fs.readFileSync('anres.json'));

const averageVolume = analysisData.averageVolume;

for (let i = 1; i < priceData.length - 1; i++) { // не учитываем первую и последнюю свечу
  const currentCandle = priceData[i];
  const prevCandle = priceData[i - 1];
  const currentVolume = parseFloat(currentCandle.volume);
  const prevVolume = parseFloat(prevCandle.volume);
  if (!isNaN(currentVolume) && !isNaN(prevVolume)) {
    const volumeRatio = currentVolume / prevVolume;
    if (volumeRatio > 1.5 && currentVolume > averageVolume) {
      console.log(`Market is bullish at ${currentCandle.time}`);
    } else if (volumeRatio < 0.5 && currentVolume < averageVolume) {
      console.log(`Market is bearish at ${currentCandle.time}`);
    } else {
      console.log(`Market is stable at ${currentCandle.time}`);
    }
  }
}