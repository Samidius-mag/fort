const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const { RSI, EMA, Stochastic, MACD } = require('technicalindicators');
const data = JSON.parse(fs.readFileSync('price.json'));
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';

const bot = new TelegramBot(token, { polling: false });

let isSignalSent = false; // Переменная для хранения информации о том, было ли уже отправлено сообщение

// Функция для проверки условий на вход в рынок
function checkConditions() {
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
  // Вычисляем индикаторы
  const indicators = calculateIndicators(data);
  // Определяем текущую цену и последние значения индикаторов
  const lastCandle = data[data.length - 1];
  const lastRsi = indicators.rsi[indicators.rsi.length - 1];
  const lastEma = indicators.ema[indicators.ema.length - 1];
  const lastStochastic = indicators.stochastic[indicators.stochastic.length - 1];
  const lastMacd = indicators.macd[indicators.macd.length - 1];
  // Определяем условия для входа и выхода из рынка
  const isRsiOversold = lastRsi <= 30;
  const isPriceAboveEma = lastCandle.close > lastEma;
  const isStochasticBullish = lastStochastic.k > lastStochastic.d && lastStochastic.k < 20;
  const isStochasticBearish = lastStochastic.k < lastStochastic.d && lastStochastic.k > 80;
  const isMacdBullish = lastMacd.MACD > lastMacd.signal && lastMacd.histogram > 0;
  const isMacdBearish = lastMacd.MACD < lastMacd.signal && lastMacd.histogram < 0;
  const isVolumeBullish = averageVolume < currentVolume
}

/* Запускаем бота
bot.start((ctx) => ctx.reply('Привет! Я бот для отправки сигналов на вход в рынок.'));
bot.launch();
*/
// Отправляем сообщение, если выполняются условия для входа в рынок
setInterval(() => {
  const isRsiOversold = checkRsiOversold();
  const isPriceAboveEma = checkPriceAboveEma();
  const isStochasticBullish = checkStochasticBullish();
  const isMacdBullish = checkMacdBullish();
  const isVolumeBullish = checkVolumeBullish();

  if (isRsiOversold && isPriceAboveEma && isStochasticBullish && isMacdBullish && isVolumeBullish) {
    if (!isSignalSent) { // Проверяем, было ли уже отправлено сообщение
      bot.telegram.sendMessage(chatId, 'Найден сигнал на покупку!');
      isSignalSent = true; // Устанавливаем флаг, что сообщение было отправлено
    }
  } else if (isStochasticBearish || isMacdBearish && isVolumeBullish) {
    if (!isSignalSent) { // Проверяем, было ли уже отправлено сообщение
      bot.telegram.sendMessage(chatId, 'Найден сигнал на продажу!');
      isSignalSent = true; // Устанавливаем флаг, что сообщение было отправлено
    }
  } else {
    isSignalSent = false; // Сбрасываем флаг, если условия для отправки сообщения больше не выполняются
  }
}, 60000); // Проверяем условия каждую минуту