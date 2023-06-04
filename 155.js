const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));

const localMaxima = [];
const localMinima = [];

for (let i = 1; i < data.length - 1; i++) {
  const prev = data[i - 1];
  const curr = data[i];
  const next = data[i + 1];

  if (curr.high > prev.high && curr.high > next.high) {
    localMaxima.push(curr);
  }

  if (curr.low < prev.low && curr.low < next.low) {
    localMinima.push(curr);
  }
}

console.log('Local maxima:', localMaxima);
console.log('Local minima:', localMinima);