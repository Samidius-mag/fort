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
const { curPrice, curVolume, curNumOfTrad } = require('./datal.json');
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';
const bot = new TelegramBot(token, { polling: false });
// Получаем последнюю свечу из файла
//let data = JSON.parse(fs.readFileSync('datal.json'));


// Формируем сообщение с изменяемыми данными
let message = `BTC/USDT\nPrice: ${curPrice}\nVolume: ${curVolume}\nNumber of trades: ${curNumOfTrad}`;

// Отправляем сообщение в чат и сохраняем его ID
bot.sendMessage(chatId, message)
  .then((sentMessage) => {
    // Сохраняем ID отправленного сообщения
    const messageId = sentMessage.message_id;

    // Обновляем сообщение с новыми данными
    setInterval(() => {
      //data = JSON.parse(fs.readFileSync('datal.json'));
      //lastCandle = data[data.length - 1];
      message = `BTC/USDT\nPrice: ${curPrice}\nVolume: ${curVolume}\nNumber of trades: ${curNumOfTrad}`;
      bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
    }, 15000); // Обновляем сообщение каждые 5 секунд
  });