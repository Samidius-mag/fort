const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const volume = data.map(candle => parseFloat(candle.volume));

// Считаем средний объем за последние 100 свечей
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;

// Определяем текущий тренд
const currentTrend = data.slice(-2)[0].close > data.slice(-2)[0].open ? 'up' : 'down';


// Фильтруем свечи с объемом выше среднего и получаем массив цен закрытий этих свечей
const highVolumeCandles = data.filter(candle => candle.volume > averageVolume).map(candle => candle.close);

console.log(`Средний объем за последние 100 свечей: ${averageVolume}`);
console.log(`Текущий тренд: ${currentTrend}`);
console.log(`Количество свечей с объемом выше среднего: ${highVolumeCandles.length}`);
console.log(`Цены закрытий свечей с объемом выше среднего:`);
console.log(highVolumeCandles);