const data = require('./price15m.json');

// Функция для проверки паттерна "Три белых солдата"
function isThreeWhiteSoldiers(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close < secondCandle.open &&
    thirdCandle.close > thirdCandle.open &&
    firstCandle.close > secondCandle.close &&
    secondCandle.close > thirdCandle.close
  );
}

// Функция для проверки паттерна "Метод трех снижений"
function isThreeDescending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > secondCandle.close &&
    secondCandle.close > thirdCandle.close
  );
}

// Функция для проверки паттерна "Метод трех восхождений"
function isThreeAscending(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < secondCandle.close &&
    secondCandle.close < thirdCandle.close
  );
}

// Функция для проверки паттерна "Три вороны"
function isThreeBlackCrows(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    thirdCandle.close > thirdCandle.open &&
    firstCandle.close > secondCandle.close &&
    secondCandle.close > thirdCandle.close
  );
}

// Функция для проверки паттерна "Медвежий гэп Тазуки"
function isBearishTasukiGap(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close < firstCandle.close &&
    secondCandle.open > firstCandle.close &&
    thirdCandle.close < secondCandle.open &&
    thirdCandle.open > secondCandle.close
  );
}

// Функция для проверки паттерна "Бычий гэп Тазуки"
function isBullishTasukiGap(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close > firstCandle.close &&
    secondCandle.open < firstCandle.close &&
    thirdCandle.close > secondCandle.open &&
    thirdCandle.open < secondCandle.close
  );
}

// Функция для проверки паттерна "Три крыла Бозу"
function isThreeInsideUp(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close < firstCandle.close &&
    secondCandle.open > firstCandle.close &&
    thirdCandle.close > secondCandle.close &&
    thirdCandle.open > secondCandle.close &&
    thirdCandle.close > firstCandle.open &&
    thirdCandle.open < firstCandle.close
  );
}

// Функция для проверки паттерна "Три одновременных крыла"
function isThreeInsideDown(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close > firstCandle.close &&
    secondCandle.open < firstCandle.close &&
    thirdCandle.close < secondCandle.close &&
    thirdCandle.open < secondCandle.close &&
    thirdCandle.close < firstCandle.open &&
    thirdCandle.open > firstCandle.close
  );
}

// Функция для проверки паттерна "Бычий гэп край к краю белых линий ПРОДОЛЖЕНИЕ ТРЕНДА"
function isBullishKicker(candles) {
  if (candles.length < 2) {
    return false;
  }

  const firstCandle = candles[candles.length - 2];
  const secondCandle = candles[candles.length - 1];

  return (
    firstCandle.close === firstCandle.open &&
    secondCandle.close > firstCandle.high &&
    secondCandle.open > firstCandle.high
  );
}

// Функция для проверки паттерна "Падающая звезда"
function isEveningStar(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close > firstCandle.close &&
    secondCandle.open > firstCandle.close &&
    thirdCandle.close < secondCandle.open &&
    thirdCandle.open > secondCandle.close &&
    thirdCandle.close < firstCandle.close &&
    thirdCandle.open < firstCandle.open
  );
}

// Функция для проверки паттерна "Медвежий квест"
function isBearishHarami(candles) {
  if (candles.length < 2) {
    return false;
  }

  const firstCandle = candles[candles.length - 2];
  const secondCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close < secondCandle.open &&
    secondCandle.close > firstCandle.open &&
    secondCandle.open < firstCandle.close
  );
}

// Функция для проверки паттерна "Медвежье Харами"
function isBearishEngulfing(candles) {
  if (candles.length < 2) {
    return false;
  }

  const firstCandle = candles[candles.length - 2];
  const secondCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close < secondCandle.open &&
    secondCandle.close < firstCandle.open &&
    secondCandle.open > firstCandle.close
  );
}

// Функция для проверки паттерна "Южный вечерний крест"
function isSouthernDoji(candles) {
  if (candles.length < 4) {
    return false;
  }

  const firstCandle = candles[candles.length - 4];
  const secondCandle = candles[candles.length - 3];
  const thirdCandle = candles[candles.length - 2];
  const fourthCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    thirdCandle.close < thirdCandle.open &&
    fourthCandle.close < thirdCandle.open &&
    fourthCandle.close > thirdCandle.close &&
    fourthCandle.close > secondCandle.close &&
    fourthCandle.close > firstCandle.close &&
    fourthCandle.open < firstCandle.open
  );
}

