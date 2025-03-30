const brands = [
  'Tesla',
  'Volvo',
  'Chevrolet',
  'BMW',
  'Mercedes',
  'Ferrari',
  'Rolls-Royce',
  'Nissan',
  'Porsche',
  'Lada',
];

const models = [
  'Model S',
  'Roadster',
  'Camaro',
  'X5',
  'Cybertruck',
  'Corolla',
  'Civic',
  'Tourer',
  'Cabrio',
  'Gran Coupe',
];

export function getRandomCarName(): string {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}
