const WAYS: Record<string, 'P' | 'N'> = {
  ['1']: 'P',
};

for (let permutation = 3; permutation < 10; permutation += 2) {
  const bits = Math.floor(Math.log2(permutation));

  for (let bit = bits; bit > 0; bit -= 1) {
    const leave = Math.pow(2, bit) - 1;

    const result = (leave & permutation).toString(2);

    if (WAYS[result] === 'P') {
      WAYS[permutation.toString(2)] = 'N';

      break;
    }
  }

  if (WAYS[permutation.toString(2)] === 'N') {
    continue;
  }

  for (let bit = bits; bit > 1; bit -= 2) {
    const mask = Math.pow(2, bits + 1) - 1;
    const leave = (Math.pow(2, bit) + Math.pow(2, bit - 1)) ^ mask;

    const result = (permutation & leave).toString(2);

    if (WAYS[result] === 'P') {
      WAYS[permutation.toString(2)] = 'N';

      break;
    }
  }

  WAYS[permutation.toString(2)] = WAYS[permutation.toString(2)] ?? 'P';
}

console.log(WAYS);