// Функция для проверки паттерна "Трехлинейная звезда в задумчивости"
function isThreeLineStrike(candles) {
  if (candles.length < 4) {
    return false;
  }

  const firstCandle = candles[candles.length - 4];
  const secondCandle = candles[candles.length - 3];
  const thirdCandle = candles[candles.length - 2];
  const fourthCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    thirdCandle.close > thirdCandle.open &&
    fourthCandle.close < firstCandle.open &&
    fourthCandle.open > firstCandle.close
  );
}

// Функция для проверки паттерна "Доджи в позиции звездный разворот"
function isDojiStar(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close < firstCandle.close &&
    secondCandle.open > firstCandle.close &&
    thirdCandle.close > secondCandle.close &&
    thirdCandle.open < secondCandle.close &&
    thirdCandle.close < firstCandle.open &&
    thirdCandle.open > firstCandle.open
  );
}

// Функция для проверки паттерна "Звездный разворот"
function isMorningStar(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close < firstCandle.close &&
    secondCandle.open > firstCandle.close &&
    thirdCandle.close > secondCandle.open &&
    thirdCandle.open < secondCandle.close &&
    thirdCandle.close > firstCandle.open &&
    thirdCandle.open < firstCandle.close
  );
}

// Функция для проверки паттерна "Бычьи щипцы"
function isBullishHarami(candles) {
  if (candles.length < 2) {
    return false;
  }

  const firstCandle = candles[candles.length - 2];
  const secondCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    secondCandle.close < firstCandle.open &&
    secondCandle.open > firstCandle.close
  );
}

// Функция для проверки паттерна "Медвежье окно"
function isBearishBreakaway(candles) {
  if (candles.length < 5) {
    return false;
  }

  const firstCandle = candles[candles.length - 5];
  const secondCandle = candles[candles.length - 4];
  const thirdCandle = candles[candles.length - 3];
  const fourthCandle = candles[candles.length - 2];
  const fifthCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    thirdCandle.close > thirdCandle.open &&
    fourthCandle.close > fourthCandle.open &&
    fifthCandle.close < firstCandle.open &&
    fifthCandle.open > fifthCandle.close &&
    fifthCandle.open > fourthCandle.close &&
    fifthCandle.close < secondCandle.open &&
    fifthCandle.close < thirdCandle.open
  );
}

// Функция для проверки паттерна "Трех свечная вечерняя звезда"
function isEveningDojiStar(candles) {
  if (candles.length < 3) {
    return false;
  }

  const firstCandle = candles[candles.length - 3];
  const secondCandle = candles[candles.length - 2];
  const thirdCandle = candles[candles.length - 1];

  return (
    firstCandle.close > firstCandle.open &&
    secondCandle.close > secondCandle.open &&
    thirdCandle.close < thirdCandle.open &&
    thirdCandle.close < firstCandle.close &&
    thirdCandle.open > secondCandle.close &&
    Math.abs(secondCandle.close - secondCandle.open) <
      (secondCandle.high - secondCandle.low) * 0.1 &&
    Math.abs(thirdCandle.close - thirdCandle.open) <
      (thirdCandle.high - thirdCandle.low) * 0.1
  );
}

// Функция для проверки паттерна "Бычье окно"
function isBullishBreakaway(candles) {
  if (candles.length < 5) {
    return false;
  }

  const firstCandle = candles[candles.length - 5];
  const secondCandle = candles[candles.length - 4];
  const thirdCandle = candles[candles.length - 3];
  const fourthCandle = candles[candles.length - 2];
  const fifthCandle = candles[candles.length - 1];

  return (
    firstCandle.close < firstCandle.open &&
    secondCandle.close < secondCandle.open &&
    thirdCandle.close < thirdCandle.open &&
    fourthCandle.close < fourthCandle.open &&
    fifthCandle.close > firstCandle.open &&
    fifthCandle.open < fifthCandle.close &&
    fifthCandle.open < fourthCandle.close &&
    fifthCandle.close > secondCandle.open &&
    fifthCandle.close > thirdCandle.open
  );
}

