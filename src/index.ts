function fromOne(game: Game): Game[] {
  const children = game.children
    .map((child) => fromOne({ score: child, children: [] }))
    .flat();

  return [
    { score: game.score + 1, children: game.children },
    { score: game.score + 2, children: game.children },
    ...children.map(child => ({ ...child, children: [game.score] })),
  ];
}

function fromMany(game: Game): Game[] {
  return [
    { score: game.score, children: [1, ...game.children] },
    { score: game.score, children: [2, ...game.children] },
  ];
}

const target: Game = {
  score: 1,
  children: [1],
};

print([...fromOne(target), ...fromMany(target)]);

function print(games: Game[]) {
  console.log(toString(games).join('\n'));
}

function toString(games: Game[]): string[] {
  return games.map((game) =>
    [game.score, ...game.children].map((entry) => `g(${entry})`).join(' o ')
  );
}

type Game = {
  score: number;
  children: number[];
};

function assert(condition: any): asserts condition {
  if (condition === false) {
    throw new Error();
  }
}
