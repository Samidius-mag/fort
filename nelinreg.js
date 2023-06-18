const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

// Считаем средний объем за последние 100 свечей
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;

// Определяем текущий тренд
const currentTrend = data.slice(-2)[0].close > data.slice(-2)[0].open ? 'up' : 'down';

// Считаем количество свечей, в которых объем был выше среднего
const highVolumeCandles = data.filter(candle => candle.volume > averageVolume).length;

console.log(`Средний объем за последние 100 свечей: ${averageVolume}`);
console.log(`Текущий тренд: ${currentTrend}`);
console.log(`Количество свечей с объемом выше среднего: ${highVolumeCandles}`);