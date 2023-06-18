const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));

// Считаем средний объем за последние 100 свечей
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;

// Разделяем свечи на две группы: свечи с объемом выше среднего и свечи с объемом ниже или равным среднему
const highVolumeCandles = data.filter(candle => candle.volume > averageVolume);
const lowVolumeCandles = data.filter(candle => candle.volume <= averageVolume);

// Считаем количество свечей с ростом цены и спадом цены в каждой группе
const highVolumeCandlesUp = highVolumeCandles.filter(candle => candle.close > candle.open).length;
const highVolumeCandlesDown = highVolumeCandles.filter(candle => candle.close < candle.open).length;
const lowVolumeCandlesUp = lowVolumeCandles.filter(candle => candle.close > candle.open).length;
const lowVolumeCandlesDown = lowVolumeCandles.filter(candle => candle.close < candle.open).length;

// Определяем закономерность между объемом и направлением движения рынка
let trend;
if (highVolumeCandlesUp > highVolumeCandlesDown) {
  trend = 'при увеличении объема рынок склонен к росту цены';
} else if (highVolumeCandlesUp < highVolumeCandlesDown) {
  trend = 'при увеличении объема рынок склонен к спаду цены';
} else {
  trend = 'нет закономерности между объемом и направлением движения рынка';
}

console.log(`Средний объем за последние 100 свечей: ${averageVolume}`);
console.log(`Текущий тренд: ${data.slice(-2)[0].close > data.slice(-2)[0].open ? 'up' : 'down'}`);
console.log(`Количество свечей с объемом выше среднего: ${highVolumeCandles.length}`);
console.log(`Количество свечей с объемом ниже или равным среднему: ${lowVolumeCandles.length}`);
console.log(`Количество свечей с ростом цены при объеме выше среднего: ${highVolumeCandlesUp}`);
console.log(`Количество свечей со спадом цены при объеме выше среднего: ${highVolumeCandlesDown}`);
console.log(`Количество свечей с ростом цены при объеме ниже или равном среднему: ${lowVolumeCandlesUp}`);
console.log(`Количество свечей со спадом цены при объеме ниже или равном среднему: ${lowVolumeCandlesDown}`);
console.log(`Закономерность между объемом и направлением движения рынка: ${trend}`);
