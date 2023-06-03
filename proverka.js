const fs = require('fs');
const regresData = fs.readFileSync('regres.json', 'utf-8').split('\n').filter(Boolean).map(JSON.parse);
const priceData = fs.readFileSync('price.json', 'utf-8');

const regresLinear = regresData.map(data => data.linear);
const regresNonlinear = regresData.map(data => data.nonlinear);
const priceClose = JSON.parse(priceData).map(candle => candle.close);

const result = regresLinear.map((linear, index) => {
  const nonlinear = regresNonlinear[index];
  const close = priceClose[index];
  const linearDiff = Math.abs(linear - close);
  const nonlinearDiff = Math.abs(nonlinear - close);
  console.log(`Для записи ${index}:`);
  console.log(`Линейная регрессия: ${linear}, текущая цена: ${close}, разница: ${linearDiff}`);
  console.log(`Нелинейная регрессия: ${nonlinear}, текущая цена: ${close}, разница: ${nonlinearDiff}`);
  return {
    linear,
    nonlinear,
    close,
    linearDiff,
    nonlinearDiff
  };
});

fs.writeFileSync('regres_compare.json', JSON.stringify(result, null, 2));