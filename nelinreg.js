const fs = require('fs');
const data = JSON.parse(fs.readFileSync('price.json'));

const x = data.map(candle => candle.time);
const y = data.map(candle => candle.close);
const f = (x, beta) => beta[0] + beta[1] * x + beta[2] * x * x;
const beta0 = Math.random();
const beta1 = Math.random();
const beta2 = Math.random();
const beta = [beta0, beta1, beta2];
const error = (beta, x, y) => {
    const yPredicted = x.map(xi => f(xi, beta));
    const residuals = y.map((yi, i) => yi - yPredicted[i]);
    const sumOfSquares = residuals.reduce((sum, residual) => sum + residual * residual, 0);
    return sumOfSquares;
  };
  const optimize = (beta, x, y) => {
    const options = { maxIterations: 1000 };
    const result = nelderMead(error, beta, options, x, y);
    return result.x;
  };

  const optimizedBeta = optimize(beta, x, y);

  const newX = [x[0], x[x.length - 1] + 3600 * 1000]; // новые значения времени (через час после последней свечи)
const newY = newX.map(xi => f(xi, optimizedBeta)); // предсказанные значения цены закрытия

console.log('Предсказанные значения:');
console.log(newY);