// Функция для проверки паттерна "Медвежье поглощение"
function isBearishEngulfing(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.open > secondCandle.close &&
      secondCandle.open > firstCandle.high &&
      secondCandle.close < firstCandle.low
    );
  }
  
  // Функция для проверки паттерна "Медвежья линия встречи"
  function isBearishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      secondCandle.close > firstCandle.open &&
      secondCandle.open < firstCandle.close
    );
  }
  
  // Функция для проверки паттерна "Медвежий трех-линейный прорыв линии сопротивления"
  function isBearishBreakout(candles) {
    if (candles.length < 4) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 4];
    const secondCandle = candles[candles.length - 3];
    const thirdCandle = candles[candles.length - 2];
    const fourthCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close > secondCandle.open &&
      thirdCandle.close > thirdCandle.open &&
      fourthCandle.close < fourthCandle.open &&
      fourthCandle.close < thirdCandle.low &&
      thirdCandle.close < secondCandle.low &&
      secondCandle.close < firstCandle.low
    );
  }
  
  // Функция для проверки паттерна "Висельник"
  function isHangingMan(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const candle = candles[candles.length - 1];
  
    return (
      candle.close < candle.open &&
      candle.close === candle.low &&
      candle.close - candle.open < 2 * (candle.open - candle.low) &&
      candle.high - candle.close < 0.2 * (candle.open - candle.low)
    );
  }
  
  // Функция для проверки паттерна "Покинутый ребёнок"
  function isAbandonedBaby(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 3];
    const secondCandle = candles[candles.length - 2];
    const thirdCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      Math.abs(secondCandle.close - secondCandle.open) /
        (secondCandle.high - secondCandle.low) <
        0.2 &&
      thirdCandle.close > thirdCandle.open &&
      Math.abs(thirdCandle.close - thirdCandle.open) /
        (thirdCandle.high - thirdCandle.low) <
        0.2 &&
      secondCandle.high < firstCandle.low &&
      secondCandle.low > thirdCandle.high
    );
  }
  
  // Функция для проверки паттерна "Темная накрывающая туча"
  function isDarkCloudCover(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      secondCandle.close > firstCandle.close &&
      secondCandle.open < firstCandle.open &&
      (secondCandle.close + secondCandle.open) / 2 < firstCandle.close
    );
  }
  
  // Функция для проверки паттерна "Сильный верх, крепость"
  function isStrongResistance(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 3];
    const secondCandle = candles[candles.length - 2];
    const thirdCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close < firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      thirdCandle.close > thirdCandle.open &&
      thirdCandle.close > firstCandle.close &&
      thirdCandle.close > secondCandle.close &&
      thirdCandle.open > firstCandle.open &&
      thirdCandle.open > secondCandle.open
    );
  }
  
  // Функция для проверки паттерна "8-10 новых вершин"
  function isNewHigh(candles) {
    if (candles.length < 10) {
      return false;
    }
  
    const highs = candles
      .slice(candles.length - 10, candles.length)
      .map((candle) => candle.high);
  
    const maxHigh = Math.max(...highs);
  
    return highs[highs.length - 1] === maxHigh;
  }
  
  // Функция для проверки паттерна "Медвежья игра, заканчивающаяся разрывом"
  function isBearishHaramiCross(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      secondCandle.close > firstCandle.open &&
      secondCandle.open < firstCandle.close &&
      Math.abs(secondCandle.close - secondCandle.open) <
        (secondCandle.high - secondCandle.low) * 0.1 &&
      Math.abs(firstCandle.close - firstCandle.open) <
        (firstCandle.high - firstCandle.low) * 0.1
    );
  }
  
  // Функция для проверки паттерна "Перевернутый молот"
  function isInvertedHammer(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const candle = candles[candles.length - 1];
  
    return (
      candle.close > candle.open &&
      candle.close === candle.high &&
      candle.close - candle.open < 2 * (candle.open - candle.low) &&
      candle.high - candle.open < 0.2 * (candle.open - candle.low)
    );
  }
  
  // Функция для проверки паттерна "Бычья Харами"
  function isBullishHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close < firstCandle.open &&
      secondCandle.close > secondCandle.open &&
      secondCandle.close < firstCandle.open &&
      secondCandle.open > firstCandle.close
    );
  }
  
  // Функция для проверки паттерна "Бычье поглощение"
  function isBullishEngulfing(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close < firstCandle.open &&
      secondCandle.open < secondCandle.close &&
      secondCandle.open < firstCandle.low &&
      secondCandle.close > firstCandle.high
    );
  }
  
  // Функция для проверки паттерна "Молот"
  function isHammer(candles) {
    if (candles.length < 1) {
      return false;
    }
  
    const candle = candles[candles.length - 1];
  
    return (
      candle.close > candle.open &&
      candle.close === candle.high &&
      candle.close - candle.open < 2 * (candle.open - candle.low) &&
      candle.high - candle.open < 0.2 * (candle.open - candle.low)
    );
  }
  
  // Функция для проверки паттерна "Короткие свечи в звездной позиции"
  function isShortStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 3];
    const secondCandle = candles[candles.length - 2];
    const thirdCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      thirdCandle.close < thirdCandle.open &&
      Math.abs(secondCandle.close - secondCandle.open) /
        (secondCandle.high - secondCandle.low) <
        0.2 &&
      Math.abs(thirdCandle.close - thirdCandle.open) /
        (thirdCandle.high - thirdCandle.low) <
        0.2 &&
      thirdCandle.close < secondCandle.close &&
      thirdCandle.close > firstCandle.open &&
      thirdCandle.open < secondCandle.open &&
      thirdCandle.open > firstCandle.close
    );
  }
  
  // Функция для проверки паттерна "Утренняя звезда в трех-свечной позиции"
  function isMorningStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 3];
    const secondCandle = candles[candles.length - 2];
    const thirdCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      thirdCandle.close > thirdCandle.open &&
      secondCandle.close > firstCandle.close &&
      thirdCandle.open < secondCandle.close &&
      thirdCandle.close > firstCandle.open
    );
  }
  
  // Функция для проверки паттерна "Коротка свеча в Харами позиции"
  function isShortHarami(candles) {
    if (candles.length < 2) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 2];
    const secondCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      Math.abs(secondCandle.close - secondCandle.open) /
        (secondCandle.high - secondCandle.low) <
        0.2 &&
      secondCandle.close > firstCandle.open &&
      secondCandle.open < firstCandle.close
    );
  }
  
  // Функция для проверки паттерна "Доджи в звездной позиции"
  function isDojiStar(candles) {
    if (candles.length < 3) {
      return false;
    }
  
    const firstCandle = candles[candles.length - 3];
    const secondCandle = candles[candles.length - 2];
    const thirdCandle = candles[candles.length - 1];
  
    return (
      firstCandle.close > firstCandle.open &&
      secondCandle.close < secondCandle.open &&
      thirdCandle.close < thirdCandle.open &&
      Math.abs(secondCandle.close - secondCandle.open) /
        (secondCandle.high - secondCandle.low) <
        0.1 &&
      Math.abs(thirdCandle.close - thirdCandle.open) /
        (thirdCandle.high - thirdCandle.low) <
        0.1 &&
        thirdCandle.close < secondCandle.close &&
        thirdCandle.close > firstCandle.open &&
        thirdCandle.open < secondCandle.open &&
        thirdCandle.open > firstCandle.close
        );
        }

