const math = require('mathjs');
const data = require('./price.json');

const filteredData = data.filter(({ time, close, low, high, volume }) => {
  return !isNaN(close) && !isNaN(low) && !isNaN(high) && !isNaN(volume) &&
    isFinite(close) && isFinite(low) && isFinite(high) && isFinite(volume);
});

const closeRegression = math.regression(filteredData.map(({ close }) => close), filteredData.map((_, i) => i));
const lowRegression = math.regression(filteredData.map(({ low }) => low), filteredData.map((_, i) => i));
const highRegression = math.regression(filteredData.map(({ high }) => high), filteredData.map((_, i) => i));
const volumeRegression = math.regression(filteredData.map(({ volume }) => volume), filteredData.map((_, i) => i));

const nextDayIndex = filteredData.length;
const nextDayClose = closeRegression.predict(nextDayIndex);
const nextDayLow = lowRegression.predict(nextDayIndex);
const nextDayHigh = highRegression.predict(nextDayIndex);
const nextDayVolume = volumeRegression.predict(nextDayIndex);

console.log('Next day close:', nextDayClose);
console.log('Next day low:', nextDayLow);
console.log('Next day high:', nextDayHigh);
console.log('Next day volume:', nextDayVolume);