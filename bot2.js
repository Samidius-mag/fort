const { spawn } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';
const bot = new TelegramBot(token, { polling: false });
let messageId = null;

const sendMessage = (message) => {
  if (messageId) {
    bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
  } else {
    bot.sendMessage(chatId, message).then((sentMessage) => {
      messageId = sentMessage.message_id;
    });
  }
};

const process = spawn('node', ['logic2.js']);

process.stdout.on('data', (data) => {
  const message = data.toString().trim();
  sendMessage(message);
  console.log('Сообщение обновлено');
});

process.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

process.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
/*
const chatId2 = '-1001536433459';

const bot2 = new TelegramBot(token, { polling: false });

const sendMessage1 = (message) => {
  bot2.sendMessage(chatId2, message);
};

exec('node logic2.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  const lines = stdout.trim().split('\n');
  const message = lines.join('\n');

  sendMessage1(message);
  console.log('Отправлено2');
});
*/