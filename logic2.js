const fs = require('fs');
const moment = require('moment');
const priceData = require('./price.json');
const indRes = require('./indres.json');

// Определение текущей цены
const currentPrice = parseFloat(priceData[priceData.length - 1].close).toFixed(2);
console.log('Текущая цена:', currentPrice);

// Определение изменения цены за последние 2 часа
const twoHoursAgo = moment().subtract(2, 'hours');
const lastTwoHoursPrices = priceData.filter(price => moment(price.time).isAfter(twoHoursAgo));
const firstPrice = parseFloat(lastTwoHoursPrices[0].close);
const lastPrice = parseFloat(lastTwoHoursPrices[lastTwoHoursPrices.length - 1].close);
const priceChange = ((lastPrice - firstPrice) / firstPrice) * 100;
console.log('Изменение цены:', priceChange.toFixed(2) + '%');

// Определение тренда
const trend = {
  current: currentPrice > indRes.EMA[indRes.EMA.length - 1] ? 'восходящий' : currentPrice < indRes.EMA[indRes.EMA.length - 1] ? 'нисходящий' : 'боковой',
  global: priceData[0].close > priceData[priceData.length - 1].close ? 'Нисходящий' : 'Восходящий',
  '4h': priceData[priceData.length - 1].close > priceData[priceData.length - 7].close ? 'Восходящий' : 'Нисходящий',
  '12h': priceData[priceData.length - 1].close > priceData[priceData.length - 25].close ? 'Восходящий' : 'Нисходящий',
  '24h': priceData[priceData.length - 1].close > priceData[priceData.length - 49].close ? 'Восходящий' : 'Нисходящий',
};

// Уровни поддержки и сопротивления



const supportResistance = {
  current: {
    support: parseFloat(indRes.BollingerBands.lower[indRes.BollingerBands.lower.length - 1]).toFixed(2),
    resistance: parseFloat(indRes.BollingerBands.upper[indRes.BollingerBands.upper.length - 1]).toFixed(2)
  },
  '4h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 7).map(candle => parseFloat(candle.high)))).toFixed(2)
  },
  '12h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 25).map(candle => parseFloat(candle.high)))).toFixed(2)
  },
  '24h': {
    support: parseFloat(Math.min(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.low)))).toFixed(2),
    resistance: parseFloat(Math.max(...priceData.slice(priceData.length - 49).map(candle => parseFloat(candle.high)))).toFixed(2)
  },
};

const isSideways = currentPrice >= supportResistance.current.support && currentPrice <= supportResistance.current.resistance 
 && currentPrice <= priceData[4].high && currentPrice >=priceData[4].low ;
if (isSideways) {
  //console.log('Тренд боковой', trend.current);
} else {
  //console.log('Тренд вышел из бокового движения');
}
/*
console.log('Текущий тренд:', trend.current);
console.log('4-часовой тренд:', trend['4h']);
console.log('12-часовой тренд:', trend['12h']);
console.log('24-часовой тренд:', trend['24h']);
console.log('Глобальный тренд:', trend.global);

console.log('Текущее сопротивление:', supportResistance.current.resistance);
console.log('Текущая поддержка:', supportResistance.current.support);
console.log('Сопротивление 4 часа:', supportResistance['4h'].resistance);
console.log('Поддержка 4 часа:', supportResistance['4h'].support);
console.log('Сопротивление 12 часов:', supportResistance['12h'].resistance);
console.log('Поддержка 12 часов:', supportResistance['12h'].support);
console.log('Сопротивление 24 часа:', supportResistance['24h'].resistance);
console.log('Поддержка 24 часа:', supportResistance['24h'].support);
*/
// Перекупленность/перепроданность рынка
const overboughtOversold = {
  RSI: {
    current: indRes.RSI[indRes.RSI.length - 1],
    overbought: 65,
    oversold: 35
  },
  ROC: {
    current: indRes.ROC[indRes.ROC.length - 1],
    overbought: 2,
    oversold: -2
  }
};
//console.log('RSI:', overboughtOversold.RSI.current);
//console.log('ROC:', overboughtOversold.ROC.current);

if (overboughtOversold.RSI.current > overboughtOversold.RSI.overbought) {
  console.log('[RS]Рынок перекуплен');
} else if (overboughtOversold.RSI.current < overboughtOversold.RSI.oversold) {
  console.log('[RS]Рынок перепродан');
}

if (overboughtOversold.ROC.current > overboughtOversold.ROC.overbought) {
  console.log('[RO]Рынок перекуплен');
} else if (overboughtOversold.ROC.current < overboughtOversold.ROC.oversold) {
  console.log('[RO]Рынок перепродан');
}

// Рекомендации по покупке/продаже
const buySell = {
  RSI: {
    buy: overboughtOversold.RSI.current < overboughtOversold.RSI.oversold,
    sell: overboughtOversold.RSI.current > overboughtOversold.RSI.overbought
  },
  ROC: {
    buy: overboughtOversold.ROC.current < overboughtOversold.ROC.oversold,
    sell: overboughtOversold.ROC.current > overboughtOversold.ROC.overbought
  }
};

if (buySell.RSI.buy && buySell.ROC.buy) {
  console.log('Рекомендуется покупка');
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Рекомендуется продажа');
}

// Точки входа-выхода в сделку
const entryExitPoints = {
  buy: {
    support: supportResistance.current.support,
    resistance: supportResistance.current.resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  },
  sell: {
    support: supportResistance.current.support,
    resistance: supportResistance.current.resistance,
    ema: indRes.EMA[indRes.EMA.length - 1],
    psar: indRes.PSAR[indRes.PSAR.length - 1]
  }
};

if (buySell.RSI.buy && buySell.ROC.buy) {
  console.log('Точка входа в сделку (покупка):', entryExitPoints.buy.support);
  console.log('Точка выхода из сделки:', entryExitPoints.buy.resistance);
  console.log('Стоп - лосс:', supportResistance['24h'].support)
} else if (buySell.RSI.sell && buySell.ROC.sell) {
  console.log('Точка входа в сделку (продажа):', entryExitPoints.sell.resistance);
  console.log('Точка выхода из сделки:', entryExitPoints.sell.support);
console.log('Стоп - лосс:', supportResistance['24h'].resistance)
}
