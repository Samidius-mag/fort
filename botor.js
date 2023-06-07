/*
const TelegramBot = require('node-telegram-bot-api');

const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';

const bot = new TelegramBot(token, { polling: false });

const sendMessage = (message) => {
  bot.sendMessage(chatId, message);
};
*/

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';

const bot = new TelegramBot(token, { polling: true });

// Функция для отправки сообщения в чат с данными о свече
function sendCandleData() {
  // Получаем последнюю свечу из файла
  const data = JSON.parse(fs.readFileSync('price.json'));
  const lastCandle = data[data.length - 1];

  // Формируем сообщение с данными о свече
  const message = `BTC/USDT\nPrice: ${lastCandle.close}\nVolume: ${lastCandle.volume}\nNumber of trades: ${lastCandle.numberOfTrades}`;

  // Отправляем сообщение в чат
  bot.sendMessage(chatId, message);
}

// Отправляем первое сообщение с данными о свече
sendCandleData();

// Запускаем периодическую отправку сообщений с данными о свече
setInterval(() => {
  sendCandleData();
}, 15000); // Отправляем сообщение каждые 5 секунд
