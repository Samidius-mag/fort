const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
const candles = data.slice(0, -1);

function isAscendingTriangle(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.high === second.high && second.high > third.high &&
         first.low < second.low && second.low < third.low;
}

function isDescendingTriangle(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.low === second.low && second.low < third.low &&
         first.high > second.high && second.high > third.high;
}

function isSymmetricalTriangle(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.high === second.high && second.high === third.high &&
         first.low < second.low && second.low < third.low;
}

function isCupWithHandle(candles) {
  if (candles.length < 7) {
    return false;
  }

  const [first, second, third, fourth, fifth, sixth, seventh] = candles.slice(-7);

  return first.high < second.high && second.high < third.high &&
         third.high > fourth.high && fourth.high === fifth.high &&
         fifth.high === sixth.high && sixth.high === seventh.high &&
         fourth.low < fifth.low && fifth.low < sixth.low &&
         sixth.low < seventh.low;
}

function isBearishDiamond(candles) {
  if (candles.length < 4) {
    return false;
  }

  const [first, second, third, fourth] = candles.slice(-4);

  return first.high > second.high && second.low > third.low &&
         third.high > fourth.high && second.high < fourth.low &&
         first.high > fourth.low && first.low < third.high;
}

function isDoubleBottom(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.low === second.low && third.low === fourth.low &&
           second.high > third.high && second.low < third.low;
  }
  
  function isDoubleTop(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.high === second.high && third.high === fourth.high &&
           second.low < third.low && second.high > third.high;
  }
  
  function isTripleBottom(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    return first.low === second.low && second.low === fifth.low &&
           third.low < second.low && third.low < fourth.low &&
           fourth.low < fifth.low && second.high > third.high &&
           fourth.high > third.high;
  }
  
  function isTripleTop(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    return first.high === second.high && second.high === fifth.high &&
           third.high > second.high && third.high > fourth.high &&
           fourth.high > fifth.high && second.low < third.low &&
           fourth.low < third.low;
  }
  
  function isFallingWedge(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    return first.high > second.high && second.high > third.high &&
           third.high > fourth.high && fourth.high > fifth.high &&
           second.low > third.low && fourth.low > fifth.low &&
           (third.high - third.low) < (second.high - second.low) &&
           (fourth.high - fourth.low) < (second.high - second.low);
  }
  
  function isRisingWedge(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    return first.low < second.low && second.low < third.low &&
           third.low < fourth.low && fourth.low < fifth.low &&
           second.high < third.high && fourth.high < fifth.high &&
           (third.high - third.low) < (second.high - second.low) &&
           (fourth.high - fourth.low) < (second.high - second.low);
  }

  function isBullishFlag(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    const pole = first.high - fifth.low;
  
    return second.high > first.high && second.low > first.low &&
           fifth.high > fourth.high && fifth.low > fourth.low &&
           Math.abs(fourth.high - third.high) < (0.5 * pole) &&
           Math.abs(third.high - second.high) < (0.5 * pole) &&
           Math.abs(third.low - second.low) < (0.5 * pole);
  }
  
  function isBearishFlag(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    const pole = fifth.high - first.low;
  
    return second.high < first.high && second.low < first.low &&
           fifth.high < fourth.high && fifth.low < fourth.low &&
           Math.abs(fourth.low - third.low) < (0.5 * pole) &&
           Math.abs(third.low - second.low) < (0.5 * pole) &&
           Math.abs(third.high - second.high) < (0.5 * pole);
  }
  
  function isHeadAndShoulders(candles) {
    if (candles.length < 7) {
      return false;
    }
  
    const [first, second, third, fourth, fifth, sixth, seventh] = candles.slice(-7);
  
    return second.high > first.high && second.low > first.low &&
           fourth.high > third.high && fourth.low > third.low &&
           sixth.high > fifth.high && sixth.low > fifth.low &&
           second.high > seventh.high && sixth.high > seventh.high &&
           (second.high - seventh.high) > (2 * (sixth.high - seventh.high)) &&
           (fourth.high - seventh.high) > (2 * (sixth.high - seventh.high));
  }
  
  function isPennant(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    const pole = first.high - fifth.low;
  
    return second.high > first.high && second.low > first.low &&
           fifth.high > fourth.high && fifth.low > fourth.low &&
           Math.abs(fourth.high - third.high) < (0.5 * pole) &&
           Math.abs(third.high - second.high) < (0.5 * pole) &&
           Math.abs(third.low - second.low) < (0.5 * pole) &&
           Math.abs(fifth.high - first.high) < (0.1 * pole) &&
           Math.abs(fifth.low - first.low) < (0.1 * pole);
  }

let patternFound = false;

if (isAscendingTriangle(candles)) {
  console.log('Восходящий треугольник');
  patternFound = true;
}

if (isDescendingTriangle(candles)) {
  console.log('Нисходящий треугольник');
  patternFound = true;
}

if (isSymmetricalTriangle(candles)) {
  console.log('Симметричный треугольник');
  patternFound = true;
}

if (isCupWithHandle(candles)) {
  console.log('Чашка с ручкой');
  patternFound = true;
}

if (isBearishDiamond(candles)) {
  console.log('Медвежий паттерн бриллиант');
  patternFound = true;
}

if (isDoubleBottom(candles)) {
    console.log('Двойное дно');
    patternFound = true;
  }
  
  if (isDoubleTop(candles)) {
    console.log('Двойная вершина');
    patternFound = true;
  }
  
  if (isTripleBottom(candles)) {
    console.log('Тройное дно');
    patternFound = true;
  }
  
  if (isTripleTop(candles)) {
    console.log('Тройная вершина');
    patternFound = true;
  }
  
  if (isFallingWedge(candles)) {
    console.log('Падающий клин');
    patternFound = true;
  }
  
  if (isRisingWedge(candles)) {
    console.log('Растущий клин');
    patternFound = true;
  }

  if (isBullishFlag(candles)) {
    console.log('Бычий флаг');
    patternFound = true;
  }
  
  if (isBearishFlag(candles)) {
    console.log('Медвежий флаг');
    patternFound = true;
  }
  
  if (isHeadAndShoulders(candles)) {
    console.log('Голова и плечи');
    patternFound = true;
  }
  
  if (isPennant(candles)) {
    console.log('Вымпел');
    patternFound = true;
  }

if (!patternFound) {
  console.log('Графические патерны не найдены');
}