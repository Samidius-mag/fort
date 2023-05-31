const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');

const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';

const bot = new TelegramBot(token, { polling: false });

const sendMessage = (message) => {
  bot.sendMessage(chatId, message);
};

exec('node seedway.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  const lines = stdout.trim().split('\n');
  const message = lines.join('\n');

  sendMessage(message);
  console.log('Отправлено3');
});

const chatId2 = '-1001536433459';

const bot2 = new TelegramBot(token, { polling: false });

const sendMessage1 = (message) => {
  bot2.sendMessage(chatId2, message);
};

exec('node seedway.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  const lines = stdout.trim().split('\n');
  const message = lines.join('\n');

  sendMessage1(message);
  console.log('Отправлено2');
});