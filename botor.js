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
let message = `BTC/USDT\nPrice: ${lastCandle.close}\nVolume: ${lastCandle.volume}\nNumber of trades: ${lastCandle.numberOfTrades}`;

// Отправляем сообщение в чат и сохраняем его ID
bot.sendMessage(chatId, message)
  .then((sentMessage) => {
    // Сохраняем ID отправленного сообщения
    const messageId = sentMessage.message_id;

    // Обновляем сообщение с новыми данными
    data.push(getNewCandle()); // Получаем новую свечу
    const newCandle = data[data.length - 1];
    message = `BTC/USDT\nPrice: ${newCandle.close}\nVolume: ${newCandle.volume}\nNumber of trades: ${newCandle.numberOfTrades}`;
    bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
  });

// Функция для получения новой свечи
function getNewCandle() {
  // Здесь должен быть код для получения новой свечи
  return {
    close: 50000,
    volume: 100,
    numberOfTrades: 50
  };
}