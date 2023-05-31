const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
const candles = data.slice(0, -1);

function isThreeWhiteSoldiers(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < second.close && second.close < third.close &&
         first.open < first.close && second.open < second.close && third.open < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeDescending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > second.close && second.close > third.close &&
         first.open > first.close && second.open > second.close && third.open > third.close &&
         first.open - first.close > (first.high - first.open) * 0.5 &&
         second.open - second.close > (second.high - second.open) * 0.5 &&
         third.open - third.close > (third.high - third.open) * 0.5;
}

function isThreeAscending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < second.close && second.close < third.close &&
         first.open < first.close && second.open < second.close && third.open < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeBlackCrows(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > first.open && second.close > second.open && third.close > third.open &&
         first.close > second.close && second.close > third.close &&
         first.close - first.open > (first.high - first.close) * 0.5 &&
         second.close - second.open > (second.high - second.close) * 0.5 &&
         third.close - third.open > (third.high - third.close) * 0.5;
}

function isBearishTasukiGap(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close > first.open && second.open > second.close &&
         second.open < first.close && second.close > first.open &&
         second.close - second.open < (second.high - second.close) * 0.5 &&
         first.close - first.open > (first.high - first.close) * 0.5;
}

function isBullishTasukiGap(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close < first.open && second.open < second.close &&
         second.open > first.close && second.close < first.open &&
         second.close - second.open < (second.close - second.low) * 0.5 &&
         first.open - first.close > (first.open - first.low) * 0.5;
}

function isThreeBullishWings(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close < first.open && second.close > second.open && third.close > third.open &&
         first.close < second.close && second.close < third.close &&
         first.close - first.open > (first.open - first.low) * 0.5 &&
         second.close - second.open > (second.open - second.low) * 0.5 &&
         third.close - third.open > (third.open - third.low) * 0.5;
}

function isThreeConcurrentWings(candles) {
  if (candles.length < 3) {
    return false;
  }

  const [first, second, third] = candles.slice(-3);

  return first.close > first.open && second.close > second.open && third.close > third.open &&
         first.close > second.close && second.close > third.close &&
         first.close - first.open > (first.high - first.close) * 0.5 &&
         second.close - second.open > (second.high - second.close) * 0.5 &&
         third.close - third.open > (third.high - third.close) * 0.5;
}

function isBullishGapSideBySideWhiteLines(candles) {
  if (candles.length < 2) {
    return false;
  }

  const [first, second] = candles.slice(-2);

  return first.close < first.open && second.close > second.open &&
         second.open > first.close && second.close < first.open &&
         second.close - second.open < (second.high - second.close) * 0.5 &&
         first.open - first.close > (first.open - first.low) * 0.5;
}

if (isThreeWhiteSoldiers(candles)) {
  console.log('Три белых солдата ⏭');
}

if (isThreeDescending(candles)) {
  console.log('Метод трех снижений ⏭');
}

if (isThreeAscending(candles)) {
  console.log('Метод трех восхождений ⏭');
}

if (isThreeBlackCrows(candles)) {
  console.log('Три вороны ⏭');
}

if (isBearishTasukiGap(candles)) {
  console.log('Медвежий гэп "Тазуки" ⏭');
}

if (isBullishTasukiGap(candles)) {
  console.log('Бычий гэп "Тазуки" ⏭');
}

if (isThreeBullishWings(candles)) {
  console.log('Три крыла Бозу ⏭');
}

if (isThreeConcurrentWings(candles)) {
  console.log('Три одновременных крыла ⏭');
}

if (isBullishGapSideBySideWhiteLines(candles)) {
  console.log('Бычий гэп край к краю белых линий ⏭');
}

if (!isThreeWhiteSoldiers(candles) && !isThreeDescending(candles) && !isThreeAscending(candles) &&
    !isThreeBlackCrows(candles) && !isBearishTasukiGap(candles) && !isBullishTasukiGap(candles) &&
    !isThreeBullishWings(candles) && !isThreeConcurrentWings(candles) && !isBullishGapSideBySideWhiteLines(candles)) {
  console.log('Свечи продолжения движения ⏭ тренда не найдены');
}