// Функция для проверки всех паттернов
function checkAllPatterns(candles) {
  const patterns = [
    isThreeWhiteSoldiers,
    isThreeDescending,
    isThreeAscending,
    isThreeBlackCrows,
    isBearishTasukiGap,
    isBullishTasukiGap,
    isThreeInsideUp,
    isThreeInsideDown,
    isBullishKicker,
    isEveningStar,
    isBearishHarami,
    isBearishEngulfing,
    isSouthernDoji,
    isThreeLineStrike,
    isDojiStar,
    isMorningStar,
    isBullishHarami,
    isBearishBreakaway,
    isEveningDojiStar,
    isBullishBreakaway,
    isBearishEngulfing,
    isBearishHarami,
    isBearishBreakout,
    isHangingMan,
    isAbandonedBaby,
    isDarkCloudCover,
    isStrongResistance,
    isNewHigh,
    isBearishHaramiCross,
    isInvertedHammer,
    isBullishHarami,
    isBullishEngulfing,
    isHammer,
    isShortStar,
    isMorningStar,
    isShortHarami,
    isDojiStar

  ];

  const results = {};

  patterns.forEach((pattern) => {
    results[pattern.name] = pattern(candles);
  });

  return results;
}

// Пример использования
console.log(checkAllPatterns(data));
