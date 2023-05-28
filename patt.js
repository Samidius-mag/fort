const fs = require('fs');
const { CandlestickFinder } = require('technicalindicators');

class TweezerTop extends CandlestickFinder {
  constructor() {
    super();
    this.requiredCount = 5;
    this.name = 'TweezerTop';
  }

  logic({ open, high, low, close }) {
    const isUpTrend = close[3] > close[0];
    const isDownTrend = close[3] < close[0];
    const isBodyShort = Math.abs(close[3] - close[0]) < Math.abs(open[3] - open[0]);
    const isShadowLong = Math.max(open[3], close[3]) < Math.min(open[0], close[0]);
    const isUpperShadowShort = Math.abs(high[3] - Math.max(open[3], close[3])) < Math.abs(open[3] - open[0]);
    const isLowerShadowShort = Math.abs(Math.min(open[3], close[3]) - low[3]) < Math.abs(open[3] - open[0]);

    return isUpTrend && isBodyShort && isShadowLong && isUpperShadowShort && isLowerShadowShort;
  }
}

class TweezerBottom extends CandlestickFinder {
  constructor() {
    super();
    this.requiredCount = 5;
    this.name = 'TweezerBottom';
  }

  logic({ open, high, low, close }) {
    const isUpTrend = close[3] > close[0];
    const isDownTrend = close[3] < close[0];
    const isBodyShort = Math.abs(close[3] - close[0]) < Math.abs(open[3] - open[0]);
    const isShadowLong = Math.max(open[3], close[3]) < Math.min(open[0], close[0]);
    const isUpperShadowShort = Math.abs(high[3] - Math.max(open[3], close[3])) < Math.abs(open[3] - open[0]);
    const isLowerShadowShort = Math.abs(Math.min(open[3], close[3]) - low[3]) < Math.abs(open[3] - open[0]);

    return isDownTrend && isBodyShort && isShadowLong && isUpperShadowShort && isLowerShadowShort;
  }
}

const data = JSON.parse(fs.readFileSync('price.json'));

const tweezerTop = new TweezerTop();
const tweezerBottom = new TweezerBottom();

const foundTweezerTop = tweezerTop.hasPattern(data);
const foundTweezerBottom = tweezerBottom.hasPattern(data);

console.log(`Tweezer Top: ${foundTweezerTop}`);
console.log(`Tweezer Bottom: ${foundTweezerBottom}`);
