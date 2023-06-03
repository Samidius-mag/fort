const regression = require('regression');
const data = require('./price.json');

const filteredData = data.filter(({ time, close, low, high, volume }) => {
  return !isNaN(close) && !isNaN(low) && !isNaN(high) && !isNaN(volume) &&
    isFinite(close) && isFinite(low) && isFinite(high) && isFinite(volume);
});

const closeRegression = regression.linear(filteredData.map(({ close }, i) => [i, close]));
const lowRegression = regression.linear(filteredData.map(({ low }, i) => [i, low]));
const highRegression = regression.linear(filteredData.map(({ high }, i) => [i, high]));
const volumeRegression = regression.linear(filteredData.map(({ volume }, i) => [i, volume]));

const nextDayIndex = filteredData.length;
const nextDayClose = closeRegression.predict(nextDayIndex)[1];
const nextDayLow = lowRegression.predict(nextDayIndex)[1];
const nextDayHigh = highRegression.predict(nextDayIndex)[1];
const nextDayVolume = volumeRegression.predict(nextDayIndex)[1];

console.log('Next day close:', nextDayClose);
console.log('Next day low:', nextDayLow);
console.log('Next day high:', nextDayHigh);
console.log('Next day volume:', nextDayVolume);