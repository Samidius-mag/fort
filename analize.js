const fs = require('fs');

// Читаем файл indres.json
fs.readFile('indres.json', (err, data) => {
  if (err) throw err;

  // Извлекаем массив значений объема OBV
  const indRes = JSON.parse(data);
  const obv = indRes.OBV;

  // Считаем среднее значение объема
  const sum = obv.reduce((acc, val) => acc + val, 0);
  const avg = sum / obv.length;

  console.log(`Средний объем: ${avg}`);
});