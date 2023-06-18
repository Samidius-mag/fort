const fs = require('fs');
const { correlation } = require('simple-statistics');
const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));

// Считаем средний объем за последние 100 свечей
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;

// Разделяем свечи на две группы: свечи с объемом выше среднего и свечи с объемом ниже или равным среднему
const highVolumeCandles = data.filter(candle => candle.volume > averageVolume);
const lowVolumeCandles = data.filter(candle => candle.volume <= averageVolume);

// Считаем коэффициент корреляции между объемом и изменением цены для каждой группы
const highVolumeCorrelation = correlation(highVolumeCandles.map(candle => candle.volume), highVolumeCandles.map(candle => candle.close - candle.open));
const lowVolumeCorrelation = correlation(lowVolumeCandles.map(candle => candle.volume), lowVolumeCandles.map(candle => candle.close - candle.open));

// Определяем закономерность между объемом, корреляцией и направлением движения рынка
let trend;
let correlationTrend;
if (highVolumeCorrelation > lowVolumeCorrelation) {
  correlationTrend = 'при увеличении объема корреляция между объемом и изменением цены увеличивается';
  trend = data.slice(-2)[0].close > data.slice(-2)[0].open ? 'up' : 'down';
  if (highVolumeCandles.filter(candle => candle.close > candle.open).length > highVolumeCandles.filter(candle => candle.close < candle.open).length) {
    correlationTrend += ' и рынок склонен к росту цены';
    if (trend === 'up') {
      trend = 'подтверждается текущий тренд';
    } else {
      trend = 'текущий тренд может измениться на рост цены';
    }
  } else {
    correlationTrend += ' и рынок склонен к спаду цены';
    if (trend === 'down') {
      trend = 'подтверждается текущий тренд';
    } else {
      trend = 'текущий тренд может измениться на спад цены';
    }
  }
} else if (highVolumeCorrelation < lowVolumeCorrelation) {
  correlationTrend = 'при увеличении объема корреляция между объемом и изменением цены уменьшается';
  trend = data.slice(-2)[0].close > data.slice(-2)[0].open ? 'down' : 'up';
  if (highVolumeCandles.filter(candle => candle.close > candle.open).length > highVolumeCandles.filter(candle => candle.close < candle.open).length) {
    correlationTrend += ' и рынок склонен к спаду цены';
    if (trend === 'down') {
      trend = 'подтверждается текущий тренд';
    } else {
      trend = 'текущий тренд может измениться на спад цены';
    }
  } else {
    correlationTrend += ' и рынок склонен к росту цены';
    if (trend === 'up') {
      trend = 'подтверждается текущий тренд';
    } else {
      trend = 'текущий тренд может измениться на рост цены';
    }
  }
} else {
  correlationTrend = 'нет закономерности между объемом и изменением цены';
  trend = 'нет закономерности между объемом и направлением движения рынка';
}

console.log(`Средний объем: ${averageVolume}`);
console.log(`Текущий тренд: ${data.slice(-2)[0].close > data.slice(-2)[0].open ? 'up' : 'down'}`);
console.log(`Количество свечей с объемом выше среднего: ${highVolumeCandles.length}`);
console.log(`Количество свечей с объемом ниже или равным среднему: ${lowVolumeCandles.length}`);
console.log(`Коэффициент корреляции между объемом и изменением цены при объеме выше среднего: ${highVolumeCorrelation}`);
console.log(`Коэффициент корреляции между объемом и изменением цены при объеме ниже или равном среднему: ${lowVolumeCorrelation}`);
console.log(`Закономерность между объемом, корреляцией и направлением движения рынка: ${correlationTrend}, ${trend}`);
