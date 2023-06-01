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

// 4-hour candles
const url4h = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=4h&limit=1000`;
setTimeout(() => {
axios.get(url4h)
  .then(response => {
    const data = response.data.map(candle => ({
      openTime: candle[0],
      open: candle[1],
      high: candle[2],
      low: candle[3],
      close: candle[4],
      volume: candle[5],
      closeTime: candle[6],
      quoteAssetVolume: candle[7],
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: candle[9],
      takerBuyQuoteAssetVolume: candle[10]
    }));

    fs.writeFile('price4h.json', JSON.stringify(data), err => {
      if (err) throw err;
      console.log('Data written to file price4h.json');
    });
  })
  .catch(error => {
    console.log(error);
  });
}, 2000);
// 15-minute candles
const url15m = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=1000`;

setTimeout(() => {
  axios.get(url15m)
    .then(response => {
      const data = response.data.map(candle => ({
        openTime: candle[0],
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
        closeTime: candle[6],
        quoteAssetVolume: candle[7],
        numberOfTrades: candle[8],
        takerBuyBaseAssetVolume: candle[9],
        takerBuyQuoteAssetVolume: candle[10]
      }));

      fs.writeFile('price15m.json', JSON.stringify(data), err => {
        if (err) throw err;
        console.log('Data written to file price15m.json');
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 4000);

// daily candles
const url24h = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=3h&limit=25`;

setTimeout(() => {
  axios.get(url24h)
    .then(response => {
      const data = response.data.map(candle => ({
        openTime: candle[0],
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
        closeTime: candle[6],
        quoteAssetVolume: candle[7],
        numberOfTrades: candle[8],
        takerBuyBaseAssetVolume: candle[9],
        takerBuyQuoteAssetVolume: candle[10]
      }));

      fs.writeFile('price3h.json', JSON.stringify(data), err => {
        if (err) throw err;
        console.log('Data written to file price3h.json');
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 6000);

const url5m = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=1000`;

setTimeout(() => {
  axios.get(url5m)
    .then(response => {
      const data = response.data.map(candle => ({
        openTime: candle[0],
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
        closeTime: candle[6],
        quoteAssetVolume: candle[7],
        numberOfTrades: candle[8],
        takerBuyBaseAssetVolume: candle[9],
        takerBuyQuoteAssetVolume: candle[10]
      }));

      fs.writeFile('price5m.json', JSON.stringify(data), err => {
        if (err) throw err;
        console.log('Data written to file price5m.json');
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 8000);

const url30m = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=30m&limit=1000`;

setTimeout(() => {
  axios.get(url30m)
    .then(response => {
      const data = response.data.map(candle => ({
        openTime: candle[0],
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
        closeTime: candle[6],
        quoteAssetVolume: candle[7],
        numberOfTrades: candle[8],
        takerBuyBaseAssetVolume: candle[9],
        takerBuyQuoteAssetVolume: candle[10]
      }));

      fs.writeFile('price30m.json', JSON.stringify(data), err => {
        if (err) throw err;
        console.log('Data written to file price30m.json');
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 10000);

const url12h = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=12h&limit=100`;

setTimeout(() => {
  axios.get(url12h)
    .then(response => {
      const data = response.data.map(candle => ({
        openTime: candle[0],
        open: candle[1],
        high: candle[2],
        low: candle[3],
        close: candle[4],
        volume: candle[5],
        closeTime: candle[6],
        quoteAssetVolume: candle[7],
        numberOfTrades: candle[8],
        takerBuyBaseAssetVolume: candle[9],
        takerBuyQuoteAssetVolume: candle[10]
      }));

      fs.writeFile('price12h.json', JSON.stringify(data), err => {
        if (err) throw err;
        console.log('Data written to file price12h.json');
      });
    })
    .catch(error => {
      console.log(error);
    });
}, 12000);