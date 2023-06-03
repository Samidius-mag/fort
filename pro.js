const fs = require('fs');

// Читаем файл indres.json
fs.readFile('indres.json', (err, data) => {
  if (err) throw err;

  // Извлекаем массив значений объема OBV
  const indRes = JSON.parse(data);
  const obv = indRes.OBV;

  let correctCount = 0;

  // Проверяем каждое значение объема
  for (let i = 0; i < obv.length; i++) {
    const currentVolume = obv[i];

    // Находим максимальное и минимальное значение объема
    const maxVolume = Math.max(...obv.slice(0, i + 1));
    const minVolume = Math.min(...obv.slice(0, i + 1));

    // Вычисляем среднее значение объема
    const avgVolume = (maxVolume + minVolume) / 2;

    // Определяем, насколько текущий объем отличается от среднего значения
    const volumeDiff = currentVolume - avgVolume;

    // Если текущий объем больше среднего значения, то это может свидетельствовать о продолжении тренда
    const isTrendContinuing = volumeDiff > 0;
console.log(`${isTrendContinuing.toFixed(2)}`)
    // Проверяем, правильный ли результат
    const expected = obv[i + 1] > avgVolume;
    if (isTrendContinuing === expected) {
      correctCount++;
    }
  }

  // Выводим процент правильных ответов
  const percentCorrect = (correctCount / obv.length) * 100;
  console.log(`Правильность логики: ${percentCorrect.toFixed(2)}%`);
});