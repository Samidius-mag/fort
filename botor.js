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

// создаем экземпляр бота
const bot = new TelegramBot('5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ', { polling: false });

// ID пользователя, которому будет отправлено сообщение
const chatId = '-1001979484873';
// создаем функцию, которая возвращает текущее время
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

// создаем переменную с текстом сообщения, в котором будет вставлено текущее время
const message = `Текущее время: ${getCurrentTime()}`;

// отправляем сообщение ботом
bot.sendMessage(chatId, message);