function consequences(permutation: string, table: Record<string, 'P' | 'N'>) {
  for (let index = 0; index < permutation.length; index += 1) {
    if (permutation[index] === '1' && permutation[index + 1] === '1') {
      const result = trim(permutation.slice(0, index) + '00' + permutation.slice(index + 2));

      if (table[result] === 'P') {
        table[permutation] = 'N';

        return;
      }
    }

    if (permutation[index] === '1') {
      const result = trim(permutation.slice(0, index) + '0' + permutation.slice(index + 1));

      if (table[result] === 'P') {
        table[permutation] = 'N';

        return;
      }
    }
  }

  table[permutation] = 'P';

  function trim(target: string) {
    return target
      .replace(/0+/g, '0')
      .replace(/^0/g, '')
      .replace(/0$/g, '');
  }
}

function alltil(til: number) {
  const base = '1';
  const result: string[] = [base];

  let index = 0;
  while (result.length < til) {
    const permutations = ways(result[index]);

    result.push(...permutations);

    index += 1;
  }

  return result;
}

function ways(parent: string) {
  return [parent + '1', parent + '01'];
}
