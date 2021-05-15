import { generate } from './solution';

test('generates outcomes for 10', () => {
  expect(generate(10)).toMatchSnapshot();
});

test('generates outcomes for 20', () => {
  expect(generate(20)).toMatchSnapshot();
});

console.log(
  Object.keys(generate(40))
    .map(binary => parseInt(binary, 2))
    .sort()
    .map(number => number.toString(2))
);
