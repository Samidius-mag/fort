const data = require('./price.json');

// Создаем массивы для входных и выходных данных
const x1 = [];
const x2 = [];
const x3 = [];
const x4 = [];
const y = [];

// Заполняем массивы данными из файла price.json
data.forEach(item => {
  x1.push(item.price);
  x2.push(item.min_price);
  x3.push(item.max_price);
  x4.push(item.volume);
  y.push(item.avg_price);
});

// Определяем функцию для вычисления коэффициентов
function polynomialRegression(x1, x2, x3, x4, y) {
  const n = y.length;
  let a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14;
  let sumX1 = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0, sumY = 0;
  let sumX1X1 = 0, sumX2X2 = 0, sumX3X3 = 0, sumX4X4 = 0;
  let sumX1X2 = 0, sumX1X3 = 0, sumX1X4 = 0, sumX2X3 = 0, sumX2X4 = 0, sumX3X4 = 0;
  let sumX1Y = 0, sumX2Y = 0, sumX3Y = 0, sumX4Y = 0;
  for (let i = 0; i < n; i++) {
    sumX1 += x1[i];
    sumX2 += x2[i];
    sumX3 += x3[i];
    sumX4 += x4[i];
    sumY += y[i];
    sumX1X1 += x1[i] * x1[i];
    sumX2X2 += x2[i] * x2[i];
    sumX3X3 += x3[i] * x3[i];
    sumX4X4 += x4[i] * x4[i];
    sumX1X2 += x1[i] * x2[i];
    sumX1X3 += x1[i] * x3[i];
    sumX1X4 += x1[i] * x4[i];
    sumX2X3 += x2[i] * x3[i];
    sumX2X4 += x2[i] * x4[i];
    sumX3X4 += x3[i] * x4[i];
    sumX1Y += x1[i] * y[i];
    sumX2Y += x2[i] * y[i];
    sumX3Y += x3[i] * y[i];
    sumX4Y += x4[i] * y[i];
  }
  const A = [
    [n, sumX1, sumX2, sumX3, sumX4, sumX1X1, sumX2X2, sumX3X3, sumX4X4, sumX1X2, sumX1X3, sumX1X4, sumX2X3, sumX2X4, sumX3X4],
    [sumX1, sumX1X1, sumX1X2, sumX1X3, sumX1X4, sumX1X1 * sumX1, sumX1X1 * sumX2, sumX1X1 * sumX3, sumX1X1 * sumX4, sumX1X2 * sumX2, sumX1X3 * sumX3, sumX1X4 * sumX4, sumX1X2 * sumX3, sumX1X2 * sumX4, sumX1X3 * sumX4],
    [sumX2, sumX1X2, sumX2X2, sumX2X3, sumX2X4, sumX1X1 * sumX2, sumX2X2 * sumX2, sumX2X2 * sumX3, sumX2X2 * sumX4, sumX1X2 * sumX2, sumX1X2 * sumX3, sumX1X2 * sumX4, sumX2X3 * sumX3, sumX2X4 * sumX4, sumX2X3 * sumX4],
    [sumX3, sumX1X3, sumX2X3, sumX3X3, sumX3X4, sumX1X1 * sumX3, sumX2X2 * sumX3, sumX3X3 * sumX3, sumX3X3 * sumX4, sumX1X2 * sumX3, sumX1X3 * sumX3, sumX1X3 * sumX4, sumX2X3 * sumX4, sumX3X4 * sumX4, sumX2X4 * sumX3],
    [sumX4, sumX1X4, sumX2X4, sumX3X4, sumX4X4, sumX1X1 * sumX4, sumX2X2 * sumX4, sumX3X3 * sumX4, sumX4X4 * sumX4, sumX1X2 * sumX4, sumX1X3 * sumX4, sumX1X4 * sumX4, sumX2X4 * sumX3, sumX3X4 * sumX4, sumX2X4 * sumX3],
  ];
  const B = [sumY, sumX1Y, sumX2Y, sumX3Y, sumX4Y];
  const X = solve(A, B);
  [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14] = X;
  return { a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14 };
}

// Определяем функцию для решения системы линейных уравнений
function solve(A, B) {
  const n = B.length;
  for (let i = 0; i < n; i++) {
    // Поиск максимального элемента в столбце
    let maxEl = Math.abs(A[i][i]);
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > maxEl) {
        maxEl = Math.abs(A[k][i]);
        maxRow = k;
      }
    }
    // Перестановка строк, если необходимо
    for (let k = i; k < n + 1; k++) {
      const tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
    }
    const tmp = B[maxRow];
    B[maxRow] = B[i];
    B[i] = tmp;
    // Приведение матрицы к треугольному виду
    for (let k = i + 1; k < n; k++) {
      const c = -A[k][i] / A[i][i];
      for (let j = i; j < n + 1; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
      B[k] += c * B[i];
    }
  }
  // Обратный ход
  const X = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    X[i] = B[i] / A[i][i];
    for (let k = i - 1; k >= 0; k--) {
      B[k] -= A[k][i] * X[i];
    }
  }
  return X;
}

// Вычисляем коэффициенты
const { a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14 } = polynomialRegression(x1, x2, x3, x4, y);

// Проверяем результаты
console.log(`a0 = ${a0}`);
console.log(`a1 = ${a1}`);
console.log(`a2 = ${a2}`);
console.log(`a3 = ${a3}`);
console.log(`a4 = ${a4}`);
console.log(`a5 = ${a5}`);
console.log(`a6 = ${a6}`);
console.log(`a7 = ${a7}`);
console.log(`a8 = ${a8}`);
console.log(`a9 = ${a9}`);
console.log(`a10 = ${a10}`);
console.log(`a11 = ${a11}`);
console.log(`a12 = ${a12}`);
console.log(`a13 = ${a13}`);
console.log(`a14 = ${a14}`);