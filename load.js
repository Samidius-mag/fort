const axios = require('axios');
const fs = require('fs');

const url = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=5000';

axios.get(url)
  .then(response => {
    const data = response.data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10],
    }));

    fs.writeFileSync('price.json', JSON.stringify(data));
    console.log('Data saved to price.json');
  })
  .catch(error => {
    console.error(error);
  });

const url1 = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=4h&limit=5';

axios.get(url)
  .then(response => {
    const data = response.data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10],
    }));

    fs.writeFileSync('price4.json', JSON.stringify(data));
    console.log('Data saved to price4.json');
  })
  .catch(error => {
    console.error(error);
  });

const url2 = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=24h&limit=5';

axios.get(url)
  .then(response => {
    const data = response.data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10],
    }));

    fs.writeFileSync('price24.json', JSON.stringify(data));
    console.log('Data saved to price24.json');
  })
  .catch(error => {
    console.error(error);
  });

const url3 = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=5';

axios.get(url)
  .then(response => {
    const data = response.data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10],
    }));

    fs.writeFileSync('price15.json', JSON.stringify(data));
    console.log('Data saved to price15.json');
  })
  .catch(error => {
    console.error(error);
  });

const url4 = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=5';

axios.get(url)
  .then(response => {
    const data = response.data.map(candle => ({
      time: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10],
    }));

    fs.writeFileSync('price5.json', JSON.stringify(data));
    console.log('Data saved to price5.json');
  })
  .catch(error => {
    console.error(error);
  });
