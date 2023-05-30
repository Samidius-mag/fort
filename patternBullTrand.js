const fs = require('fs');

const data = JSON.parse(fs.readFileSync('price.json'));
const candles = data.slice(0, -1);

function isFallingStar(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close < first.open && Math.abs(first.close - first.open) / (first.high - first.low) > 0.6 &&
           second.close < second.open && Math.abs(second.close - second.open) / (second.high - second.low) > 0.6 &&
           third.close < third.open && Math.abs(third.close - third.open) / (third.high - third.low) > 0.6 &&
           fourth.close > third.close && fourth.close > third.open && fourth.close > second.close && fourth.close > second.open &&
           fourth.close > first.close && fourth.close > first.open && fourth.open < third.close && fourth.open < third.open &&
           fourth.open < second.close && fourth.open < second.open && fourth.open < first.close && fourth.open < first.open;
  }
  
  function isBearishQuest(candles) {
    if (candles.length < 5) {
      return false;
    }
  
    const [first, second, third, fourth, fifth] = candles.slice(-5);
  
    return first.close > first.open && second.close > second.open && third.close > third.open &&
           fourth.close < fourth.open && fifth.close < fifth.open &&
           first.close < second.close && second.close < third.close &&
           fourth.close < fifth.open && fifth.open < fourth.open &&
           fourth.close > third.close && fifth.open < first.open;
  }
  
  function isBearishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close > first.open && second.open < first.close;
  }
  
  function isBearishEngulfing(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.close < first.open && second.open > first.close;
  }
  
  function isSouthernEveningStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close > second.open && third.close < third.open &&
           third.close < first.close && third.close < first.open &&
           second.close < first.close && second.close < first.open &&
           third.open > second.close && third.open < second.open;
  }
  
  function isThreeLineStrike(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close > first.open && second.close > second.open && third.close > third.open &&
           fourth.close < first.open && fourth.open < second.close;
  }
  
  function isDojiStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close < second.open && third.close < third.open &&
           second.close > first.close && second.open < first.open &&
           third.close > second.close && third.open < second.open &&
           Math.abs(second.close - second.open) / (second.high - second.low) < 0.1;
  }
  
  function isMorningStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close < first.open && second.close < second.open && third.close > third.open &&
           third.close > first.close && third.close > first.open &&
           second.close < first.close && second.close < first.open &&
           third.open < second.close && third.open > first.close && third.open > first.open;
  }
  
  function isBullishPincer(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close > second.open && third.close > third.open &&
           second.close < first.close && second.open > first.open &&
           third.close < second.close && third.open > second.open &&
           third.close > first.close && third.open < first.open;
  }
  
  function isBearishWindow(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.open > first.close && second.close < first.open;
  }

  function isEveningStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close > second.open && third.close < third.open &&
           third.close < first.close && third.close < first.open &&
           second.close < first.close && second.close < first.open &&
           third.open > second.close && third.open < second.open;
  }
  
  function isBearishMeetingLines(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close > second.open &&
           second.close < first.close && second.open > first.open;
  }
  
  function isBearishThreeLineStrike(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const [first, second, third, fourth] = candles.slice(-4);
  
    return first.close > first.open && second.close > second.open && third.close > third.open &&
           fourth.close < first.open && fourth.open < second.close;
  }
  
  function isHangingMan(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const [first] = candles.slice(-1);
  
    return first.close < first.open && first.low === first.min && first.high - first.close < 2 * (first.open - first.close);
  }
  
  function isAbandonedBaby(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && third.close < third.open &&
           second.close < first.open && second.open > third.close &&
           second.close > third.open && second.open < first.close;
  }
  
  function isDarkCloudCover(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const [first, second] = candles.slice(-2);
  
    return first.close > first.open && second.close < second.open &&
           second.open > first.close && second.close < first.open &&
           (second.close + second.open) / 2 > first.high;
  }
  
  function isStrongUp(candles) {
    if (candles.length < 10) {
      return false;
    }
  
    const highs = candles.slice(-10).map(candle => candle.high);
  
    return highs.every((high, index) => index === 0 || high > highs[index - 1]);
  }
  
  function isBearishGame(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const [first, second, third] = candles.slice(-3);
  
    return first.close > first.open && second.close > second.open && third.close < third.open &&
           third.close < first.close && third.close < first.open &&
           second.close < first.close && second.close < first.open &&
           third.open > second.close && third.open < second.open &&
           third.close > first.close && third.open < first.open;
  }

  if (isFallingStar(candles)) {
    return 'Падающая звезда';
  }

  if (isBearishQuest(candles)) {
    return 'Медвежий квест';
  }

  if (isBearishHarami(candles)) {
    return 'Медвежье Харами';
  }

  if (isBearishEngulfing(candles)) {
    return 'Медвежье поглощение';
  }

  if (isSouthernEveningStar(candles)) {
    return 'Южный вечерний крест';
  }

  if (isThreeLineStrike(candles)) {
    return 'Трехлинейная звезда в задумчивости';
  }

  if (isDojiStar(candles)) {
    return 'Доджи в позиции звездный разворот';
  }

  if (isMorningStar(candles)) {
    return 'Звездный разворот';
  }

  if (isBullishPincer(candles)) {
    return 'Бычьи щипцы';
  }

  if (isBearishWindow(candles)) {
    return 'Медвежье окно';
  }

  if (isEveningStar(candles)) {
    console.log('Трех свечная вечерняя звезда');
  }
  
  if (isBearishMeetingLines(candles)) {
    console.log('Медвежья линия встречи');
  }
  
  if (isBearishThreeLineStrike(candles)) {
    console.log('Медвежий трех-линейный прорыв линии сопротивления');
  }
  
  if (isHangingMan(candles)) {
    console.log('Висельник');
  }
  
  if (isAbandonedBaby(candles)) {
    console.log('Покинутый ребёнок');
  }
  
  if (isDarkCloudCover(candles)) {
    console.log('Темная накрывающая туча');
  }
  
  if (isStrongUp(candles)) {
    console.log('Сильный верх, крепость');
  }
  
  if (isBearishGame(candles)) {
    console.log('Медвежья игра, заканчивающаяся разрывом');
  }
  
  if (!isEveningStar(candles) && !isBearishMeetingLines(candles) && !isBearishThreeLineStrike(candles) && !isBearishHarami(candles) && !isBearishEngulfing(candles) &&
      !isHangingMan(candles) && !isAbandonedBaby(candles) && !isDarkCloudCover(candles) && !isBearishQuest(candles) && !isSouthernEveningStar(candles) &&
      !isMorningStar(candles) && !isDojiStar(candles) && !isThreeLineStrike(candles) && !isStrongUp(candles) && !isFallingStar(candles) && !isBearishGame(candles) &&
      !isBullishPincer(candles) && !isBearishWindow(candles)){
    console.log('Свечи Бычьего тренда не найдены');
  }