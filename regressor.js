const fs = require('fs');
const brain = require('brain.js');
const rawData = fs.readFileSync('emamares.json');
const data = JSON.parse(rawData);

const trainingData = data.slice(0, Math.floor(data.length * 0.8));
const testData = data.slice(Math.floor(data.length * 0.8));

const trainingSet = trainingData.map((item, index) => ({
  input: [index, item.ema200, item.ma200, item.ema5],
  output: [item.direction === 'up' ? 1 : 0],
}));

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4,
  hiddenLayers: [8, 8],
  outputSize: 1,
});

net.train(trainingSet, {
  learningRate: 0.005,
  errorThresh: 0.02,
  log: true,
  logPeriod: 100,
});

const testSet = testData.map((item, index) => [
  index + trainingData.length,
  item.ema200,
  item.ma200,
  item.ema5,
]);

const predictedValues = net.forecast(testSet, 1);

const result = testData.map((item, index) => ({
  time: item.time,
  ema200: item.ema200,
  ma200: item.ma200,
  ema5: item.ema5,
  direction: item.direction,
  predictedDirection: predictedValues[index][0] > 0.5 ? 'up' : 'down',
}));

fs.writeFileSync('regressorres.json', JSON.stringify(result));
console.log('Results saved successfully');

console.log('Results:');
console.log(result);