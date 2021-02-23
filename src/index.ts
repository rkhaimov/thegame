export const GARNIR = [
  'Рис',
  'Гречка',
  'Булгур',
  'Макароны',
  'Пшенка',
  'Картошка',
  'Бобовый суп',
  'Овощной суп',
];
const MYASO = [
  'Грудка индейки',
  'Минтай',
  'Треска',
  'Постная говядина (телятина)',
];
const DOBAVKI = ['Масло', 'Йогурт', 'Творог'];
const UTRO = ['Молочный Омлет (2 яйца)', 'Молочная Пшено', 'Молочный Геркулес'];
export const FRUCTY = ['Яблоки', 'Груши', 'Хурма'];
const OVOSHI = ['Цветная капуста', 'Морковь', 'Кабачки', 'Баклажаны'];

generateMealDay();

export function generateMealDay() {
  console.log('А теперь продукты на ближайшее время:\n');

  console.log('Гарнир: ', pickOne(GARNIR), '\n');

  console.log('Мясо: ', pickOne(MYASO), '\n');

  console.log('Добавки: ', pickOne(DOBAVKI), '\n');

  console.log('Из фруктов: ', pickMany(FRUCTY), '\n');

  console.log('Из овощей: ', pickMany(OVOSHI), '\n');

  console.log('А на утро: ', pickOne(UTRO), '\n');
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * (max - 1));
}

export function pickOne(elements: string[]): string {
  return elements[getRandomInt(elements.length + 1)];
}

export function pickMany(elements: string[]): string {
  const max = Math.pow(2, elements.length) + 1;

  const mask = getRandomInt(max).toString(2).padStart(elements.length, '0');

  return elements.filter((element, index) => mask[index] === '1').join(', ');
}
