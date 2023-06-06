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

let message = '';


setInterval(() => {
  const data = JSON.parse(fs.readFileSync('price.json'));

  const lastCandle = data[data.length - 1];
  const price = lastCandle.close;
  const volume = lastCandle.volume;
  const numberOfTrades = lastCandle.numberOfTrades;

  const newMessage = `BTC/USDT\nPrice: ${price}\nVolume: ${volume}\nNumber of trades: ${numberOfTrades}`;

  if (newMessage !== message) {
    message = newMessage;
    bot.sendMessage(chatId, message);
  }
}, 15000);
  