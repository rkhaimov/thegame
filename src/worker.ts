export function run(from: number, to: number) {
  return sumTo(from, to);
}

function sumTo(from: number, to: number) {
  let result = 0;

  for (let i = from; i <= to; i += 1) {
    result += i;
  }

  return result;
}
