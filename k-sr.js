const data = require('./price.json');

const points1 = data.map(candle => parseFloat(candle.open));
const points2 = data.map(candle => parseFloat(candle.close));
const points = points1.map((value, index) => [value, points2[index]]);
function kMeans(points, k, maxIterations = 100) {
    // Инициализация центроидов
    const centroids = points.slice(0, k);
  
    for (let i = 0; i < maxIterations; i++) {
      // Создание массива кластеров
      const clusters = new Array(k).fill().map(() => []);
  
      // Распределение точек по кластерам
      points.forEach(point => {
        const distances = centroids.map(centroid => distance(point, centroid));
        const minDistance = Math.min(...distances);
        const clusterIndex = distances.indexOf(minDistance);
        clusters[clusterIndex].push(point);
      });
  
      // Пересчет центроидов
      centroids.forEach((centroid, index) => {
        const cluster = clusters[index];
        if (cluster.length > 0) {
          const sum = cluster.reduce((acc, point) => [acc[0] + point[0], acc[1] + point[1]], [0, 0]);
          centroids[index] = [sum[0] / cluster.length, sum[1] / cluster.length];
        }
      });
    }
  
    return centroids;
  }
  function distance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  const k = 3;
const centroids = kMeans(points, k);

console.log(`Centroids for k=${k}:`);
console.log(centroids);