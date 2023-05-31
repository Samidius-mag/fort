const fs = require('fs');

// Читаем файл indres.json
fs.readFile('indres.json', (err, data) => {
  if (err) throw err;

  // Извлекаем массив значений объема OBV
  const indRes = JSON.parse(data);
  const obv = indRes.OBV;

  // Находим максимальное и минимальное значение объема
  const maxVolume = Math.max(...obv);
  const minVolume = Math.min(...obv);

  // Вычисляем среднее значение объема
  const avgVolume = ((maxVolume + minVolume) / 2)/1000000;

  // Определяем, насколько текущий объем отличается от среднего значения
  const currentVolume = (obv[obv.length - 1])/1000000;
  const volumeDiff = currentVolume - avgVolume;

  // Если текущий объем больше среднего значения, то это может свидетельствовать о продолжении тренда
  if (volumeDiff > 0) {
    console.log(`Текущий объем (${currentVolume.toFixed(5)}) больше среднего значения (${avgVolume.toFixed(5)}). Возможно, тренд продолжится.`);
  } else {
    console.log(`Текущий объем (${currentVolume.toFixed(5)}) меньше или равен среднему значению (${avgVolume.toFixed(5)}). Возможно, тренд завершится.`);
  }
});