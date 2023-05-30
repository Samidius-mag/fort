const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
const candles = data.slice(0, -1);

function isInvertedHammer(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const [first] = candles.slice(-1);
  
    return first.close < first.open && first.high - first.close < 2 * (first.open - first.close) &&
           first.high - first.open < 2 * (first.open - first.close);
  }
  
  function isBullishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.close < first.open && second.open > first.close;
  }
  
  function isBullishEngulfing(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.open < first.close && second.close > first.open;
  }
  
  function isHammer(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const [first] = candles.slice(-1);
  
    return first.close > first.open && first.high - first.close < 2 * (first.open - first.close) &&
           first.high - first.open < 2 * (first.open - first.close);
  }
  
  function isShortStars(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close < first.open && second.close < second.open && third.close < third.open &&
           first.high < second.high && second.high > third.high &&
           first.low > second.low && second.low < third.low;
  }
  
  function isMorningStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close < second.open && third.close > third.open &&
           third.close > first.close && third.close > first.open &&
           second.close < first.close && second.close < first.open &&
           third.open < second.close && third.open > second.open;
  }
  
  function isShortHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close;
  }
  
  function isStar(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const [first] = candles.slice(-1);
  
    return first.high - first.open < 2 * (first.close - first.open) &&
           first.high - first.close < 2 * (first.close - first.open);
  }
  
  function isPiercingLine(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.close < first.close && second.open > first.open &&
           (second.close + second.open) / 2 < first.low;
  }
  
  function isShortHaramiCross(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close &&
           second.high === second.low;
  }

  function isDoubleTop(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.high === second.high && second.low > third.low;
  }
  
  function isBearishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close;
  }
  
  function isThreeStarSouth(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close > second.open && third.close > third.open &&
           first.high < second.high && second.high > third.high &&
           first.low > second.low && second.low < third.low;
  }
  
  function isEngulfingHammer(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.open < first.close && second.close > first.open;
  }
  
  function isPiercingLineInScissors(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close &&
           (second.close + second.open) / 2 > first.high;
  }
  
  function isAbandonedBaby(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && third.close < third.open &&
           second.low > first.high && second.high < third.low;
  }
  
  function isStrongBottom(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close > first.open && second.close < second.open && third.close < third.open &&
           fourth.close > third.close && fourth.close > third.open &&
           fourth.close > first.close && fourth.close > first.open;
  }
  
  function isFastBreakAndThreeNewLows(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close > first.open && second.close < second.open && third.close < third.open &&
           fourth.close < third.low && third.low < second.low && second.low < first.low;
  }
  
  function isBullishHaramiCross(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.close < first.open && second.open > first.close &&
           second.high === second.low;
  }
  
  function isBullishMeetingLines(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close < second.open &&
           second.close > first.close && second.open < first.open &&
           (first.close - first.open) / 2 === (second.open - second.close) / 2;
  }

  function isTripleGapDown(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close < first.open && second.close < second.open && third.close < third.open &&
           first.close > second.close && second.close > third.close;
  }
  
  function isNewLows(candles) {
    if (candles.length < 10) {
      return false;
    }
  
    const lows = candles.slice(-10).map(candle => candle.low);
  
    for (let i = 1; i < lows.length; i++) {
      if (lows[i] >= lows[i - 1]) {
        return false;
      }
    }
  
    return true;
  }
  
  function isBullishWindow(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < first.low && second.open > first.high;
  }
  
  function isBullishThreeLineStrike(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close < first.open && second.close < second.open && third.close < third.open &&
           fourth.close > third.close && fourth.close > third.open &&
           fourth.close > second.close && fourth.close > second.open &&
           fourth.close > first.close && fourth.close > first.open;
  }
  
  function isBullishKicker(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.open > first.close && second.close > first.open;
  }
  
  function isReversalCandle(candle) {
    return (candle.close < candle.open && candle.close > candle.low + (candle.high - candle.low) / 2) ||
           (candle.close > candle.open && candle.open > candle.low + (candle.high - candle.low) / 2);
  }
  
  function isReversalPattern(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return isReversalCandle(first) && isReversalCandle(second) && isReversalCandle(third) &&
           first.close < second.close && second.close < third.close;
  }
  
  function isBullishEngulfing(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close < first.open && second.close > second.open &&
           second.close > first.open && second.open < first.close;
  }
  
  function isBullishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close;
  }

  if (isInvertedHammer(candles)) {
    console.log('Перевернутый молот 🔼');
  }
  
  if (isBullishHarami(candles)) {
    console.log('Бычья Харами 🔼');
  }
  
  if (isBullishEngulfing(candles)) {
    console.log('Бычье поглощение 🔼');
  }
  
  if (isHammer(candles)) {
    console.log('Молот 🔼');
  }
  
  if (isShortStars(candles)) {
    console.log('Короткие свечи в звездной позиции 🔼');
  }
  
  if (isMorningStar(candles)) {
    console.log('Утренняя звезда в трех-свечной позиции 🔼');
  }
  
  if (isShortHarami(candles)) {
    console.log('Короткая свеча в Харами позиции 🔼');
  }
  
  if (isStar(candles)) {
    console.log('Доджи в звездной позиции 🔼');
  }
  
  if (isPiercingLine(candles)) {
    console.log('Проникающая линия 🔼');
  }
  
  if (isShortHaramiCross(candles)) {
    console.log('Додж в харами позиции 🔼');
  }
  
  if (isDoubleTop(candles)) {
    console.log('Двойной толчок 🔼');
  }
  
  if (isBearishHarami(candles)) {
    console.log('Щипцы 🔼');
  }
  
  if (isThreeStarSouth(candles)) {
    console.log('Трехзвездный низ 🔼');
  }
  
  if (isEngulfingHammer(candles)) {
    console.log('Поглощение в сочетании с молотом 🔼');
  }
  
  if (isPiercingLineInScissors(candles)) {
    console.log('Проникающая линия в щипцах 🔼');
  }
  
  if (isAbandonedBaby(candles)) {
    console.log('Покинутый ребёнок 🔼');
  }
  
  if (isStrongBottom(candles)) {
    console.log('Сильное дно, крепость 🔼');
  }
  
  if (isFastBreakAndThreeNewLows(candles)) {
    console.log('Быстрый прорыв и три новых низа 🔼');
  }
  
  if (isBullishHaramiCross(candles)) {
    console.log('Бычий крест Харами 🔼');
  }
  
  if (isBullishMeetingLines(candles)) {
    console.log('Бычья линия встречи 🔼');
  }
  
  if (isTripleGapDown(candles)) {
    console.log('Тройной гэп на черных свечах 🔼');
  }
  
  if (isNewLows(candles)) {
    console.log('8-10 новых низов 🔼');
  }
  
  if (isBullishWindow(candles)) {
    console.log('Бычье окно 🔼');
  }
  
  if (isBullishThreeLineStrike(candles)) {
    console.log('Бычий трех-линейный прорыв поддержки 🔼');
  }
  
  if (isBullishKicker(candles)) {
    console.log('Бычья игра заканчивающаяся разрывом (гэпом) 🔼');
  }
  
  if (isReversalPattern(candles)) {
    console.log('Перевернутый молот, крепость, додж и бычье поглощение 🔼');
  }
  
  if (isBullishEngulfing(candles)) {
    console.log('Перевернутый молот, крепость, додж и бычье поглощение 🔼');
  }
  
  if (isBullishHarami(candles)) {
    console.log('Перевернутый молот, крепость, додж и бычье поглощение 🔼');
  }
  

  if (!isInvertedHammer(candles) && !isBullishHarami(candles) && !isBullishEngulfing(candles) &&
      !isHammer(candles) && !isShortStars(candles) && !isMorningStar(candles) &&
      !isShortHarami(candles) && !isStar(candles) && !isPiercingLine(candles) &&
      !isShortHaramiCross(candles) && !isTripleGapDown(candles) && !isNewLows(candles) && !isBullishWindow(candles) &&
      !isBullishThreeLineStrike(candles) && !isBullishKicker(candles) && !isReversalPattern(candles) &&
      !isBullishEngulfing(candles) && !isBullishHarami(candles) && !isDoubleTop(candles) && !isBearishHarami(candles) && !isThreeStarSouth(candles) &&
      !isEngulfingHammer(candles) && !isPiercingLineInScissors(candles) && !isAbandonedBaby(candles) &&
      !isStrongBottom(candles) && !isFastBreakAndThreeNewLows(candles) && !isBullishHaramiCross(candles) &&
      !isBullishMeetingLines(candles)){
    console.log('Свечи разворота рынка в 🔼 не найдены');
  }

