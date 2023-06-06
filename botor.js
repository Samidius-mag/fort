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

// Получаем последнюю свечу из файла
const data = JSON.parse(fs.readFileSync('price.json'));
const lastCandle = data[data.length - 1];

// Формируем сообщение с изменяемыми данными
const message = `BTC/USDT\nPrice: ${lastCandle.close}\nVolume: ${lastCandle.volume}\nNumber of trades: ${lastCandle.numberOfTrades}`;

// Отправляем сообщение в чат
bot.sendMessage(chatId, message);