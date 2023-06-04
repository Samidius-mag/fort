const fs = require('fs');
const data = JSON.parse(fs.readFileSync('price.json'));
const length = 5;
const btm_n = 3;
const top_n = 8;
let max_high = -Infinity;
let min_low = Infinity;
for (let i = 0; i < length; i++) {
  max_high = Math.max(max_high, data[i].high);
  min_low = Math.min(min_low, data[i].low);
}
let high = max_high;
let low = min_low;
for (let i = length; i < btm_n; i++) {
  if (data[i].high > high) {
    high = data[i].high;
  } else if (data[i].low < low) {
    low = data[i].low;
  }
}
for (let i = top_n; i < data.length; i++) {
  if (data[i].high > high) {
    high = data[i].high;
  } else if (data[i].low < low) {
    low = data[i].low;
  }
}
console.log(`Local high: ${high}`);
console.log(`Local low: ${low}`);