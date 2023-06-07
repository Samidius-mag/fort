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
//const fs = require('fs');
const { currentPrice, currentVolume, currentNumberOfTrades } = require('./logic3.js');
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';

const bot = new TelegramBot(token, { polling: true });

// Получаем последнюю свечу из файла
//let data = JSON.parse(fs.readFileSync('price.json'));
//let lastCandle = data[data.length - 1];

// Формируем сообщение с изменяемыми данными
let message = `BTC/USDT\nPrice: ${currentPrice}\nVolume: ${currentVolume}\nNumber of trades: ${currentNumberOfTrades}`;

// Отправляем сообщение в чат и сохраняем его ID
bot.sendMessage(chatId, message)
  .then((sentMessage) => {
    // Сохраняем ID отправленного сообщения
    const messageId = sentMessage.message_id;

    // Обновляем сообщение с новыми данными
    setInterval(() => {
      //data = JSON.parse(fs.readFileSync('price.json'));
      //lastCandle = data[data.length - 1];
      message = `BTC/USDT\nPrice: ${currentPrice}\nVolume: ${currentVolume}\nNumber of trades: ${currentNumberOfTrades}`;
      bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
    }, 15000); // Обновляем сообщение каждые 5 секунд
  });
