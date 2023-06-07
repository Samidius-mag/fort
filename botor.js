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
const { currentNumberOfTrades } = require('./logic3');
//const { currentVolume } = require('./logic3');
const { curPrice, curVolume, curNumOfTrad } = require('./datal.json');
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';
const bot = new TelegramBot(token, { polling: false });
// Получаем последнюю свечу из файла
let data = JSON.parse(fs.readFileSync('datal.json'));
let Price = data[curPrice];
let Volume = data[curVolume];
let NumOfTrad = data[curNumOfTrad];

// Формируем сообщение с изменяемыми данными
let message = `BTC/USDT\nPrice: ${Price}\nVolume: ${Volume}\nNumber of trades: ${NumOfTrad}`;

// Отправляем сообщение в чат и сохраняем его ID
bot.sendMessage(chatId, message)
  .then((sentMessage) => {
    // Сохраняем ID отправленного сообщения
    const messageId = sentMessage.message_id;

    // Обновляем сообщение с новыми данными
    setInterval(() => {
     data = JSON.parse(fs.readFileSync('datal.json'));
      Price = data[curPrice];
      Volume = data[curVolume];
       NumOfTrad = data[curNumOfTrad];
      message = `BTC/USDT\nPrice: ${Price}\nVolume: ${Volume}\nNumber of trades: ${NumOfTrad}`;
      bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
    }, 20000); // Обновляем сообщение каждые 5 секунд
  });