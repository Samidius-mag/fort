const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));


const supportResistance = {
  support: [],
  resistance: []
};

const findSupportResistance = (data) => {
  const points = data.map((item) => item.close);
  const extrema = findExtrema(points, 5); // находим локальные экстремумы цены
  const lines = findLines(extrema); // находим линии поддержки и сопротивления
  updateSupportResistance(lines); // обновляем список линий поддержки и сопротивления
};

const findExtrema = (points, windowSize) => {
  const extrema = [];
  for (let i = windowSize; i < points.length - windowSize; i++) {
    const window = points.slice(i - windowSize, i + windowSize + 1);
    const max = Math.max(...window);
    const min = Math.min(...window);
    if (points[i] === max) {
      extrema.push({ index: i, value: max, type: 'max' });
    } else if (points[i] === min) {
      extrema.push({ index: i, value: min, type: 'min' });
    }
  }
  return extrema;
};

const findLines = (extrema) => {
  const lines = [];
  for (let i = 0; i < extrema.length - 1; i++) {
    const current = extrema[i];
    const next = extrema[i + 1];
    if (current.type === 'min' && next.type === 'max') {
      lines.push({ type: 'support', value: current.value, points: [current, next] });
    } else if (current.type === 'max' && next.type === 'min') {
      lines.push({ type: 'resistance', value: current.value, points: [current, next] });
    }
  }
  return lines;
};

const updateSupportResistance = (lines) => {
  const last = supportResistance.resistance[supportResistance.resistance.length - 1];
  const previous = supportResistance.resistance[supportResistance.resistance.length - 2];
  if (last && previous && last.type === 'resistance' && previous.type === 'resistance') {
    const lastPoint = last.points[last.points.length - 1];
    const previousPoint = previous.points[previous.points.length - 1];
    if (lastPoint.value <= previousPoint.value) {
      supportResistance.support.push(last);
      supportResistance.resistance.pop();
    }
  } else {
    supportResistance.resistance.push(lines[lines.length - 1]);
  }
};

findSupportResistance(data);
console.log(supportResistance);

if (supportResistance.support.length >= 2 && supportResistance.resistance.length >= 2) {
  const lastSupport = supportResistance.support[supportResistance.support.length - 1];
  const previousSupport = supportResistance.support[supportResistance.support.length - 2];
  const lastResistance = supportResistance.resistance[supportResistance.resistance.length - 1];
  const previousResistance = supportResistance.resistance[supportResistance.resistance.length - 2];

  if (lastSupport.points[lastSupport.points.length - 1].x === lastResistance.points[lastResistance.points.length - 1].x) {
    console.log('Тренд боковой');
  } else if (lastSupport.points[lastSupport.points.length - 1].x === previousResistance.points[previousResistance.points.length - 1].x) {
    console.log('Тренд боковой');
  } else if (lastResistance.points[lastResistance.points.length - 1].x === previousSupport.points[previousSupport.points.length - 1].x) {
    console.log('Тренд боковой');
  }
}