const indres = require('./indres');
const price = require('./price.json');
module.exports.getTrend = getTrend;


const currentPrice = price.last_price;

const currentTrend = indres.getTrend(price, '1h');
const globalTrend = indres.getTrend(price, '1d');
const last4Trend = indres.getTrend(price, '4h');
const last12Trend = indres.getTrend(price, '12h');
const last24Trend = indres.getTrend(price, '1d');

const currentSR = indres.getSupportResistance(price, '1h');
const last4SR = indres.getSupportResistance(price, '4h');
const last12SR = indres.getSupportResistance(price, '12h');
const last24SR = indres.getSupportResistance(price, '1d');

const currentOS = indres.getOverboughtOversold(price, '1h');
const last4OS = indres.getOverboughtOversold(price, '4h');
const last12OS = indres.getOverboughtOversold(price, '12h');
const last24OS = indres.getOverboughtOversold(price, '1d');

const entryRecommendation = indres.getRecommendations(price, '1h', 'entry');
const exitRecommendation = indres.getRecommendations(price, '1h', 'exit');
const last4EntryRecommendation = indres.getRecommendations(price, '4h', 'entry');
const last4ExitRecommendation = indres.getRecommendations(price, '4h', 'exit');
const last12EntryRecommendation = indres.getRecommendations(price, '12h', 'entry');
const last12ExitRecommendation = indres.getRecommendations(price, '12h', 'exit');
const last24EntryRecommendation = indres.getRecommendations(price, '1d', 'entry');
const last24ExitRecommendation = indres.getRecommendations(price, '1d', 'exit');

const buySellRecommendation = indres.getBuySellRecommendation(price, '1h');
const last4BuySellRecommendation = indres.getBuySellRecommendation(price, '4h');
const last12BuySellRecommendation = indres.getBuySellRecommendation(price, '12h');
const last24BuySellRecommendation = indres.getBuySellRecommendation(price, '1d');

console.log('Current price:', currentPrice);
console.log('Current trend:', currentTrend);
console.log('Global trend:', globalTrend);
console.log('Last 4 hours trend:', last4Trend);
console.log('Last 12 hours trend:', last12Trend);
console.log('Last 24 hours trend:', last24Trend);
console.log('Current support/resistance:', currentSR);
console.log('Last 4 hours support/resistance:', last4SR);
console.log('Last 12 hours support/resistance:', last12SR);
console.log('Last 24 hours support/resistance:', last24SR);
console.log('Current overbought/oversold:', currentOS);
console.log('Last 4 hours overbought/oversold:', last4OS);
console.log('Last 12 hours overbought/oversold:', last12OS);
console.log('Last 24 hours overbought/oversold:', last24OS);
console.log('Entry recommendation (1 hour):', entryRecommendation);
console.log('Exit recommendation (1 hour):', exitRecommendation);
console.log('Entry recommendation (last 4 hours):', last4EntryRecommendation);
console.log('Exit recommendation (last 4 hours):', last4ExitRecommendation);
console.log('Entry recommendation (last 12 hours):', last12EntryRecommendation);
console.log('Exit recommendation (last 12 hours):', last12ExitRecommendation);
console.log('Entry recommendation (last 24 hours):', last24EntryRecommendation);
console.log('Exit recommendation (last 24 hours):', last24ExitRecommendation);
console.log('Buy/sell recommendation (1 hour):', buySellRecommendation);
console.log('Buy/sell recommendation (last 4 hours):', last4BuySellRecommendation);
console.log('Buy/sell recommendation (last 12 hours):', last12BuySellRecommendation);
console.log('Buy/sell recommendation (last 24 hours):', last24BuySellRecommendation);
