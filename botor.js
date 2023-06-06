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
const { currentPrice, currentVolume, currentNumberOfTrades } = require('./1.js');
// создаем экземпляр бота
const bot = new TelegramBot('5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ', { polling: false });

// ID пользователя, которому будет отправлено сообщение
const chatId = '-1001979484873';
// создаем функцию, которая возвращает текущее время
let messageId;
bot.sendMessage(chatId, 
`Текущая цена: ${currentPrice}
Текущий объем: ${currentVolume}
Текущие сделки: ${currentNumberOfTrades}`)
  .then((sentMessage) => {
    messageId = sentMessage.message_id;
  });

// обновляем сообщение с текущим временем каждые 10 секунд
setInterval(() => {
  bot.editMessageText(
  `Текущая цена: ${currentPrice}
  Текущий объем: ${currentVolume}
  Текущие сделки: ${currentNumberOfTrades}`, {
    chat_id: chatId,
    message_id: messageId,
  });
}, 6000);