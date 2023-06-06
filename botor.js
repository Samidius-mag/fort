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
const { currentPrice, currentVolume, currentNumberOfTrades } = require('./logic3.js');
// создаем экземпляр бота
const bot = new TelegramBot('5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ', { polling: false });

// ID пользователя, которому будет отправлено сообщение
const chatId = '-1001979484873';
// отправляем статическое сообщение с текущими значениями
bot.sendMessage(chatId, `Текущая цена: ${currentPrice}\nТекущий объем: ${currentVolume}\nТекущее количество сделок: ${currentNumberOfTrades}`)
  .then((message) => {
    // сохраняем ID сообщения для последующего обновления
    const messageId = message.message_id;

    // сохраняем предыдущие значения
    let prevPrice = currentPrice;
    let prevVolume = currentVolume;
    let prevNumberOfTrades = currentNumberOfTrades;

    // обновляем сообщение каждые 10 секунд
    setInterval(() => {
      // проверяем, изменились ли значения
      if (prevPrice !== currentPrice || prevVolume !== currentVolume || prevNumberOfTrades !== currentNumberOfTrades) {
        // обновляем сообщение с новыми значениями
        bot.editMessageText(`Текущая цена: ${currentPrice}\nТекущий объем: ${currentVolume}\nТекущее количество сделок: ${currentNumberOfTrades}`, {
          chat_id: chatId,
          message_id: messageId,
        });

        // обновляем предыдущие значения
        prevPrice = currentPrice;
        prevVolume = currentVolume;
        prevNumberOfTrades = currentNumberOfTrades;
      }
    }, 15000);
  });
  