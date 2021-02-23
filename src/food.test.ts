import { FRUCTY, GARNIR, generateMealDay, pickMany, pickOne } from './index';

test('Ну вот', () => {
  generateMealDay();
});

test('Randomness of pickOne', () => {
  const scores = new Map<string, number>();

  for (let i = 0; i < Math.pow(10, 4); i++) {
    const result = pickOne(GARNIR);
    const score = scores.get(result);

    if (score) {
      scores.set(result, score + 1);

      continue;
    }

    scores.set(result, 1);
  }

  console.log(scores);
  expect(scores.size).toBe(GARNIR.length);
});

test('Randomness of pickMany', () => {
  const scores = new Map<string, number>();

  for (let i = 0; i < Math.pow(10, 4); i++) {
    const result = pickMany(FRUCTY);
    const score = scores.get(result);

    if (score) {
      scores.set(result, score + 1);

      continue;
    }

    scores.set(result, 1);
  }

  console.log(scores);
  expect(scores.size).toBe(Math.pow(2, FRUCTY.length));
});
