const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { RSI, EMA, Stochastic, MACD } = require('technicalindicators');
const data = JSON.parse(fs.readFileSync('price.json'));
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';
const volume = data.map(candle => parseFloat(candle.volume));
const averageVolume = volume.reduce((acc, val) => acc + val, 0) / volume.length;
const currentVolume = volume[volume.length - 1];
const bot = new TelegramBot(token, { polling: false });

let isSignalSent = false; // Переменная для хранения информации о том, было ли уже отправлено сообщение

// Функция для вычисления индикаторов
function calculateIndicators(data) {
  const close = data.map(candle => parseFloat(candle.close));
  const macd = MACD.calculate({ values: close, fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 });
  const rsiPeriod = 14;
  const rsiValues = RSI.calculate({ period: rsiPeriod, values: close });
  const rsi = rsiValues.map(value => parseFloat(value.toFixed(2)));
  const emaPeriod = 21;
  const emaValues = EMA.calculate({ period: emaPeriod, values: close });
  const ema = emaValues.map(value => parseFloat(value.toFixed(2)));
  const stochastic = Stochastic.calculate({ high: data.map(candle => candle.high), low: data.map(candle => candle.low), close, period: 14, signalPeriod: 3 });
  return { rsi, ema, stochastic, macd };
}
const indicators = calculateIndicators(data);
const lastCandle = data[data.length - 1];
const lastRsi = indicators.rsi[indicators.rsi.length - 1];
const lastEma = indicators.ema[indicators.ema.length - 1];
const lastStochastic = indicators.stochastic[indicators.stochastic.length - 1];
const lastMacd = indicators.macd[indicators.macd.length - 1];
const isRsiOversold = lastRsi <= 30;
const isPriceAboveEma = lastCandle.close > lastEma;
const isStochasticBullish = lastStochastic.k > lastStochastic.d && lastStochastic.k < 20;
const isStochasticBearish = lastStochastic.k < lastStochastic.d && lastStochastic.k > 80;
const isMacdBullish = lastMacd.MACD > lastMacd.signal && lastMacd.histogram > 0;
const isMacdBearish = lastMacd.MACD < lastMacd.signal && lastMacd.histogram < 0;
const isVolumeBullish = averageVolume < currentVolume
// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isRsiOversold && isPriceAboveEma && isStochasticBullish && isMacdBullish && isVolumeBullish) {
console.log('Найден сигнал на покупку!');
} else if (isStochasticBearish || isMacdBearish && isVolumeBullish) { // Если Stochastic Oscillator или MACD пересекает сигнальную линию вниз, сигнализируем о выходе из рынка
console.log('Найден сигнал на продажу!');
}

// Если все условия для входа выполнены, сигнализируем о входе в рынок
if (isRsiOversold && isPriceAboveEma && isStochasticBullish && isMacdBullish && isVolumeBullish) {
  if (!isSignalSent) { // Проверяем, было ли уже отправлено сообщение
    bot.sendMessage(chatId, 'Найден сигнал на покупку!');
    isSignalSent = true; // Устанавливаем значение переменной isSignalSent в true, чтобы сообщение не отправлялось заново
  }
} else if (isStochasticBearish || isMacdBearish && isVolumeBullish) { // Если Stochastic Oscillator или MACD пересекает сигнальную линию вниз, сигнализируем о выходе из рынка
  if (!isSignalSent) { // Проверяем, было ли уже отправлено сообщение
    bot.sendMessage(chatId, 'Найден сигнал на продажу!');
    isSignalSent = true; // Устанавливаем значение переменной isSignalSent в true, чтобы сообщение не отправлялось заново
  }
}