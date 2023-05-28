const tf = require('@tensorflow/tfjs-node');
const priceData = require('./price.json');
// Подготовка данных
const data = priceData.map(price => parseFloat(price.close));
const sequenceLength = 24;
const sequences = [];
for (let i = sequenceLength; i < data.length; i++) {
sequences.push(data.slice(i - sequenceLength, i));
}
const inputs = sequences.slice(0, -1);
const outputs = sequences.slice(1);

// Создание модели
const model = tf.sequential();
model.add(tf.layers.lstm({
units: 64,
inputShape: [sequenceLength, 1],
returnSequences: false
}));
model.add(tf.layers.dense({
units: 1
}));
model.compile({
optimizer: 'adam',
loss: 'meanSquaredError'
});

// Обучение модели
const xs = tf.tensor3d(inputs.map(sequence => sequence.map(value => [value])), [inputs.length, sequenceLength, 1]);
const ys = tf.tensor3d(outputs.map(sequence => sequence.map(value => [value])), [outputs.length, sequenceLength, 1]);
model.fit(xs, ys, {
epochs: 100,
batchSize: 32
}).then(() => {
// Тестирование модели
const testSequence = data.slice(-sequenceLength);
const testInput = tf.tensor3d(testSequence.map(value => [value]), [1, sequenceLength, 1]);
const predictedSequence = model.predict(testInput).dataSync();
console.log('Прогноз цены на 1 час:', predictedSequence[0].toFixed(2));
console.log('Прогноз цены на 4 часа:', predictedSequence[3].toFixed(2));
console.log('Прогноз цены на 12 часов:', predictedSequence[11].toFixed(2));
console.log('Прогноз цены на 24 часа:', predictedSequence[23].toFixed(2));
});
