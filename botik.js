// Подключаем необходимые библиотеки
const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Указываем токен телеграм-бота
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Указываем id чата, в который будем отправлять сообщения
const chatId = '-1001536433459';

// Создаем функцию для отправки сообщений в чат
let messageId = null; // хранит id последнего отправленного сообщения
const sendMessage = (text) => {
  if (text) {
    if (messageId) {
      bot.editMessageText(text, { chat_id: chatId, message_id: messageId });
    } else {
      bot.sendMessage(chatId, text).then((message) => {
        messageId = message.message_id;
      });
    }
  } else {
    if (messageId) {
      bot.editMessageText('-', { chat_id: chatId, message_id: messageId });
    } else {
      bot.sendMessage(chatId, '-').then((message) => {
        messageId = message.message_id;
      });
    }
  }
};

// Создаем функцию для выполнения файла x.js
const runXScript = () => {
  exec('node logic3.js', (error, stdout) => {
    if (error) {
      sendMessage(`Error: ${error.message}`);
      return;
    }

    if (stdout) {
      sendMessage(` ${stdout}`);
    } else {
      sendMessage(null);
    }
  });
};

// Запускаем выполнение файла x.js и отправку данных в чат
runXScript();