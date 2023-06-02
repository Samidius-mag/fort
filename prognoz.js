const canalizres = require('./canalizres.json');

const lastHigh = canalizres.channel[canalizres.channel.length - 1].high;
const lastLow = canalizres.channel[canalizres.channel.length - 1].low;

const nextHigh1 = lastHigh + (lastHigh - lastLow);
const nextLow1 = lastLow - (lastHigh - lastLow);

const nextPrice1 = (nextHigh1 + nextLow1) / 2;

console.log(`Next price prediction for the next hour: ${nextPrice1.toFixed(2)}`);

const nextHigh4 = nextHigh1 + (lastHigh - lastLow) * 3;
const nextLow4 = nextLow1 - (lastHigh - lastLow) * 3;

const nextPrice4 = (nextHigh4 + nextLow4) / 2;

console.log(`Next price prediction for the next 4 hours: ${nextLow4.toFixed(2)} - ${nextHigh4.toFixed(2)}`);