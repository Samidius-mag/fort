const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// Создаем бота с помощью токена
const bot = new TelegramBot('5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ', { polling: true });

// ID чата, в который будем отправлять сообщения
const chatId = '-1001979484873';

// Получаем последнюю свечу из файла
let data = JSON.parse(fs.readFileSync('datal.json'));
let price =  parseFloat(data.curPrice);
let volume =  parseFloat(data.curVolume);
let numOfTrad = parseFloat(data.curNumOfTrad);
let iz = parseFloat(data.izmen);
let tt = (data.tc);
let t4 = (data.t4);
let t24 = (data.t24);
let tgl = (data.tg);
let srVoll = (data.srVol);
let srTradd = (data.srTrad);
// Формируем сообщение с изменяемыми данными
let message = `BTC/USDT
\nЦена: ${price} Изменение: ${iz} %
\nОбъем: ${volume} Ср.Об: ${srVoll}
\nСделки: ${numOfTrad} Cp.Сдел: ${srTradd}
\nТренд тек: ${tt}
\nТренд 4ч: ${t4}
\nТренд 24ч: ${t24}
\nТренд глоб: ${tgl}`;

// Отправляем сообщение в чат и сохраняем его ID
bot.sendMessage(chatId, message)
  .then((sentMessage) => {
    // Сохраняем ID отправленного сообщения
    const messageId = sentMessage.message_id;

    // Обновляем сообщение с новыми данными
    setInterval(() => {
    data = JSON.parse(fs.readFileSync('datal.json'));
     price =  parseFloat(data.curPrice);
 volume =  parseFloat(data.curVolume);
 numOfTrad = parseFloat(data.curNumOfTrad);
 iz = parseFloat(data.izmen);
 tt = (data.tc);
 t4 = (data.t4);
 t24 = (data.t24);
 tgl = (data.tg);
 srVoll = (data.srVol);
  srTradd = (data.srTrad);
      message = `BTC/USDT
      \nЦена: ${price} Изменение: ${iz} %
      \nОбъем: ${volume} Ср.Об: ${srVoll}
      \nСделки: ${numOfTrad} Cp.Сдел: ${srTradd}
      \nТренд тек: ${tt}
      \nТренд 4ч: ${t4}
      \nТренд 24ч: ${t24}
      \nТренд глоб: ${tgl}`;
      bot.editMessageText(message, { chat_id: chatId, message_id: messageId });
    }, 12000); // Обновляем сообщение каждые 5 секунд
  });
/*
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
//const { currentNumberOfTrades } = require('./logic3');
//const { currentVolume } = require('./logic3');
//const data = require('./datal.json');
const token = '5995075949:AAHek1EL2dqZvJlIR3ssuFLkIsb3ZTgccIQ';
const chatId = '-1001979484873';
const bot = new TelegramBot(token, { polling: false });
// Получаем последнюю свечу из файла
let data = JSON.parse(fs.readFileSync('datal.json'));
let Price = parseFloat(data.curPrice);
let Volume = parseFloat(data.curVolume);
let NumOfTrad = parseFloat(data.curNumOfTrad);

// Формируем сообщение с изменяемыми данными
//let message = `BTC/USDT\nPrice: ${ Price}\nVolume: ${ Volume}\nNumber of trades: ${ NumOfTrad}`;

// Отправляем сообщение в чат и сохраняем его ID
let messageId;
bot.sendMessage(chatId, `BTC/USDT\nPrice: ${ Price}\nVolume: ${ Volume}\nNumber of trades: ${ NumOfTrad}`)
  .then((sentMessage) => {
    messageId = sentMessage.message_id;
  });
    // Обновляем сообщение с новыми данными
   
    newData = JSON.parse(fs.readFileSync('datal.json'));
    newPrice = parseFloat(data.curPrice);
    newVolume = parseFloat(data.curVolume);
    newNumOfTrad = parseFloat(data.curNumOfTrad);
      
    setInterval(() => {
      bot.editMessageText(`BTC/USDT\nPrice: ${ newPrice}\nVolume: ${ newVolume}\nNumber of trades: ${ newNumOfTrad}`, {
        chat_id: chatId,
        message_id: messageId,
      });
    }, 20000);
 */